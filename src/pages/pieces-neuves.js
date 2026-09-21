/**
 * Page : /pieces-neuves/
 */
import { esc, adresseLigne, boutonsCta, blocFaq } from '../helpers.js';

const faq = [
  {
    q: 'Avez-vous des pièces neuves pour toutes les marques ?',
    r: `<p>Oui, ZM Pièces Auto fournit des pièces neuves pour toutes les marques de véhicules courantes. Marques de véhicules les plus demandées : [À CONFIRMER].</p>`,
  },
  {
    q: 'Quelles marques d\'équipementiers proposez-vous ?',
    r: `<p>Marques d'équipementiers disponibles : [À CONFIRMER]. Nous vous indiquons la marque et la qualité (origine ou équivalent) pour chaque pièce proposée.</p>`,
  },
  {
    q: 'Faut-il commander à l\'avance une pièce neuve ?',
    r: `<p>Les pièces courantes sont souvent en stock au magasin. Pour les autres, le délai de commande vous est indiqué au moment de la demande : [À CONFIRMER].</p>`,
  },
];

export default {
  path: '/pieces-neuves/',
  titreCourt: 'Pièces neuves',
  titre: 'Pièces auto neuves toutes marques à Aubervilliers | ZM Pièces Auto',
  description:
    'Pièces détachées auto neuves toutes marques à Aubervilliers (93) : batteries, alternateurs, amortisseurs, démarreurs, filtres, freinage. ZM Pièces Auto, 61 rue Heurtault.',
  priorite: '0.8',
  faq,
  contenu: (c) => `
<section class="section container">
  <h1>Pièces auto neuves toutes marques à Aubervilliers</h1>
  <p class="chapo">${esc(c.nom)}, ${esc(adresseLigne(c))}, vend des pièces détachées automobiles neuves pour toutes les marques. Pour l'entretien courant ou une réparation, vous obtenez la bonne référence au comptoir, avec un conseil clair.</p>
  ${boutonsCta(c, { message: `Bonjour ${c.nom}, je cherche une pièce neuve pour : marque, modèle, année, motorisation : ... Pièce recherchée : ...` })}
</section>

<section class="section section-alt" aria-labelledby="familles-neuf-titre">
  <div class="container">
    <h2 id="familles-neuf-titre">Familles de pièces neuves disponibles</h2>
    <div class="grille-4">
      <a class="carte carte-lien" href="/batteries/"><h3>Batteries</h3><p>Batteries neuves pour voitures et utilitaires, toutes capacités.</p><span class="lien-suite">Voir les batteries</span></a>
      <a class="carte carte-lien" href="/alternateurs/"><h3>Alternateurs</h3><p>Alternateurs neufs ou d'occasion selon votre budget.</p><span class="lien-suite">Voir les alternateurs</span></a>
      <a class="carte carte-lien" href="/amortisseurs/"><h3>Amortisseurs</h3><p>Amortisseurs neufs, vendus par paire de préférence.</p><span class="lien-suite">Voir les amortisseurs</span></a>
      <a class="carte carte-lien" href="/demarreurs/"><h3>Démarreurs</h3><p>Démarreurs neufs et d'occasion, toutes marques.</p><span class="lien-suite">Voir les démarreurs</span></a>
    </div>
    <h3>Autres familles</h3>
    <ul class="liste-check">
      <li>Filtres (huile, air, habitacle, carburant) [À CONFIRMER]</li>
      <li>Freinage : plaquettes, disques [À CONFIRMER]</li>
      <li>Allumage et bougies [À CONFIRMER]</li>
      <li>Courroies et galets [À CONFIRMER]</li>
      <li>Accessoires : balais d'essuie-glace, ampoules, huiles [À CONFIRMER]</li>
    </ul>
  </div>
</section>

<section class="section container" aria-labelledby="equipementiers-titre">
  <h2 id="equipementiers-titre">Marques d'équipementiers</h2>
  <p>Marques d'équipementiers proposées : <strong>[À CONFIRMER]</strong>. Pour chaque pièce, nous vous indiquons s'il s'agit d'une pièce d'origine ou d'une pièce de qualité équivalente, et vous choisissez.</p>
  <h2>Neuf ou occasion : comment choisir</h2>
  <p>Pour les pièces d'usure et de sécurité (freins, batterie, filtres), le neuf est la règle. Pour les organes coûteux d'un véhicule ancien (alternateur, démarreur, carrosserie), <a href="/pieces-occasion/">une pièce d'occasion d'origine</a> est souvent le meilleur rapport qualité prix. Nous vous proposons les deux quand c'est possible.</p>
  ${boutonsCta(c, { message: `Bonjour ${c.nom}, je cherche une pièce neuve pour : marque, modèle, année, motorisation : ... Pièce recherchée : ...` })}
</section>

<div class="container">
  ${blocFaq(faq, 'Questions fréquentes sur les pièces neuves')}
</div>
`,
};
