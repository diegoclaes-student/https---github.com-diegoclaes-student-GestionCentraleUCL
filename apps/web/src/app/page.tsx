import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gestion Centrale UCL
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Système de gestion pour organisations étudiantes
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Membres</CardTitle>
              <CardDescription>
                Gérez vos membres, leurs cotisations et leurs informations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/dashboard/members">Voir les membres</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Événements</CardTitle>
              <CardDescription>
                Créez et gérez vos événements avec billetterie intégrée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/dashboard/events">Voir les événements</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tableau de Bord</CardTitle>
              <CardDescription>
                Vue d'ensemble avec les métriques importantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/dashboard">Accéder au dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <Button asChild size="lg">
            <Link href="/login">Se connecter</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}