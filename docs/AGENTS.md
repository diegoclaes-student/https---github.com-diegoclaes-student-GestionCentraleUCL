# Rôles Opérationnels - Gestion Centrale UCL

Ce document décrit les différents rôles et leurs responsabilités au sein de l'organisation étudiante.

## 🎯 Rôles du Bureau

### Président(e) - PRESIDENT
**Permissions**: Accès total au système
- Gestion complète des membres et rôles
- Supervision de tous les événements
- Accès aux données financières
- Configuration du système
- Validation des décisions importantes

### Vice-Président(e) - VICE_PRESIDENT  
**Permissions**: Accès étendu sans configuration système
- Gestion des membres
- Organisation d'événements
- Suivi des paiements
- Communication avec les membres
- Support au président

### Trésorier(ère) - TRESORIER
**Permissions**: Focus sur les aspects financiers
- Gestion des cotisations
- Suivi des paiements Stripe
- Génération de rapports financiers
- Relances de paiement
- Check-in aux événements

### Secrétaire - SECRETAIRE
**Permissions**: Communication et documentation
- Gestion des membres
- Rédaction d'annonces
- Coordination des événements
- Tenue des registres
- Communication interne

## 🎪 Rôles Spécialisés

### Responsable Événements - EVENT_LEAD
**Permissions**: Gestion complète des événements
- Création et modification d'événements
- Gestion de la billetterie
- Check-in et suivi de participation
- Coordination logistique

### Responsable Communication - COMMS_LEAD
**Permissions**: Communication externe et interne
- Rédaction et envoi d'annonces
- Gestion des campagnes d'information
- Relations publiques
- Réseaux sociaux (externe au système)

## 👥 Rôle de Base

### Membre - MEMBER
**Permissions**: Accès en lecture
- Consultation des événements publics
- Achat de billets
- Consultation de son profil
- Accès aux annonces

## 🔐 Système de Permissions

### Actions Principales
- **users:read/write/delete**: Gestion des membres
- **events:read/write/delete/checkin**: Gestion des événements
- **tickets:read/write**: Billetterie
- **payments:read/write**: Finances
- **dues:read/write**: Cotisations
- **announcements:read/write**: Communication
- **roles:read/write**: Gestion des rôles
- **settings:read/write**: Configuration

### Scopes de Permissions
- **Global**: Permissions sur toute l'organisation
- **Event-specific**: Permissions limitées à un événement particulier

## 📋 Processus Opérationnels

### Gestion des Membres
1. **Inscription**: Auto-inscription possible, validation par bureau
2. **Activation**: Président ou Vice-Président active les comptes
3. **Rôles**: Attribution selon les besoins et élections
4. **Cotisations**: Suivi automatisé avec relances

### Organisation d'Événements
1. **Création**: Event Lead ou Bureau crée l'événement
2. **Configuration**: Types de billets, prix, quotas
3. **Publication**: Événement visible selon paramètres
4. **Gestion**: Check-in, suivi, reporting

### Communication
1. **Annonces**: Rédaction par Comms Lead ou Secrétaire
2. **Ciblage**: Possibilité de cibler des groupes spécifiques
3. **Envoi**: Automatique via Resend ou manuel selon configuration

### Finances
1. **Cotisations**: Campagnes gérées par Trésorier
2. **Paiements**: Intégration Stripe pour transactions
3. **Relances**: Emails automatiques pour impayés
4. **Reporting**: Tableaux de bord et exports

## 🎯 Bonnes Pratiques

### Sécurité
- Rotation régulière des accès administrateur
- Review des permissions trimestrielle
- Audit des actions sensibles
- Formation sur la confidentialité des données

### Gestion des Accès
- Attribution des rôles selon les élections/nominations
- Révocation immédiate des accès en fin de mandat
- Principe du moindre privilège
- Documentation des changements de permissions

### Communication
- Templates standardisés pour les annonces récurrentes
- Validation croisée pour communications importantes
- Archive des communications officielles
- Respect des délais de préavis pour événements

## 🔄 Transition et Formation

### Passation de Pouvoirs
- Export des données importantes
- Formation des nouveaux responsables
- Documentation des processus spécifiques
- Migration des accès externes (Stripe, Resend, etc.)

### Formation Continue
- Session d'onboarding pour nouveaux membres du bureau
- Documentation des procédures dans le système
- Partage des bonnes pratiques
- Support technique continu

---

*Ce document est mis à jour régulièrement selon l'évolution de l'organisation.*