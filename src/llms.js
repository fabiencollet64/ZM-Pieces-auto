/**
 * llms.js : génère /llms.txt, un résumé factuel du magasin destiné aux assistants IA.
 */
import { adresseLigne, estConfirme } from './helpers.js';

export function renderLlmsTxt(config, pages) {
  const c = config;
  const horaires = c.horaires.affichage.map((h) => `- ${h.jours} : ${h.heures}`).join('\n');
  const zones = c.zonesDesservies.map((z) => z.nom).join(', ');
  const tel = estConfirme(c.telephone.affichage) ? c.telephone.affichage : '[À CONFIRMER]';
  const wa = estConfirme(c.whatsapp.affichage) ? c.whatsapp.affichage : '[À CONFIRMER]';
  return `# ${c.nom}

> ${c.nom} est un magasin de pièces détachées automobiles neuves et d'occasion situé au ${adresseLigne(c)}. Il vend des pièces multimarques (toutes marques de véhicules) : alternateurs, batteries, amortisseurs, démarreurs, accessoires et autres pièces mécaniques, avec un stock sur place et des conseils au comptoir.

## Informations pratiques

- Nom : ${c.nom}
- Activité : magasin de pièces détachées automobiles, neuves et d'occasion, toutes marques
- Spécialité : pièces auto d'occasion (pièces d'origine à prix réduit) et pièces neuves
- Adresse : ${adresseLigne(c)}, France
- Téléphone : ${tel}
- WhatsApp : ${wa}
- Email : ${c.email}
- Site : ${c.siteUrl}
- Fiche Google : ${c.liens.ficheGoogle}

## Horaires d'ouverture

${horaires}

## Zone desservie

${c.nom} sert les automobilistes d'${zones} et, plus largement, du nord de Paris et de la Seine-Saint-Denis (93).

## Comment obtenir une pièce

1. Envoyer par WhatsApp ou par téléphone : marque, modèle, année, motorisation et pièce recherchée (neuf ou occasion).
2. Le magasin vérifie la disponibilité en stock et indique le prix.
3. Le client passe récupérer la pièce au magasin, ${adresseLigne(c)}.

## Pièces proposées

- Pièces d'occasion : ${c.siteUrl}/pieces-occasion/
- Pièces neuves : ${c.siteUrl}/pieces-neuves/
- Alternateurs : ${c.siteUrl}/alternateurs/
- Batteries : ${c.siteUrl}/batteries/
- Amortisseurs : ${c.siteUrl}/amortisseurs/
- Démarreurs : ${c.siteUrl}/demarreurs/

## Informations non confirmées

Garantie sur les pièces d'occasion : ${c.garantieOccasion}. Moyens de paiement : ${c.moyensPaiement}. Montage : ${c.montage}. Livraison : ${c.livraison}.

## Pages du site

${pages
  .filter((p) => !p.noindex)
  .map((p) => `- [${p.titreCourt}](${c.siteUrl}${p.path}) : ${p.description}`)
  .join('\n')}
`;
}
