import {createTransport} from 'nodemailer';
import {NextResponse} from "next/server";

interface SendEmailBody {
    reCaptchaToken: string;
    to: string;
    subject: string;
    text: string;
    apiSecret: string;
}

export async function POST(request: Request) {
    const { to, subject, text, apiSecret, reCaptchaToken } = (await request.json()) as SendEmailBody;

    if (!to ||!subject ||!text ||!apiSecret ||!reCaptchaToken) {
        return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    const referer = request.headers.get('referer') || '';
    if (!(referer.startsWith('http://localhost:3001') || referer.startsWith('https://harmonie-montreuil-sur-mer.fr'))) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
    }

    if (apiSecret !== process.env.EMAIL_API_SECRET) {
        return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 403 });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
        return NextResponse.json(
            { error: 'Missing reCAPTCHA secret key' },
            { status: 500 }
        );
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${reCaptchaToken}`;

    const recaptchaRes = await fetch(verificationUrl, { method: 'POST' });
    const recaptchaData = await recaptchaRes.json() as {
        success: boolean;
        score?: number;
        action?: string;
        [key: string]: unknown;
    };

    if (!recaptchaData.success) {
        return NextResponse.json(
            { error: 'reCAPTCHA failure' },
            { status: 403 }
        );
    }
    if ((recaptchaData.score ?? 0) < 0.5) {
        return NextResponse.json(
            { error: 'reCAPTCHA score too low. Bot suspected.' },
            { status: 403 }
        );
    }
    if (recaptchaData.action !== 'submit_form') {
        return NextResponse.json(
            { error: 'Action reCAPTCHA invalide' },
            { status: 403 }
        );
    }

    try {
        const transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            text,
        });

        return new Response(JSON.stringify({ message: 'E-mail sent !' }), { status: 200 });
    } catch (error) {
        console.error('Error sending e-mail :', error);
        return new Response(JSON.stringify({ message: 'Internal error' }), { status: 500 });
    }
}
