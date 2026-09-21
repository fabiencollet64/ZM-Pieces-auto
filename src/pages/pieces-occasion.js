/**
 * Page stratégique : /pieces-occasion/
 */
import { esc, adresseLigne, boutonsCta, blocFaq, photo } from '../helpers.js';

const faq = [
  {
    q: "Où trouver une pièce auto d'occasion à Aubervilliers ?",
    r: `<p>ZM Pièces Auto, 61 rue Heurtault à Aubervilliers, vend des pièces détachées d'occasion pour toutes les marques de véhicules. Envoyez votre demande par WhatsApp ou par téléphone, nous vérifions le stock et vous passez récupérer la pièce au magasin.</p>`,
  },
  {
    q: "Les pièces d'occasion sont-elles garanties ?",
    r: `<p>Garantie sur les pièces d'occasion : [À CONFIRMER]. Demandez les conditions au comptoir avant l'achat, elles vous seront précisées pour chaque pièce.</p>`,
  },
  {
    q: "Quelle est la différence de prix entre une pièce d'occasion et une pièce neuve ?",
    r: `<p>Une pièce d'occasion coûte en général nettement moins cher qu'une pièce neuve équivalente, surtout pour les organes coûteux comme les alternateurs, les démarreurs ou les éléments de carrosserie. L'écart exact dépend de la pièce et du véhicule : nous vous donnons les deux prix quand les deux options existent.</p>`,
  },
  {
    q: "Comment savoir si une pièce d'occasion est compatible avec ma voiture ?",
    r: `<p>Donnez-nous la marque, le modèle, l'année, la motorisation et si possible le numéro d'immatriculation ou la référence gravée sur la pièce d'origine. Nous vérifions la compatibilité avant de vous la proposer.</p>`,
  },
  {
    q: "Peut-on réserver une pièce d'occasion par WhatsApp ?",
    r: `<p>Oui. Envoyez votre demande sur WhatsApp, nous confirmons la disponibilité et le prix, puis nous vous mettons la pièce de côté le temps que vous passiez au magasin. Conditions de réservation : [À CONFIRMER].</p>`,
  },
];

export default {
  path: '/pieces-occasion/',
  titreCourt: "Pièces d'occasion",
  titre: "Pièces auto d'occasion à Aubervilliers, toutes marques | ZM Pièces Auto",
  description:
    "Pièces auto d'occasion à Aubervilliers (93) : alternateurs, démarreurs, amortisseurs, carrosserie, toutes marques. Pièces d'origine à prix réduit, 61 rue Heurtault.",
  priorite: '0.9',
  faq,
  contenu: (c) => `
<section class="section container">
  <h1>Pièces auto d'occasion à Aubervilliers</h1>
  <p class="chapo">${esc(c.nom)} est un magasin de pièces détachées automobiles d'occasion situé au ${esc(adresseLigne(c))}. Nous proposons des pièces d'origine, démontées sur des véhicules, pour toutes les marques, à une fraction du prix du neuf.</p>
  ${boutonsCta(c, { message: `Bonjour ${c.nom}, je cherche une pièce d'occasion pour : marque, modèle, année, motorisation : ... Pièce recherchée : ...` })}
</section>

<section class="section section-alt" aria-labelledby="pourquoi-titre">
  <div class="container">
    <h2 id="pourquoi-titre">Pourquoi choisir une pièce d'occasion</h2>
    <div class="grille-3">
      <article class="carte">
        <h3>Le prix</h3>
        <p>Une pièce d'occasion coûte bien moins cher qu'une pièce neuve. Pour un véhicule qui a déjà plusieurs années, c'est souvent la solution la plus raisonnable.</p>
      </article>
      <article class="carte">
        <h3>La disponibilité</h3>
        <p>Certaines pièces ne se fabriquent plus ou demandent des semaines de commande. En occasion, la pièce est parfois disponible tout de suite au magasin.</p>
      </article>
      <article class="carte">
        <h3>Des pièces d'origine</h3>
        <p>Une pièce d'occasion est une pièce d'origine constructeur, montée en usine. Elle correspond exactement à votre véhicule, sans adaptation.</p>
      </article>
    </div>
  </div>
</section>

<section class="section container" aria-labelledby="types-titre">
  <div class="grille-2 grille-texte-photo">
    <div>
      <h2 id="types-titre">Types de pièces d'occasion disponibles</h2>
      <p>Le stock évolue en permanence. Les familles les plus courantes :</p>
      <ul class="liste-check">
        <li><a href="/alternateurs/">Alternateurs</a> d'occasion, testés</li>
        <li><a href="/demarreurs/">Démarreurs</a> d'occasion</li>
        <li><a href="/amortisseurs/">Amortisseurs</a> et pièces de suspension</li>
        <li>Éléments de carrosserie : portières, pare-chocs, capots, rétroviseurs, optiques [À CONFIRMER]</li>
        <li>Pièces moteur et boîte de vitesses [À CONFIRMER]</li>
        <li>Accessoires et pièces d'habitacle [À CONFIRMER]</li>
      </ul>
      <p>Vous ne voyez pas votre pièce dans cette liste ? Demandez-nous : nous pouvons souvent la trouver.</p>
    </div>
    ${photo('comptoir', "Alternateurs et feux d'occasion en rayon au magasin")}
  </div>
</section>

<section class="section section-alt" aria-labelledby="garantie-titre">
  <div class="container">
    <h2 id="garantie-titre">Garantie et contrôle des pièces d'occasion</h2>
    <p>Garantie sur les pièces d'occasion : <strong>${esc(c.garantieOccasion)}</strong>.</p>
    <p>Procédure de contrôle des pièces avant la vente : [À CONFIRMER].</p>
    <p>Conditions d'échange ou de retour : [À CONFIRMER].</p>
  </div>
</section>

<section class="section container" aria-labelledby="demande-titre">
  <h2 id="demande-titre">Demander une pièce d'occasion</h2>
  <p>Pour que nous trouvions la bonne pièce du premier coup, envoyez-nous :</p>
  <ol>
    <li>La marque, le modèle et l'année du véhicule.</li>
    <li>La motorisation (essence ou diesel, cylindrée, puissance) ou le numéro d'immatriculation.</li>
    <li>Le nom de la pièce et, si possible, une photo de la pièce d'origine.</li>
  </ol>
  ${boutonsCta(c, { message: `Bonjour ${c.nom}, je cherche une pièce d'occasion pour : marque, modèle, année, motorisation : ... Pièce recherchée : ...` })}
  <p>Vous préférez remplir un formulaire ? <a href="/demande-de-piece/">Utilisez la demande de pièce en ligne</a>, elle prépare le message WhatsApp pour vous.</p>
</section>

<div class="container">
  ${blocFaq(faq, "Questions fréquentes sur les pièces d'occasion")}
</div>

<section class="section container" aria-labelledby="liens-titre">
  <h2 id="liens-titre">Voir aussi</h2>
  <ul>
    <li><a href="/pieces-neuves/">Pièces auto neuves toutes marques à Aubervilliers</a></li>
    <li><a href="/zone-desservie/">Zone desservie : Aubervilliers, Saint-Denis, La Courneuve, Pantin, Bobigny, Paris 18e et 19e</a></li>
    <li><a href="/contact/">Adresse, horaires et accès au magasin</a></li>
  </ul>
</section>
`,
};
