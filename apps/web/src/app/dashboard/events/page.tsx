import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function EventsPage() {
  // Mock data - would be fetched from API
  const events = [
    {
      id: '1',
      title: 'Welcome Party 2024',
      slug: 'welcome-party-2024',
      description: 'Join us for the annual welcome party!',
      location: 'Student Center, UCL',
      startAt: '2024-02-15T20:00:00Z',
      endAt: '2024-02-16T00:00:00Z',
      status: 'PUBLISHED',
      capacity: 200,
      ticketsSold: 45,
    },
    {
      id: '2',
      title: 'Study Session - Mathematics',
      slug: 'study-session-math',
      description: 'Group study session for mathematics exam preparation',
      location: 'Library, UCL',
      startAt: '2024-02-12T14:00:00Z',
      endAt: '2024-02-12T16:00:00Z',
      status: 'PUBLISHED',
      capacity: 30,
      ticketsSold: 12,
    },
    {
      id: '3',
      title: 'End of Year Gala',
      slug: 'end-year-gala',
      description: 'Celebration of the academic year',
      location: 'Grand Hall, UCL',
      startAt: '2024-06-20T19:00:00Z',
      endAt: '2024-06-20T23:00:00Z',
      status: 'DRAFT',
      capacity: 300,
      ticketsSold: 0,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800'
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800'
      case 'CLOSED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'Publié'
      case 'DRAFT':
        return 'Brouillon'
      case 'CLOSED':
        return 'Fermé'
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Événements</h1>
          <p className="text-gray-600">Gérez vos événements et la billetterie</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/events/new">
            Créer un événement
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {event.description}
                  </CardDescription>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                  {getStatusText(event.status)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Date & Heure</p>
                  <p className="text-sm">
                    {new Date(event.startAt).toLocaleString('fr-BE', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Lieu</p>
                  <p className="text-sm">{event.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Billets</p>
                  <p className="text-sm">
                    {event.ticketsSold} / {event.capacity || '∞'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/events/${event.id}`}>
                      Voir
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/events/${event.slug}/checkin`}>
                      Check-in
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm">
                    Modifier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-600 mb-4">Aucun événement créé pour le moment</p>
            <Button asChild>
              <Link href="/dashboard/events/new">
                Créer votre premier événement
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}