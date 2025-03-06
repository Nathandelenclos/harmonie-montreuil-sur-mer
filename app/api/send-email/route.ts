import nodemailer from 'nodemailer';


export async function POST(request: Request) {
    try {
        const { to, subject, text } = await request.json();

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
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

        return new Response(JSON.stringify({ message: 'E-mail envoyé !' }), { status: 200 });
    } catch (error) {
        console.error('Erreur lors de l’envoi d’e-mail :', error);
        return new Response(JSON.stringify({ message: 'Erreur interne' }), { status: 500 });
    }
}
