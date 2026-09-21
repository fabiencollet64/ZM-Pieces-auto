# Site vitrine ZM Pièces Auto

Site statique du magasin **ZM Pièces Auto**, 61 rue Heurtault, 93300 Aubervilliers : pièces auto neuves et d'occasion, toutes marques.

- HTML + CSS + un seul petit script (menu mobile et formulaire WhatsApp).
- Aucune base de données, aucun CMS, aucune dépendance à installer : Node.js suffit pour générer les pages.
- Hébergement gratuit sur Cloudflare Pages, Netlify ou GitHub Pages.
- Score Lighthouse de la page d'accueil (mobile) : 100 en performance, accessibilité, bonnes pratiques et SEO. Rapport dans `lighthouse/accueil-mobile.html`.

## 1. Comment modifier une information (téléphone, horaires, garantie...)

Toutes les informations du magasin sont dans **un seul fichier : `site.config.json`**.

1. Ouvrez `site.config.json` avec n'importe quel éditeur de texte (Bloc-notes, TextEdit, VS Code...).
2. Remplacez la valeur entre guillemets. Exemple, pour le téléphone :

   ```json
   "telephone": {
     "affichage": "01 23 45 67 89",
     "e164": "+33123456789"
   },
   ```

3. Les valeurs `[À CONFIRMER]` sont affichées telles quelles sur le site tant qu'elles ne sont pas remplacées. La liste complète est dans `A-CONFIRMER.md`.
4. Enregistrez le fichier et envoyez-le sur GitHub (ou relancez la génération, voir plus bas). L'hébergeur régénère le site tout seul : la nouvelle valeur apparaît sur toutes les pages, dans le pied de page, dans le balisage schema.org pour Google, et dans `llms.txt` pour les IA.

Quelques clés importantes :

| Clé | Rôle |
|---|---|
| `siteUrl` | Adresse où le site est visible (sans `/` final), sous-chemin compris sur GitHub Pages. Passez `siteUrlConfirme` à `true` quand le domaine définitif est fixé. |
| `telephone.affichage` / `telephone.e164` | Numéro tel qu'affiché, et au format international pour le bouton « Appeler ». |
| `whatsapp.numero` | Numéro WhatsApp au format international sans `+` ni espaces (ex. `33612345678`). Tous les boutons WhatsApp l'utilisent. |
| `horaires.affichage` | Horaires affichés sur le site. `horaires.schema` est la version pour Google : passez `horaires.confirme` à `true` une fois vérifiée. |
| `geo.latitude` / `geo.longitude` | Coordonnées GPS du magasin (fiche Google > Partager). Laissez `null` tant qu'elles ne sont pas vérifiées. |
| `liens.ficheGoogle` / `liens.avisGoogle` | Lien de la fiche Google et lien « Laisser un avis ». |
| `zonesDesservies[].trajet` | Temps de trajet approximatif affiché sur la page Zone desservie. |
| `mentionsLegales` | Raison sociale, SIRET, responsable de publication, hébergeur. |

**Important** : le nom, l'adresse et le téléphone doivent être strictement identiques à ceux de la fiche Google.

### Modifier un texte de page

Les textes sont dans `src/pages/` (un fichier par page, les quatre pages de pièces sont dans `familles.js`). Modifiez le texte entre les guillemets ou les accents graves, puis régénérez. Règles à respecter : vouvoiement, pas de tiret cadratin (`—`), un seul titre `<h1>` par page. Le script de génération vérifie ces deux derniers points et refuse de publier en cas d'erreur.

### Remplacer ou ajouter des photos

Les photos sont dans `src/static/images/` au format WebP :

