export interface Event {
    slug: string;
    archiveAfter: string;
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
        slug: "mille-legendes-en-harmonie",
        archiveAfter: "2026-11-29T00:00:00+01:00",
        title: "Mille Légendes en Harmonie",
        date: new Date("2026-11-28T20:30:00+01:00"),
        time: "20 h 30",
        location: "Salle Rheinberg, Montreuil-sur-Mer",
        description: "Venez découvrir une histoire hors normes ! Des personnages imaginaires qui sortent d’un livre magique ? Qui l’eût cru ? Traversons ensemble les différents mondes pour partir à la rencontre de sirènes, dragons, chevaliers et bien d’autres ! Un concert-spectacle légendaire organisé par l’Harmonie de Montreuil-sur-Mer avec la participation de l’École de musique. Une buvette et de la restauration sucrée seront disponibles sur place.",
        image: "/assets/affiches/mille-legendes-en-harmonie.jpg",
        price: "10 € · Gratuit pour les moins de 10 ans",
        bookingUrl: "https://www.helloasso.com/associations/ecole-de-musique-harmonie-municipale-de-montreuil-sur-mer/evenements/mille-legendes-en-harmonie",
        featured: true,
    },
]

export function partitionEvents(now = new Date()) {
  const sorted = [...events].sort((a, b) => a.date.getTime() - b.date.getTime())
  return {
    upcoming: sorted.filter(event => new Date(event.archiveAfter) > now),
    past: sorted.filter(event => new Date(event.archiveAfter) <= now).reverse(),
  }
}
