import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function DashboardPage() {
  // Mock data - would be fetched from API
  const stats = {
    activeMembers: 142,
    membershipRate: 85,
    upcomingEvents: 3,
    todayCheckIns: 8,
    totalRevenue: 2840,
    pendingPayments: 15,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tableau de Bord</h1>
        <p className="text-gray-600">Vue d'ensemble de votre organisation</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Membres Actifs</CardDescription>
            <CardTitle className="text-3xl">{stats.activeMembers}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600">
              +12 ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Taux de Cotisation</CardDescription>
            <CardTitle className="text-3xl">{stats.membershipRate}%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600">
              +5% vs mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Événements à Venir</CardDescription>
            <CardTitle className="text-3xl">{stats.upcomingEvents}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/events" className="text-sm text-blue-600 hover:underline">
              Voir tous les événements
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Check-ins Aujourd'hui</CardDescription>
            <CardTitle className="text-3xl">{stats.todayCheckIns}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Pour tous les événements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenus Total</CardDescription>
            <CardTitle className="text-3xl">€{stats.totalRevenue}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600">
              +€340 ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Paiements en Attente</CardDescription>
            <CardTitle className="text-3xl">{stats.pendingPayments}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/dues" className="text-sm text-orange-600 hover:underline">
              Gérer les cotisations
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Événements à Venir</CardTitle>
            <CardDescription>Les prochains événements de votre organisation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Welcome Party 2024</p>
                  <p className="text-sm text-gray-600">Dans 7 jours</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">45/200 billets</p>
                  <p className="text-xs text-gray-600">Student Center</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Study Session - Math</p>
                  <p className="text-sm text-gray-600">Dans 3 jours</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">12/30 billets</p>
                  <p className="text-xs text-gray-600">Library</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>Raccourcis vers les actions courantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link 
                href="/dashboard/members/new" 
                className="block p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <p className="font-medium">Ajouter un membre</p>
                <p className="text-sm text-gray-600">Créer un nouveau profil membre</p>
              </Link>
              <Link 
                href="/dashboard/events/new" 
                className="block p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
              >
                <p className="font-medium">Créer un événement</p>
                <p className="text-sm text-gray-600">Organiser un nouvel événement</p>
              </Link>
              <Link 
                href="/dashboard/members?export=csv" 
                className="block p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
              >
                <p className="font-medium">Exporter les membres</p>
                <p className="text-sm text-gray-600">Télécharger la liste CSV</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}