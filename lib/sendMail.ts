
export async function sendEmail(to: string, subject:string, text:string) {
    const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to, subject, text
        }),
    });

    if (!response.ok) {
        throw new Error(`Erreur lors de l’envoi du mail ${response.statusText}` );
    }

    const data = await response.json();
    console.log('Réponse du serveur :', data);
    return data;
}
