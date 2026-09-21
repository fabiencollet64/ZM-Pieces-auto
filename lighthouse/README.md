# Rapport Lighthouse

`accueil-mobile.html` : rapport Lighthouse 13.5 de la page d'accueil, généré en local (serveur `node serve.js`, Chromium headless, profil mobile par défaut de Lighthouse avec simulation de réseau 4G lent et CPU ralenti). Ouvrez le fichier dans un navigateur.

| Catégorie | Score |
|---|---|
| Performance | 100 |
| Accessibilité | 100 |
| Bonnes pratiques | 100 |
| SEO | 100 |

Mesures clés : Largest Contentful Paint 1,8 s (photo d'accueil), Cumulative Layout Shift 0, Total Blocking Time 0 ms, poids total de la page 124 Ko.

Les pages `/demande-de-piece/` et `/faq/` obtiennent les mêmes scores. Les résultats en production dépendent de l'hébergeur (compression, cache) et peuvent varier de quelques points.

Pour relancer la mesure : `npx lighthouse http://localhost:8080/ --view` avec le serveur de test lancé (`npm run serve`).
