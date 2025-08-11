# API Documentation - Gestion Centrale UCL

Cette documentation décrit les endpoints API disponibles dans l'application Gestion Centrale UCL.

## 🔐 Authentification

Toutes les routes API nécessitent une authentification via NextAuth.js, sauf indication contraire.

```typescript
// Headers requis
{
  "Authorization": "Bearer <session-token>",
  "Content-Type": "application/json"
}
```

## 👥 Gestion des Utilisateurs

### GET /api/users
Récupère la liste des utilisateurs avec pagination et filtres.

**Paramètres de requête :**
- `page` (number, optionnel) : Numéro de page (défaut: 1)
- `limit` (number, optionnel) : Nombre d'éléments par page (défaut: 20)
- `search` (string, optionnel) : Recherche dans nom, prénom, email
- `isActive` (boolean, optionnel) : Filtrer par statut actif

**Réponse :**
```json
{
  "users": [
    {
      "id": "cm123456789",
      "email": "user@ucl.ac.be",
      "firstName": "Jean",
      "lastName": "Dupont",
      "phone": "+32 123 456 789",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "roles": [
        {
          "id": "role123",
          "role": "MEMBER",
          "scope": null
        }
      ],
      "memberships": [
        {
          "id": "membership123",
          "status": "ACTIVE",
          "startAt": "2024-01-15T00:00:00Z"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

### POST /api/users
Crée un nouvel utilisateur.

**Corps de la requête :**
```json
{
  "email": "nouveau@ucl.ac.be",
  "firstName": "Nouveau",
  "lastName": "Membre",
  "phone": "+32 987 654 321"
}
```

**Réponse :** Objet utilisateur créé (201) ou erreur de validation (400)

### GET /api/users/[id]
Récupère un utilisateur spécifique par son ID.

**Réponse :** Objet utilisateur ou erreur 404

### PUT /api/users/[id]
Met à jour un utilisateur existant.

**Corps de la requête :** Champs à modifier (partiels)
```json
{
  "firstName": "Nouveau Prénom",
  "phone": "+32 111 222 333"
}
```

### DELETE /api/users/[id]
Supprime (désactive) un utilisateur.

**Réponse :** `{ "success": true }`

## 🎪 Gestion des Événements

### GET /api/events
Récupère la liste des événements.

**Paramètres de requête :**
- `page`, `limit` : Pagination
- `search` : Recherche textuelle
- `status` : Filtrer par statut (DRAFT, PUBLISHED, CLOSED)

**Réponse :**
```json
{
  "events": [
    {
      "id": "event123",
      "title": "Welcome Party 2024",
      "slug": "welcome-party-2024",
      "description": "Join us for the annual welcome party!",
      "location": "Student Center, UCL",
      "startAt": "2024-02-15T20:00:00Z",
      "endAt": "2024-02-16T00:00:00Z",
      "capacity": 200,
      "status": "PUBLISHED",
      "visibility": "PUBLIC",
      "ticketTypes": [
        {
          "id": "ticket123",
          "name": "Student",
          "priceCents": 500,
          "quota": 150,
          "memberOnly": true
        }
      ],
      "_count": {
        "tickets": 45
      }
    }
  ],
  "pagination": { /* ... */ }
}
```

### POST /api/events
Crée un nouvel événement.

**Corps de la requête :**
```json
{
  "title": "Nouvel Événement",
  "slug": "nouvel-evenement",
  "description": "Description de l'événement",
  "location": "Lieu de l'événement",
  "startAt": "2024-03-01T19:00:00Z",
  "endAt": "2024-03-01T23:00:00Z",
  "capacity": 100,
  "status": "DRAFT",
  "visibility": "PUBLIC"
}
```

## 📊 Tableau de Bord

### GET /api/dashboard
Récupère les statistiques du tableau de bord.

**Réponse :**
```json
{
  "stats": {
    "activeMembers": 142,
    "totalMembers": 150,
    "membershipRate": 85,
    "upcomingEvents": 3,
    "todayCheckIns": 8,
    "totalRevenue": 2840,
    "pendingPayments": 15
  },
  "upcomingEvents": [
    {
      "id": "event123",
      "title": "Welcome Party 2024",
      "startAt": "2024-02-15T20:00:00Z",
      "location": "Student Center",
      "ticketsSold": 45,
      "capacity": 200
    }
  ]
}
```

## 🎫 Billetterie

### GET /api/events/[eventId]/tickets
Récupère les billets d'un événement.

### POST /api/events/[eventId]/tickets
Achète un billet pour un événement.

**Corps de la requête :**
```json
{
  "ticketTypeId": "ticket123",
  "userId": "user123",
  "paymentMethod": "stripe"
}
```

### POST /api/tickets/[ticketId]/checkin
Effectue le check-in d'un billet via QR code.

**Corps de la requête :**
```json
{
  "qrCode": "signed-jwt-token",
  "location": "Entrance A"
}
```

## 💰 Paiements

### GET /api/payments
Récupère l'historique des paiements.

### GET /api/dues
Récupère les campagnes de cotisation.

### POST /api/dues
Crée une nouvelle campagne de cotisation.

### POST /api/payments/stripe/webhook
Webhook Stripe pour traitement des paiements (non authentifié, signature vérifiée).

## 📢 Communications

### GET /api/announcements
Récupère les annonces.

### POST /api/announcements
Crée une nouvelle annonce.

**Corps de la requête :**
```json
{
  "title": "Titre de l'annonce",
  "body": "Contenu de l'annonce...",
  "targets": ["all"] // ou ["MEMBER", "EVENT_LEAD"]
}
```

### POST /api/announcements/[id]/send
Envoie une annonce par email.

## 🔧 Administration

### GET /api/admin/audit-logs
Récupère les journaux d'audit (admin uniquement).

### GET /api/admin/backup-status
Vérifie le statut des sauvegardes.

### POST /api/admin/export-data
Exporte les données d'un utilisateur (RGPD).

## ⏰ Tâches Cron

### POST /api/cron/payment-reminders
Envoie les relances de paiement (authentification par token cron).

### POST /api/cron/cleanup
Nettoie les données expirées.

## 📤 Import/Export

### POST /api/users/import-csv
Importe des utilisateurs depuis un fichier CSV.

**Multipart form data :**
```
file: <csv-file>
options: { "skipHeader": true, "updateExisting": false }
```

### GET /api/users/export-csv
Exporte la liste des utilisateurs en CSV.

**Paramètres :** Mêmes filtres que GET /api/users

## 🚨 Gestion d'Erreurs

### Codes de Statut Standards
- `200` : Succès
- `201` : Créé avec succès
- `400` : Erreur de validation / Requête malformée
- `401` : Non authentifié
- `403` : Accès interdit (permissions insuffisantes)
- `404` : Ressource non trouvée
- `429` : Trop de requêtes (rate limiting)
- `500` : Erreur serveur interne

### Format d'Erreur Standard
```json
{
  "error": "Description de l'erreur",
  "code": "ERROR_CODE",
  "details": {
    // Détails spécifiques selon le contexte
  }
}
```

### Erreurs de Validation Zod
```json
{
  "error": "Validation error",
  "details": {
    "issues": [
      {
        "path": ["email"],
        "message": "Invalid email format"
      }
    ]
  }
}
```

## 🔒 Permissions Requises

| Endpoint | Permission Requise |
|----------|-------------------|
| `GET /api/users` | `users:read` |
| `POST /api/users` | `users:write` |
| `DELETE /api/users/[id]` | `users:delete` |
| `GET /api/events` | `events:read` |
| `POST /api/events` | `events:write` |
| `POST /api/tickets/*/checkin` | `events:checkin` |
| `GET /api/dashboard` | Membre actif |
| `POST /api/announcements` | `announcements:write` |

## 📝 Exemples d'Usage

### Authentification et Récupération des Utilisateurs
```typescript
// Next.js Client Component
import { useSession } from 'next-auth/react';

const { data: session } = useSession();

const fetchUsers = async () => {
  const response = await fetch('/api/users?page=1&limit=10', {
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return response.json();
};
```

### Création d'un Événement
```typescript
const createEvent = async (eventData: CreateEventInput) => {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(eventData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  
  return response.json();
};
```

## 🔄 Rate Limiting

- **API générale** : 100 requêtes / 15 minutes par IP
- **Authentification** : 5 tentatives / 15 minutes par IP
- **Upload fichiers** : 10 uploads / heure par utilisateur
- **Emails** : 50 emails / jour par organisation

## 📋 Changelog API

### v1.0.0 (Date actuelle)
- ✅ Endpoints de base pour utilisateurs et événements
- ✅ Système d'authentification NextAuth
- ✅ Validation Zod sur toutes les entrées
- ✅ Rate limiting basique
- ✅ Support Stripe webhook

### Roadmap v1.1.0
- 🔄 Endpoint GraphQL pour requêtes complexes
- 🔄 WebSocket pour notifications temps réel
- 🔄 API versioning avec headers
- 🔄 Cache Redis pour performances

---

**Documentation générée automatiquement** | **Version API : 1.0** | **Base URL : `/api`**