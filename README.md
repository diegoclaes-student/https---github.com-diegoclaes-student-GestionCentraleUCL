# Gestion Centrale UCL

Système de gestion complet pour organisations étudiantes - MVP utilisable dès le premier jour avec authentification, gestion des membres, événements, cotisations et tableau de bord.

## 🚀 Démarrage Rapide

```bash
# Cloner le projet
git clone <repository-url>
cd gestion-centrale-ucl

# Installer les dépendances
pnpm install

# Démarrer les services Docker (PostgreSQL, Redis, MailHog)
docker compose up -d

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# Générer le client Prisma et effectuer les migrations
pnpm db:migrate

# Seed de la base de données avec des données de démonstration
pnpm db:seed

# Démarrer l'application en développement
pnpm dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 📋 Fonctionnalités MVP

### ✅ Authentification & Profils
- Connexion par lien magique (email)
- Support OAuth (Google/Microsoft)
- Gestion des profils utilisateurs
- Système de rôles et permissions (RBAC)

### ✅ Gestion des Membres
- Liste filtrable des membres
- Import/Export CSV
- Fiches membres détaillées
- Gestion des statuts et rôles
- Historique des activités

### ✅ Événements & Billetterie
- Création et gestion d'événements
- Types de billets avec quotas
- Système de paiement (Stripe en mode test)
- Génération de QR codes pour check-in
- Interface check-in PWA

### ✅ Cotisations
- Campagnes de cotisation par saison
- Paiements intégrés (Stripe)
- Relances automatiques par email
- Suivi des paiements

### ✅ Communication
- Annonces ciblées
- Envoi d'emails (Resend)
- Templates personnalisables

### ✅ Tableau de Bord
- Métriques clés en temps réel
- Taux de cotisation
- Statistiques d'événements
- Check-ins du jour

## 🏗️ Architecture

### Monorepo Structure
```
├── apps/
│   └── web/              # Application Next.js 14
├── packages/
│   ├── core/             # Types, schémas Zod, RBAC, utils
│   └── db/               # Prisma, repositories, migrations
├── docker-compose.yml    # Services de développement
└── docs/                 # Documentation
```

### Stack Technique
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Base de données**: PostgreSQL
- **Authentification**: NextAuth.js
- **Paiements**: Stripe (feature flaggé)
- **Emails**: Resend
- **Cache**: Redis (rate limiting)
- **Dev Tools**: Docker Compose, pnpm workspaces

## 🔧 Scripts Disponibles

```bash
# Développement
pnpm dev                  # Démarrer l'app en mode dev
pnpm build               # Build de production
pnpm test                # Lancer les tests
pnpm lint                # Linting
pnpm typecheck          # Vérification TypeScript

# Base de données
pnpm db:migrate         # Migrations Prisma
pnpm db:seed           # Seed avec données de démo
pnpm db:studio         # Interface Prisma Studio
pnpm db:reset          # Reset complet de la DB

# Workspaces
pnpm --filter core build    # Build package core
pnpm --filter db build      # Build package db
pnpm --filter web build     # Build app web
```

## 🌍 Variables d'Environnement

Copiez `.env.example` vers `.env` et configurez:

```bash
# Base de données
DATABASE_URL="postgresql://postgres:password@localhost:5432/gestion_ucl"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth (optionnel)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe (mode test)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Resend pour emails
RESEND_API_KEY="re_..."

# Feature flags
PAYMENTS_ENABLED="true"
EMAILS_ENABLED="true"
```

## 🐳 Services Docker

Le fichier `docker-compose.yml` fournit:

- **PostgreSQL**: Base de données principale (port 5432)
- **Redis**: Cache et rate limiting (port 6379)
- **MailHog**: Serveur SMTP de test (port 1025, UI sur 8025)

```bash
docker compose up -d      # Démarrer tous les services
docker compose down       # Arrêter les services
docker compose logs -f    # Voir les logs
```

## 📊 Données de Démonstration

Le seed génère automatiquement:
- 150+ membres avec différents statuts et rôles
- Événements d'exemple avec billets
- Campagne de cotisation
- Transactions de test
- Utilisateur admin par défaut

**Connexion admin**: `admin@ucl.ac.be`

## 🔐 Sécurité & RGPD

- Middleware d'authentification sur toutes les routes protégées
- Validation des entrées via Zod
- Système RBAC granulaire
- Journaux d'audit pour actions sensibles
- Export de données personnelles
- Suppression logique des données

## 🧪 Tests

```bash
pnpm test                 # Tests unitaires (Vitest)
pnpm test:e2e            # Tests end-to-end
pnpm test:coverage       # Couverture de code
```

## 📈 Performance & Scalabilité

- Services découplés prêts pour extraction
- Interfaces TypeScript pour clients externes futurs
- Rate limiting configurable
- Cache Redis optionnel
- Build optimisé Next.js

## 🚀 Déploiement

### Développement
```bash
pnpm dev
```

### Production
```bash
pnpm build
pnpm start
```

### Docker
```bash
docker build -t gestion-ucl .
docker run -p 3000:3000 gestion-ucl
```

## 📚 Documentation

- [AGENTS.md](./docs/AGENTS.md) - Rôles opérationnels internes
- [PRIVACY.md](./docs/PRIVACY.md) - Politique de confidentialité
- [SECURITY.md](./docs/SECURITY.md) - Politique de sécurité
- [API.md](./docs/API.md) - Documentation API

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE) pour plus de détails.

## 🆘 Support

Pour toute question ou problème:
1. Vérifiez la [documentation](./docs/)
2. Consultez les [issues GitHub](../../issues)
3. Contactez l'équipe de développement

---

**Gestion Centrale UCL** - Simplifiez la gestion de votre organisation étudiante 🎓