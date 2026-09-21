/**
 * Page d'accueil : /
 */
import { esc, adresseLigne, boutonsCta, photo, lienWhatsApp, messageDemande, estConfirme } from '../helpers.js';

export default {
  path: '/',
  titreCourt: 'Accueil',
  titre: "Pièces auto neuves et d'occasion à Aubervilliers | ZM Pièces Auto",
  description:
    "ZM Pièces Auto, 61 rue Heurtault à Aubervilliers : pièces auto neuves et d'occasion, toutes marques. Alternateurs, batteries, amortisseurs, démarreurs. Demande sur WhatsApp.",
  priorite: '1.0',
  contenu: (c, pages) => {
    const familles = pages.filter((p) => p.famille);
    return `
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-texte">
      <h1>Pièces auto neuves et d'occasion à Aubervilliers</h1>
      <p class="hero-accroche">Toutes marques, stock sur place, conseils au comptoir. ${esc(c.nom)} est un magasin de pièces détachées automobiles situé au ${esc(adresseLigne(c))}.</p>
      ${boutonsCta(c, { libelleWhatsApp: 'Demandez votre pièce sur WhatsApp', classe: 'cta-hero' })}
      <p class="hero-note">Envoyez la marque, le modèle, l'année et la pièce recherchée. Nous vérifions le stock et vous répondons.</p>
    </div>
    ${photo('magasin', `L'intérieur du magasin ${c.nom}, ${c.adresse.rue} à ${c.adresse.ville}`, { lazy: false })}
  </div>
</section>

<section class="section container" aria-labelledby="atouts-titre">
  <h2 id="atouts-titre">Pourquoi venir chez ${esc(c.nom)}</h2>
  <div class="grille-3">
    <article class="carte">
      <h3>Neuf et occasion</h3>
      <p>Vous choisissez entre une pièce neuve et une pièce d'occasion d'origine, selon votre budget et l'âge de votre véhicule. Garantie sur les pièces d'occasion : ${esc(c.garantieOccasion)}.</p>
    </article>
    <article class="carte">
      <h3>Toutes marques</h3>
      <p>Pièces multimarques pour voitures particulières et utilitaires, françaises, allemandes, japonaises ou autres. Marques les plus demandées : ${esc(c.marquesDemandees)}.</p>
    </article>
    <article class="carte">
      <h3>Magasin de proximité</h3>
      <p>Un comptoir à Aubervilliers, à quelques minutes de Saint-Denis, La Courneuve, Pantin, Bobigny et du nord de Paris. Vous parlez à quelqu'un qui connaît les pièces et vous repartez avec.</p>
    </article>
  </div>
</section>

<section class="section section-alt" aria-labelledby="familles-titre">
  <div class="container">
    <h2 id="familles-titre">Les pièces que nous proposons</h2>
    <p>Voici les familles les plus demandées. Le magasin propose d'autres pièces mécaniques et accessoires : demandez-nous.</p>
    <div class="grille-4">
      ${familles
        .map(
          (p) => `<a class="carte carte-lien" href="${p.path}">
        <h3>${esc(p.famille.pluriel)}</h3>
        <p>${esc(p.famille.resume)}</p>
        <span class="lien-suite">Voir les ${esc(p.famille.pluriel.toLowerCase())}</span>
      </a>`
        )
        .join('\n      ')}
    </div>
    <div class="grille-2">
      <a class="carte carte-lien" href="/pieces-occasion/">
        <h3>Pièces d'occasion</h3>
        <p>Pièces d'origine démontées, contrôlées, à prix réduit. Idéal pour les véhicules de plus de 5 ans.</p>
        <span class="lien-suite">Voir les pièces d'occasion</span>
      </a>
      <a class="carte carte-lien" href="/pieces-neuves/">
        <h3>Pièces neuves</h3>
        <p>Pièces neuves toutes marques pour l'entretien courant et les remplacements sensibles.</p>
        <span class="lien-suite">Voir les pièces neuves</span>
      </a>
    </div>
  </div>
</section>

<section class="section container" aria-labelledby="comment-titre">
  <h2 id="comment-titre">Comment ça marche</h2>
  <ol class="etapes">
    <li>
      <h3>Vous envoyez votre demande</h3>
      <p>Par WhatsApp ou par téléphone : marque, modèle, année, motorisation et pièce recherchée. Une photo de la carte grise ou de la pièce aide beaucoup.</p>
    </li>
    <li>
      <h3>Nous vérifions le stock</h3>
      <p>Nous cherchons la référence exacte, en neuf ou en occasion, et vous indiquons le prix et la disponibilité.</p>
    </li>
    <li>
      <h3>Vous passez récupérer la pièce</h3>
      <p>Au magasin, ${esc(adresseLigne(c))}. Livraison : ${esc(c.livraison)}.</p>
    </li>
  </ol>
  ${boutonsCta(c)}
</section>

<section class="section section-alt" aria-labelledby="photos-titre">
  <div class="container">
    <h2 id="photos-titre">Le magasin en images</h2>
    <div class="grille-3">
      ${photo('comptoir', 'Le comptoir du magasin : alternateurs, feux et optiques en rayon')}
      ${photo('optique', 'Optiques et pièces de carrosserie, neuves ou d\'occasion')}
      ${photo('atelier', 'Nous vous conseillons sur la pièce à remplacer')}
    </div>
  </div>
</section>

<section class="section container" aria-labelledby="avis-titre">
  <h2 id="avis-titre">Avis clients</h2>
  <div class="avis-bloc">
    <p>Les avis de nos clients sont publiés sur notre fiche Google. Vous êtes déjà venu au magasin ? Votre avis aide les automobilistes du secteur à nous trouver.</p>
    <div class="cta-group">
      ${
        estConfirme(c.liens.ficheGoogle)
          ? `<a class="btn btn-secondaire" href="${esc(c.liens.ficheGoogle)}" target="_blank" rel="noopener">Voir les avis Google</a>`
          : `<span class="btn btn-secondaire btn-inactif" aria-disabled="true">Voir les avis Google (lien [À CONFIRMER])</span>`
      }
      ${
        estConfirme(c.liens.avisGoogle)
          ? `<a class="btn btn-secondaire" href="${esc(c.liens.avisGoogle)}" target="_blank" rel="noopener">Laisser un avis</a>`
          : `<span class="btn btn-secondaire btn-inactif" aria-disabled="true">Laisser un avis (lien [À CONFIRMER])</span>`
      }
    </div>
  </div>
</section>

<section class="section section-alt" aria-labelledby="acces-titre">
  <div class="container grille-2 grille-acces">
    <div>
      <h2 id="acces-titre">Adresse et horaires</h2>
      <address class="adresse-bloc">
        <strong>${esc(c.nom)}</strong><br>
        ${esc(c.adresse.rue)}<br>
        ${esc(c.adresse.codePostal)} ${esc(c.adresse.ville)}
      </address>
      <ul class="horaires">
        ${c.horaires.affichage.map((h) => `<li><span>${esc(h.jours)}</span> <span>${esc(h.heures)}</span></li>`).join('\n        ')}
      </ul>
      <p>Téléphone : <a href="${estConfirme(c.telephone.e164) ? 'tel:' + c.telephone.e164 : '/contact/'}">${esc(c.telephone.affichage)}</a><br>
      WhatsApp : <a href="${lienWhatsApp(c, messageDemande(c))}">${esc(c.whatsapp.affichage)}</a></p>
      <p><a class="btn btn-secondaire" href="${esc(c.liens.itineraireGoogleMaps)}" target="_blank" rel="noopener">Itinéraire sur Google Maps</a></p>
    </div>
    <a class="carte-plan" href="${esc(c.liens.itineraireGoogleMaps)}" target="_blank" rel="noopener">
      <img src="/images/plan.svg" width="800" height="500" alt="Plan d'accès au 61 rue Heurtault, Aubervilliers" loading="lazy" decoding="async">
      <span class="carte-plan-legende">Ouvrir dans Google Maps</span>
    </a>
  </div>
</section>
`;
  },
};
