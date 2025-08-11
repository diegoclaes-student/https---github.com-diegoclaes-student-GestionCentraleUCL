import Link from "next/link"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Membres', href: '/dashboard/members' },
  { name: 'Événements', href: '/dashboard/events' },
  { name: 'Cotisations', href: '/dashboard/dues' },
  { name: 'Annonces', href: '/dashboard/announcements' },
  { name: 'Paramètres', href: '/dashboard/settings' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">Gestion UCL</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin User</span>
              <Button variant="outline" size="sm">
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  )
}