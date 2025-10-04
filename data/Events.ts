export interface Event {
    image?: string;
    title: string;
    date: Date;
    time: string;
    location: string;
    description: string;
    featured?: boolean;
}

export const events: Event[] = [
    {
        title: "Sainte Cécile",
        date: new Date(2025, 10, 16),
        time: "11h00",
        location: "Abbatial Saint Solve, Montreuil-sur-Mer",
        description: "Célébration de la Sainte Cécile, patronne des musiciens, avec un concert spécial.",
        featured: true,
    },
    {
        title: "Sacré Fiesta",
        date: new Date(2025, 10, 21),
        time: "20h30",
        location: "Théâtre, Montreuil-sur-Mer",
        description: "Concert d'automne de l'harmonie de montreuil-sur-mer avec des morceaux festifs et variés.",
        featured: true,
    },
]