| Fichier | Contenu | Utilisée sur |
|---|---|---|
| `magasin.webp` | Intérieur du magasin (photo réelle) | Accueil (grande image), Contact |
| `comptoir.webp` | Comptoir et rayons d'alternateurs et de feux (photo réelle) | Accueil, Pièces d'occasion, Contact |
| `optique.webp` | Optique de phare (photo d'illustration) | Accueil, Pièces neuves |
| `atelier.webp` | Intervention sous le capot (photo d'illustration) | Accueil, pages Alternateurs, Batteries, Amortisseurs, Démarreurs |
| `stock.webp` | Rayonnages de pièces (photo d'illustration, non utilisée pour l'instant) | Disponible |

Les photos d'illustration sont signalées comme telles dans leur légende. Remplacez-les dès que possible par des photos du magasin (façade, rayons, pièces), ce qui est plus convaincant pour les clients et pour Google.

Pour remplacer une photo : enregistrez la nouvelle image en WebP (par exemple avec [Squoosh](https://squoosh.app), gratuit, dans le navigateur), environ 800 pixels de large, et déposez-la sous le même nom dans `src/static/images/`. Si les dimensions changent, mettez-les à jour dans la liste `PHOTOS` de `src/helpers.js`. Pour ajouter une photo : ajoutez le fichier, inscrivez-le dans `PHOTOS` avec `reel: true`, puis utilisez `photo('nom', 'légende')` dans la page voulue.

Le plan (`plan.svg`) est un schéma cliquable qui ouvre Google Maps. Vous pouvez le remplacer par une capture d'écran de la carte (800 × 500, WebP) sous le même nom, en adaptant l'extension dans `src/pages/accueil.js` et `src/pages/contact.js`.

L'image de partage WhatsApp / Facebook est `src/static/images/og-image.png` (1200 × 630).

## 2. Générer le site sur votre ordinateur (facultatif)

Utile pour vérifier avant de publier. Il faut [Node.js](https://nodejs.org) (version 18 ou plus).

```bash
npm run build     # génère le site dans le dossier dist/
npm run check     # idem, et liste tous les [À CONFIRMER] restants
npm run serve     # génère puis ouvre un serveur de test sur http://localhost:8080 (le sous-chemin de siteUrl est respecté)
```

Le dossier `dist/` est le site final : c'est lui qui est mis en ligne.

## 3. Déployer gratuitement

Le dépôt doit être sur GitHub. Ensuite, choisissez un hébergeur.

### Cloudflare Pages (recommandé)

1. Créez un compte sur [pages.cloudflare.com](https://pages.cloudflare.com), puis « Create a project » > « Connect to Git ».
2. Sélectionnez ce dépôt.
3. Réglages de build :
   - Framework preset : `None`
   - Build command : `node build.js`
   - Build output directory : `dist`
4. Cliquez sur « Save and Deploy ». Le site est en ligne sur une adresse `*.pages.dev` en une minute.
5. Pour utiliser votre nom de domaine : onglet « Custom domains ».

À chaque modification envoyée sur GitHub, Cloudflare régénère et publie le site automatiquement. Les en-têtes de sécurité et de cache du fichier `src/static/_headers` sont appliqués.

### Netlify

1. Compte sur [netlify.com](https://www.netlify.com), « Add new site » > « Import an existing project » > GitHub.
2. Sélectionnez le dépôt. Les réglages sont lus dans `netlify.toml` (commande `node build.js`, dossier `dist`).
3. « Deploy site ». Nom de domaine dans « Domain management ».

### GitHub Pages

1. Dans le dépôt GitHub : **Settings > Pages > Build and deployment > Source : « GitHub Actions »**. C'est indispensable : avec « Deploy from a branch », GitHub publie le README du dépôt et non le site.
2. Le workflow `.github/workflows/pages.yml` génère et publie le site à chaque envoi sur les branches listées dans le fichier (`main` et la branche de développement actuelle). Pour changer de branche, modifiez la liste `branches:` du fichier.
3. Adresse : `https://<utilisateur>.github.io/<dépôt>/`, soit actuellement `https://fabiencollet64.github.io/ZM-Pieces-auto/`. Vous pouvez suivre la publication dans l'onglet « Actions » du dépôt (une à deux minutes).
4. Le fichier `_headers` n'est pas pris en compte par GitHub Pages.

**Sous-chemin** : sans nom de domaine, GitHub Pages sert le site sous `/ZM-Pieces-auto/`. Le générateur lit ce sous-chemin dans `siteUrl` (`site.config.json`) et préfixe automatiquement tous les liens internes. Si vous ajoutez un nom de domaine (Settings > Pages > Custom domain), mettez simplement `siteUrl` à `https://www.votre-domaine.fr` : les liens redeviennent à la racine.

Dans tous les cas, `siteUrl` doit être exactement l'adresse où le site est visible, sinon les URL canoniques, le sitemap et les liens internes sont faux.

## 4. Après la mise en ligne

- Déclarez le site dans [Google Search Console](https://search.google.com/search-console) et envoyez `https://votre-domaine/sitemap.xml`.
- Ajoutez l'adresse du site sur la fiche Google du magasin.
- Vérifiez le balisage avec le [test des résultats enrichis](https://search.google.com/test/rich-results) : il doit reconnaître `AutoPartsStore`, `FAQPage` et `BreadcrumbList`.
- Testez le partage d'une page sur WhatsApp : le titre, la description et l'image doivent apparaître.

## 5. Organisation des fichiers

```
site.config.json        Toutes les informations du magasin (à modifier ici)
build.js                Génère le site dans dist/ (aucune dépendance)
serve.js                Serveur de test local
src/
  layout.js             En-tête, pied de page, <head>, balisage schema.org (AutoPartsStore, BreadcrumbList, FAQPage)
  helpers.js            Boutons WhatsApp / Appeler, bloc FAQ, placeholders photo, échappement HTML
  llms.js               Génère llms.txt (résumé factuel pour les IA)
  pages/                Une page par fichier ; familles.js contient les 4 pages de pièces
  css/style.css         Feuille de style (mobile first, police système, minifiée à la génération)
  js/main.js            Menu mobile + formulaire de demande de pièce (lien wa.me prérempli)
  static/               Fichiers copiés tels quels : images, favicon, manifest, _headers
dist/                   Site généré (ne pas modifier à la main, ignoré par git)
lighthouse/             Rapport Lighthouse de la page d'accueil
A-CONFIRMER.md          Liste des informations à confirmer avec le magasin
netlify.toml            Réglages Netlify
.github/workflows/      Déploiement GitHub Pages
```

### Ce que le site génère automatiquement

- Balises `title`, `meta description`, `canonical` et Open Graph uniques par page.
- JSON-LD `AutoPartsStore` sur toutes les pages, `BreadcrumbList` sur les pages internes, `FAQPage` sur la FAQ et les pages avec un bloc de questions.
- `sitemap.xml`, `robots.txt` (autorise Googlebot, Bingbot, GPTBot, OAI-SearchBot, PerplexityBot, Google-Extended, ClaudeBot), `llms.txt`, page `404.html`.
- Boutons WhatsApp et Appeler fixés en bas d'écran sur mobile.

## 6. Hors périmètre du site

Actions à mener à côté du code : optimisation de la fiche Google (catégories, description, photos, produits, questions/réponses), fiches Bing Places et Apple Business Connect, vérification des annuaires (PagesJaunes, Waze, Mappy), kit avis (QR code au comptoir et message WhatsApp type après achat).
