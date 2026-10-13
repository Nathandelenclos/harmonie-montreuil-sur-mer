let captchaScript: Promise<void> | undefined

async function getCaptchaToken(): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (!siteKey) throw new Error("La vérification anti-spam est indisponible. Contactez-nous directement.")
  if (!window.grecaptcha) {
    captchaScript ??= new Promise<void>((resolve, reject) => {
      const script = document.createElement("script")
      const timer = setTimeout(() => fail(), 10000)
      const fail = () => {
        clearTimeout(timer)
        script.remove()
        captchaScript = undefined
        reject(new Error("Impossible de charger la vérification anti-spam. Réessayez ou contactez-nous directement."))
      }
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`
      script.async = true
      script.onload = () => { clearTimeout(timer); resolve() }
      script.onerror = fail
      document.head.append(script)
    })
    await captchaScript
  }
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("La vérification anti-spam a expiré. Réessayez.")), 10000)
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(siteKey, { action: "submit_form" }).then(resolve, () => reject(new Error("La vérification anti-spam a échoué. Réessayez."))).finally(() => clearTimeout(timer))
    })
  })
}

export async function sendEmail(subject: string, text: string, email: string, details: { id: string; source: 'contact' | 'join'; name: string }) {
  let reCaptchaToken: string
  try {
    reCaptchaToken = await getCaptchaToken()
  } catch {
    throw new Error("La vérification anti-spam a échoué. Réessayez ou contactez-nous directement par téléphone ou par e-mail.")
  }
  let response: Response
  try {
    response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reCaptchaToken, subject, text, email, ...details }),
      signal: AbortSignal.timeout(30000),
    })
  } catch {
    throw new Error("La réponse du serveur n’a pas pu être reçue. Vérifiez votre connexion ou contactez-nous directement avant de renouveler l’envoi.")
  }
  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(typeof data?.error === "string" ? data.error : "L’envoi a échoué. Réessayez ou contactez-nous directement.")
  }
}
