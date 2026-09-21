/**
 * helpers.js : petites fonctions partagées par toutes les pages.
 */

export const MARQUEUR = '[À CONFIRMER]';

/** Vrai si la valeur est renseignée (non vide et sans marqueur [À CONFIRMER]). */
export function estConfirme(valeur) {
  return typeof valeur === 'string' && valeur.trim() !== '' && !valeur.includes(MARQUEUR);
}

/** Échappe les caractères spéciaux HTML. */
export function esc(texte) {
  return String(texte)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/** Lien WhatsApp prérempli. Sans numéro confirmé, renvoie vers la page Contact. */
export function lienWhatsApp(config, message) {
  if (!estConfirme(config.whatsapp.numero)) return '/contact/#whatsapp';
  const numero = config.whatsapp.numero.replace(/\D/g, '');
  return `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
}

/** Lien d'appel. Sans numéro confirmé, renvoie vers la page Contact. */
export function lienTel(config) {
  if (!estConfirme(config.telephone.e164)) return '/contact/#telephone';
  return `tel:${config.telephone.e164.replace(/[^\d+]/g, '')}`;
}

/** Message WhatsApp par défaut pour une demande de pièce. */
export function messageDemande(config, piece) {
  const objet = piece ? `un(e) ${piece}` : 'une pièce';
  return `Bonjour ${config.nom}, je cherche ${objet} pour : marque, modèle, année, motorisation : ... (neuf ou occasion : ...)`;
}

/** Adresse sur une ligne. */
export function adresseLigne(config) {
  const a = config.adresse;
  return `${a.rue}, ${a.codePostal} ${a.ville}`;
}

/** Bloc de deux boutons d'action (WhatsApp + Appeler). */
export function boutonsCta(config, { piece = '', message = '', libelleWhatsApp = 'Demander sur WhatsApp', classe = '' } = {}) {
  const texte = message || messageDemande(config, piece);
  return `<div class="cta-group ${classe}">
  <a class="btn btn-whatsapp" href="${lienWhatsApp(config, texte)}" ${estConfirme(config.whatsapp.numero) ? 'target="_blank" rel="noopener"' : ''}>
    ${iconeWhatsApp()} ${esc(libelleWhatsApp)}
  </a>
  <a class="btn btn-call" href="${lienTel(config)}">${iconeTel()} Appeler le magasin</a>
</div>`;
}

export function iconeWhatsApp() {
  return `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 1.67c4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24c-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m-3.4 4.42c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.13.17 1.75 2.67 4.23 3.74 2.06.81 2.48.65 2.93.61.45-.04 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28-.25-.13-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.77.96-.14.17-.28.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.45"/></svg>`;
}

export function iconeTel() {
  return `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"/></svg>`;
}

/** Bloc FAQ (HTML) à partir d'une liste {q, r}. Le JSON-LD est ajouté par le layout. */
export function blocFaq(items, titre = 'Questions fréquentes') {
  return `<section class="faq" aria-labelledby="faq-titre">
  <h2 id="faq-titre">${esc(titre)}</h2>
  ${items
    .map(
      (f) => `<details class="faq-item">
    <summary><h3>${esc(f.q)}</h3></summary>
    <div class="faq-reponse">${f.r}</div>
  </details>`
    )
    .join('\n  ')}
</section>`;
}

/** Retire les balises HTML (pour le JSON-LD FAQ). */
export function texteBrut(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

/** Image placeholder neutre (à remplacer par une vraie photo WebP). */
export function photoPlaceholder(nom, legende, { largeur = 800, hauteur = 600, lazy = true } = {}) {
  return `<figure class="photo">
  <img src="/images/${nom}.svg" width="${largeur}" height="${hauteur}" alt="${esc(legende)}" ${lazy ? 'loading="lazy" decoding="async"' : 'fetchpriority="high"'}>
  <figcaption>${esc(legende)}</figcaption>
</figure>`;
}

/** Liste de liens vers les familles de pièces (maillage interne). */
export function liensFamilles(pages, cheminCourant) {
  const familles = pages.filter((p) => p.famille && p.path !== cheminCourant);
  return `<nav class="familles-liens" aria-label="Autres familles de pièces">
  <h2>Autres pièces disponibles</h2>
  <ul>
    ${familles.map((p) => `<li><a href="${p.path}">${esc(p.famille.pluriel)} neufs et d'occasion</a></li>`).join('\n    ')}
    <li><a href="/pieces-occasion/">Toutes les pièces d'occasion</a></li>
    <li><a href="/pieces-neuves/">Toutes les pièces neuves</a></li>
  </ul>
</nav>`;
}
