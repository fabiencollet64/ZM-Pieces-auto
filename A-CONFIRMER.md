# Informations à confirmer avec le magasin

Tout ce qui est marqué `[À CONFIRMER]` sur le site provient soit de `site.config.json` (partie 1), soit d'un texte de page (partie 2). Commande pour recompter à tout moment : `npm run check`.

État au moment de la livraison : **141 occurrences** réparties sur les 12 pages. Une seule valeur de configuration corrigée en efface souvent plusieurs d'un coup (le téléphone apparaît sur toutes les pages, par exemple).

## 1. Valeurs de `site.config.json`

| Clé | Où elle apparaît | Question à poser au magasin |
|---|---|---|
| `siteUrl` (+ `siteUrlConfirme`) | URL canoniques, sitemap, Open Graph, llms.txt | Quelle est l'adresse définitive du site ? (Valeur actuelle : `https://fabiencollet64.github.io/ZM-Pieces-auto`, l'adresse GitHub Pages) |
| `telephone.affichage`, `telephone.e164` | Toutes les pages (pied de page, bouton Appeler, contact, schema.org, llms.txt) | Numéro de téléphone fixe du magasin, identique à la fiche Google. |
| `whatsapp.affichage`, `whatsapp.numero` | Tous les boutons WhatsApp, formulaire de demande, contact, llms.txt | Numéro WhatsApp (professionnel de préférence). |
| `email` | Contact, mentions légales, schema.org, llms.txt | Adresse email de contact. |
| `horaires.affichage` (+ `horaires.schema`, `horaires.confirme`) | Accueil, contact, pied de page, FAQ, schema.org, llms.txt | Horaires jour par jour, y compris samedi et dimanche. |
| `geo.latitude`, `geo.longitude` | schema.org (omis tant que `null`) | Coordonnées GPS exactes (fiche Google > Partager). |
| `garantieOccasion` | Accueil, pièces d'occasion, FAQ, llms.txt | Y a-t-il une garantie sur les pièces d'occasion ? Durée, conditions ? Indice : le panneau au comptoir (visible sur les photos) indique que les pièces mécaniques d'occasion ne sont pas remboursables mais donnent lieu à un avoir, et que les pièces électriques d'occasion ne sont ni garanties, ni échangeables, ni remboursables. À confirmer avec le gérant avant de l'écrire sur le site. |
| `moyensPaiement` | FAQ, llms.txt | Espèces, carte bancaire, virement, chèque ? |
| `marquesDemandees` | Accueil, FAQ | Marques de véhicules les plus demandées (ex. Peugeot, Renault, Volkswagen...). |
| `montage` | Accueil (indirect), FAQ, amortisseurs, llms.txt | Le magasin monte-t-il les pièces, ou oriente-t-il vers un garage ? |
| `livraison` | Accueil, zone desservie, FAQ, llms.txt | Livraison ou expédition possibles ? Dans quel rayon ? |
| `reprisePiecesUsagees` | FAQ | Reprise des pièces usagées (ancien alternateur, batterie...) ? |
| `acces.transports` | Contact, FAQ | Lignes de métro, RER, tram, bus les plus proches. |
| `acces.stationnement` | Contact, FAQ | Parking ou stationnement possible devant le magasin ? |
| `liens.ficheGoogle` | Accueil (avis), contact, schema.org `sameAs`, llms.txt | Lien de la fiche Google Business Profile. |
| `liens.avisGoogle` | Accueil (bouton « Laisser un avis ») | Lien court « Laisser un avis » fourni par Google. |
| `liens.facebook`, `liens.instagram` | schema.org `sameAs` (facultatif) | Pages réseaux sociaux si elles existent. |
| `fourchettePrix` | schema.org | Gamme de prix indicative (`€`, `€€`). Valeur provisoire : `€€`. |
| `zonesDesservies[].trajet` (7 villes) | Page Zone desservie | Temps de trajet approximatif en voiture depuis chaque ville. |
| `mentionsLegales.raisonSociale` | Mentions légales | Nom juridique de l'entreprise. |
| `mentionsLegales.formeJuridique` | Mentions légales | SARL, SAS, EI, micro-entreprise... |
| `mentionsLegales.siret` | Mentions légales | Numéro SIRET. |
| `mentionsLegales.responsablePublication` | Mentions légales | Nom du gérant ou responsable. |
| `mentionsLegales.hebergeur` | Mentions légales | Hébergeur retenu (Cloudflare Pages, Netlify ou GitHub Pages) et son adresse. |

## 2. Textes de pages (à modifier dans `src/pages/`)

| Page | Fichier | Point à confirmer |
|---|---|---|
| Pièces d'occasion | `pieces-occasion.js` | Familles disponibles en occasion : carrosserie (portières, pare-chocs, capots, rétroviseurs, optiques), pièces moteur et boîte de vitesses, accessoires et habitacle. |
| Pièces d'occasion | `pieces-occasion.js` | Procédure de contrôle des pièces avant la vente. |
| Pièces d'occasion | `pieces-occasion.js` | Conditions d'échange ou de retour. |
| Pièces d'occasion, FAQ | `pieces-occasion.js`, `faq.js` | Durée et conditions de réservation d'une pièce par WhatsApp. |
| Pièces neuves | `pieces-neuves.js` | Marques d'équipementiers proposées. |
| Pièces neuves | `pieces-neuves.js` | Familles neuves réellement vendues : filtres, freinage, allumage, courroies, accessoires (essuie-glace, ampoules, huiles). |
| Pièces neuves | `pieces-neuves.js` | Délai de commande pour une pièce non stockée. |
| Alternateurs | `familles.js` | Vente avec ou sans échange de l'ancienne pièce ; test des alternateurs d'occasion ; reprise de l'ancien alternateur. |
| Batteries | `familles.js` | Batteries AGM / EFB pour stop and start disponibles ? Vente de batteries d'occasion ? Garantie fabricant ? Reprise de l'ancienne batterie ? |
| Amortisseurs | `familles.js` | Vente de coupelles et butées ; contrôle des amortisseurs d'occasion ; montage. |
| Démarreurs | `familles.js` | Consigne sur les démarreurs neufs ; test et garantie des démarreurs d'occasion. |
| Demande de pièce | `demande-de-piece.js` | Note affichée tant que le numéro WhatsApp n'est pas renseigné (disparaît automatiquement ensuite). |
| Contact | `contact.js` | Jours fériés et fermetures exceptionnelles. |
| Accueil | `accueil.js` | Boutons « Voir les avis Google » et « Laisser un avis » inactifs tant que les liens ne sont pas renseignés (automatique). |
| Accueil, Pièces neuves, pages famille | `src/static/images/` | Trois photos d'illustration (`optique`, `atelier`, `stock`) à remplacer par des photos du magasin. Une photo de la façade manque encore. |

## 3. Non inventé, donc absent du site

Ces informations n'ont pas été fournies et n'apparaissent nulle part, même sous forme de placeholder : prix des pièces, nombre de références en stock, année de création du magasin, nom du gérant, photos réelles (des placeholders neutres sont en place).
