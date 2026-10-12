export interface Event {
    image?: string;
    title: string;
    date: Date;
    time: string;
    location: string;
    description: string;
    featured?: boolean;
    price: string;
    bookingUrl: string;
}

export const events: Event[] = [
    {
        title: "Mille Légendes en Harmonie",
        date: new Date(2026, 10, 28),
        time: "20 h 30",
        location: "Salle Rheinberg, Montreuil-sur-Mer",
        description: "Venez découvrir une histoire hors normes ! Des personnages imaginaires qui sortent d’un livre magique ? Qui l’eût cru ? Traversons ensemble les différents mondes pour partir à la rencontre de sirènes, dragons, chevaliers et bien d’autres ! Un concert-spectacle légendaire organisé par l’Harmonie de Montreuil-sur-Mer avec la participation de l’École de musique. Une buvette et de la restauration sucrée seront disponibles sur place.",
        image: "/assets/affiches/mille-legendes-en-harmonie.jpg",
        price: "10 € · Gratuit pour les moins de 10 ans",
        bookingUrl: "https://www.helloasso.com/associations/ecole-de-musique-harmonie-municipale-de-montreuil-sur-mer/evenements/mille-legendes-en-harmonie",
        featured: true,
    },
]
