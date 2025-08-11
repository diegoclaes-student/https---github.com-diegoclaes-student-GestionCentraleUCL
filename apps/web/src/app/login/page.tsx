import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>
            Connectez-vous à votre compte Gestion Centrale UCL
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Adresse e-mail
            </label>
            <Input
              id="email"
              type="email"
              placeholder="votre.email@ucl.ac.be"
              required
            />
          </div>
          
          <Button className="w-full" type="submit">
            Envoyer le lien de connexion
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continuer avec
              </span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full">
            Google
          </Button>
          
          <Button variant="outline" className="w-full">
            Microsoft
          </Button>
          
          <div className="text-center text-sm">
            <Link href="/register" className="text-primary hover:underline">
              Pas encore de compte ? S'inscrire
            </Link>
          </div>
          
          <div className="text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:underline">
              ← Retour à l'accueil
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}