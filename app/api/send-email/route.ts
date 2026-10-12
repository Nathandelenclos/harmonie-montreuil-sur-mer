import nodemailer from "nodemailer"

const siteOrigin = "https://harmonie-montreuil-sur-mer.fr"
// shortcut: this limit is per instance; use the hosting firewall for a shared production quota.
let attempts: number[] = []

export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  const isLocal = process.env.NODE_ENV !== "production" &&
    (origin === "http://localhost:3000" || origin === "http://localhost:3001")
  if (origin !== siteOrigin && !isLocal) {
    return Response.json({ error: "Origine non autorisée." }, { status: 403 })
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return Response.json({ error: "Format non pris en charge." }, { status: 415 })
  }

  let body: unknown
  try {
    const reader = request.body?.getReader()
    if (!reader) return Response.json({ error: "Message manquant." }, { status: 400 })
    const chunks: Uint8Array[] = []
    let size = 0
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > 32768) {
        await reader.cancel()
        return Response.json({ error: "Message trop volumineux." }, { status: 413 })
      }
      chunks.push(value)
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"))
  } catch {
    return Response.json({ error: "Message invalide." }, { status: 400 })
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Message invalide." }, { status: 400 })
  }
  const { subject, text, email, reCaptchaToken } = body as Record<string, unknown>
  if (typeof subject !== "string" || !subject.trim() || subject.length > 300 || /[\r\n]/.test(subject) ||
      typeof text !== "string" || !text.trim() || text.length > 5000 ||
      typeof email !== "string" || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
      typeof reCaptchaToken !== "string" || !reCaptchaToken || reCaptchaToken.length > 4096) {
    return Response.json({ error: "Vérifiez votre adresse e-mail et la longueur du message (5 000 caractères maximum)." }, { status: 400 })
  }

  const now = Date.now()
  attempts = attempts.filter(time => now - time < 60_000)
  if (attempts.length >= 20) {
    return Response.json({ error: "Trop de demandes. Réessayez dans une minute." }, { status: 429, headers: { "Retry-After": "60" } })
  }
  attempts.push(now)

  const { RECAPTCHA_SECRET_KEY, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!RECAPTCHA_SECRET_KEY || !SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_PORT) {
    return Response.json({ error: "L’envoi est indisponible. Contactez-nous par téléphone ou par e-mail." }, { status: 503 })
  }
  try {
    const verification = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret: RECAPTCHA_SECRET_KEY, response: reCaptchaToken }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    })
    if (!verification.ok) throw new Error("Captcha service unavailable")
    const captcha = await verification.json()
    const expectedHostname = isLocal ? "localhost" : "harmonie-montreuil-sur-mer.fr"
    if (captcha.success !== true || typeof captcha.score !== "number" || captcha.score < 0.5 ||
        captcha.action !== "submit_form" || captcha.hostname !== expectedHostname) {
      return Response.json({ error: "La vérification anti-spam a échoué. Réessayez ou contactez-nous directement." }, { status: 403 })
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      requireTLS: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 10000,
    })
    await transporter.sendMail({
      from: SMTP_USER,
      to: "harmoniemontreuilsurmer@orange.fr",
      replyTo: email,
      subject: subject.trim(),
      text,
      disableFileAccess: true,
      disableUrlAccess: true,
    })
    return Response.json({ message: "Message envoyé." })
  } catch {
    // Never log message contents, credentials or provider responses containing personal data.
    console.error("email_delivery_failed")
    return Response.json({ error: "L’envoi a échoué. Votre saisie est conservée : réessayez ou contactez-nous directement." }, { status: 503 })
  }
}
