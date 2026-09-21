/**
 * Page : /contact/
 */
import { esc, adresseLigne, estConfirme, lienTel, lienWhatsApp, messageDemande, boutonsCta, photo } from '../helpers.js';

export default {
  path: '/contact/',
  titreCourt: 'Contact',
  titre: 'Contact, adresse et horaires | ZM Pièces Auto, Aubervilliers',
  description:
    'ZM Pièces Auto, 61 rue Heurtault, 93300 Aubervilliers. Téléphone, WhatsApp, horaires d\'ouverture, accès en transports et itinéraire Google Maps du magasin de pièces auto.',
  priorite: '0.8',
  contenu: (c) => `
<section class="section container">
  <h1>Contact et accès au magasin</h1>
  <p class="chapo">${esc(c.nom)} est un magasin de pièces détachées automobiles neuves et d'occasion situé au ${esc(adresseLigne(c))}. Le plus simple pour une demande de pièce : WhatsApp. Pour une question rapide : le téléphone.</p>

  <div class="grille-2">
    <div class="carte contact-carte">
      <h2>Coordonnées</h2>
      <address class="adresse-bloc">
        <strong>${esc(c.nom)}</strong><br>
        ${esc(c.adresse.rue)}<br>
        ${esc(c.adresse.codePostal)} ${esc(c.adresse.ville)}
      </address>
      <dl class="coordonnees">
        <dt id="telephone">Téléphone</dt>
        <dd>${estConfirme(c.telephone.e164) ? `<a href="${lienTel(c)}">${esc(c.telephone.affichage)}</a>` : esc(c.telephone.affichage)}</dd>
        <dt id="whatsapp">WhatsApp</dt>
        <dd>${estConfirme(c.whatsapp.numero) ? `<a href="${lienWhatsApp(c, messageDemande(c))}" target="_blank" rel="noopener">${esc(c.whatsapp.affichage)}</a>` : esc(c.whatsapp.affichage)}</dd>
        <dt>Email</dt>
        <dd>${estConfirme(c.email) ? `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>` : esc(c.email)}</dd>
        <dt>Fiche Google</dt>
        <dd>${estConfirme(c.liens.ficheGoogle) ? `<a href="${esc(c.liens.ficheGoogle)}" target="_blank" rel="noopener">Voir la fiche Google</a>` : esc(c.liens.ficheGoogle)}</dd>
      </dl>
      ${boutonsCta(c)}
    </div>
    <div class="carte contact-carte">
      <h2>Horaires d'ouverture</h2>
      <ul class="horaires">
        ${c.horaires.affichage.map((h) => `<li><span>${esc(h.jours)}</span> <span>${esc(h.heures)}</span></li>`).join('\n        ')}
      </ul>
      <p class="note">Jours fériés et fermetures exceptionnelles : [À CONFIRMER]. En cas de doute, appelez avant de vous déplacer.</p>
    </div>
  </div>
</section>

<section class="section section-alt" aria-labelledby="venir-titre">
  <div class="container grille-2 grille-acces">
    <div>
      <h2 id="venir-titre">Comment venir</h2>
      <h3>En transports en commun</h3>
      <p>${esc(c.acces.transports)}</p>
      <h3>En voiture</h3>
      <p>Stationnement : ${esc(c.acces.stationnement)}</p>
      <p><a class="btn btn-secondaire" href="${esc(c.liens.itineraireGoogleMaps)}" target="_blank" rel="noopener">Itinéraire sur Google Maps</a></p>
    </div>
    <a class="carte-plan" href="${esc(c.liens.itineraireGoogleMaps)}" target="_blank" rel="noopener">
      <img src="/images/plan.svg" width="800" height="500" alt="Plan d'accès au 61 rue Heurtault, Aubervilliers" loading="lazy" decoding="async">
      <span class="carte-plan-legende">Ouvrir dans Google Maps</span>
    </a>
  </div>
</section>

<section class="section container">
  <div class="grille-2">
    ${photo('magasin', `L'intérieur du magasin, ${c.adresse.rue}`)}
    ${photo('comptoir', 'Le comptoir où nous vous accueillons')}
  </div>
</section>
`,
};
