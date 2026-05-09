# Backlog de Jeux

Application web de gestion de backlog de jeux vidéo. Suivez vos jeux, gérez votre collection et visualisez vos statistiques.

## Stack technique

- **[Nuxt 3](https://nuxt.com)** — Framework Vue.js full-stack
- **[Supabase](https://supabase.com)** — Base de données et authentification
- **[Pinia](https://pinia.vuejs.org)** — Gestion d'état
- **[Nuxt UI](https://ui.nuxt.com)** — Composants UI
- **[Tailwind CSS v4](https://tailwindcss.com)** — Styles
- **[Chart.js](https://www.chartjs.org) / vue-chartjs** — Graphiques et statistiques
- **[IGDB API](https://api-docs.igdb.com)** — Données des jeux vidéo

## Prérequis

- Node.js >= 18
- Un projet [Supabase](https://supabase.com) configuré
- Des credentials [IGDB / Twitch](https://api-docs.igdb.com/#account-creation) (Client ID + Access Token)

## Installation

### 1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd nuxt-backlog-jeux
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
# Supabase
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=your_supabase_anon_key

# IGDB API (via Twitch Developer)
API_CLIENT_ID=your_twitch_client_id
API_ACCESS_TOKEN=your_twitch_access_token
```

> Pour obtenir les credentials IGDB, créez une application sur [dev.twitch.tv](https://dev.twitch.tv/console) puis suivez la [documentation IGDB](https://api-docs.igdb.com/#account-creation).

### 4. Lancer en développement

```bash
npm run dev
```

L'application est disponible sur `http://localhost:3000`

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile pour la production |
| `npm run preview` | Previsualise le build de production |
| `npm run generate` | Génère un site statique |
| `npm test` | Lance les tests (Vitest) |

## Structure du projet

```
nuxt-backlog-jeux/
├── assets/          # Images et styles globaux
├── components/      # Composants Vue réutilisables
│   ├── Chart/       # Graphiques (statuts, plateformes)
│   ├── Games/       # Composants liés aux jeux
│   ├── Home/        # Composants de la page d'accueil
│   └── Profile/     # Composants du profil
├── composables/     # Logique réutilisable (useGames, useGameFilters)
├── layouts/         # Layouts Nuxt
├── middleware/      # Middleware d'authentification
├── pages/           # Pages (routage automatique)
├── server/api/      # Routes API serveur (appels IGDB)
├── stores/          # Stores Pinia
├── tests/           # Tests Vitest
└── types/           # Types TypeScript
```
