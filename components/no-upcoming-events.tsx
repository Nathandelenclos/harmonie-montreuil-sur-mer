import { CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NoUpcomingEvents() {
  return <div className="rounded-lg border bg-white p-8">
    <CalendarDays aria-hidden="true" className="h-8 w-8 text-primary mb-4" />
    <h3 className="text-2xl font-bold mb-3">La prochaine programmation arrive bientôt</h3>
    <p className="mb-6 text-muted-foreground">Retrouvez ici les nouvelles dates dès leur annonce et suivez la vie de l’harmonie sur les réseaux sociaux.</p>
    <Button asChild variant="outline" className="h-auto min-h-11 whitespace-normal text-center"><a href="https://www.instagram.com/harmoniemontreuilsurmer/">Suivre l’harmonie sur Instagram</a></Button>
  </div>
}
