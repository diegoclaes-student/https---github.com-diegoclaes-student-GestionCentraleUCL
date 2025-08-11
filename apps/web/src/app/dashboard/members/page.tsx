import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function MembersPage() {
  // Mock data - would be fetched from API
  const members = [
    {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@student.ucl.ac.be',
      phone: '+32 123 456 789',
      status: 'ACTIVE',
      roles: ['MEMBER'],
      joinDate: '2024-01-15',
    },
    {
      id: '2',
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@student.ucl.ac.be',
      phone: '+32 987 654 321',
      status: 'ACTIVE',
      roles: ['EVENT_LEAD'],
      joinDate: '2023-09-10',
    },
    {
      id: '3',
      firstName: 'Pierre',
      lastName: 'Dubois',
      email: 'pierre.dubois@student.ucl.ac.be',
      phone: '+32 456 789 123',
      status: 'PENDING',
      roles: ['MEMBER'],
      joinDate: '2024-01-20',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Membres</h1>
          <p className="text-gray-600">Gérez les membres de votre organisation</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            Importer CSV
          </Button>
          <Button variant="outline">
            Exporter CSV
          </Button>
          <Button asChild>
            <Link href="/dashboard/members/new">
              Ajouter un membre
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Membres</CardTitle>
          <CardDescription>
            {members.length} membres au total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input 
              placeholder="Rechercher un membre..." 
              className="max-w-sm"
            />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Nom</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Téléphone</th>
                  <th className="text-left py-3 px-4">Statut</th>
                  <th className="text-left py-3 px-4">Rôles</th>
                  <th className="text-left py-3 px-4">Inscription</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">
                      {member.firstName} {member.lastName}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {member.email}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {member.phone}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        member.status === 'ACTIVE' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {member.status === 'ACTIVE' ? 'Actif' : 'En attente'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {member.roles.join(', ')}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(member.joinDate).toLocaleDateString('fr-BE')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/members/${member.id}`}>
                            Voir
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          Modifier
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}