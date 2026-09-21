/**
 * layout.js : enveloppe commune à toutes les pages.
 *  - <head> : title, meta description, canonique, Open Graph, JSON-LD.
 *  - En-tête avec navigation, pied de page, barre d'action fixe sur mobile.
 *
 * Le balisage schema.org est construit à partir de site.config.json :
 *  - AutoPartsStore sur toutes les pages ;
 *  - BreadcrumbList sur les pages internes ;
 *  - FAQPage quand la page déclare une liste `faq`.
 */
import { esc, estConfirme, adresseLigne, lienTel, lienWhatsApp, messageDemande, iconeWhatsApp, iconeTel, texteBrut } from './helpers.js';

/* Navigation principale (ordre d'affichage) */
const navigation = [
  { path: '/pieces-occasion/', libelle: 'Occasion' },
  { path: '/pieces-neuves/', libelle: 'Neuf' },
  { path: '/alternateurs/', libelle: 'Alternateurs' },
  { path: '/batteries/', libelle: 'Batteries' },
  { path: '/amortisseurs/', libelle: 'Amortisseurs' },
  { path: '/demarreurs/', libelle: 'Démarreurs' },
  { path: '/zone-desservie/', libelle: 'Zone desservie' },
  { path: '/faq/', libelle: 'FAQ' },
  { path: '/contact/', libelle: 'Contact' },
];

/** Objet schema.org AutoPartsStore. Les champs non confirmés sont omis. */
export function schemaMagasin(config) {
  const c = config;
  const magasin = {
    '@type': 'AutoPartsStore',
    '@id': `${c.siteUrl}/#magasin`,
    name: c.nom,
    description: c.description,
    url: c.siteUrl + '/',
    image: `${c.siteUrl}/images/og-image.png`,
    priceRange: c.fourchettePrix,
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.adresse.rue,
      postalCode: c.adresse.codePostal,
      addressLocality: c.adresse.ville,
      addressRegion: c.adresse.departement,
      addressCountry: c.adresse.pays,
    },
    areaServed: c.zonesDesservies.map((z) => ({ '@type': 'City', name: z.nom })),
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: "Pièces auto d'occasion toutes marques" } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Pièces auto neuves toutes marques' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Alternateurs' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Batteries' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Amortisseurs' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Démarreurs' } },
    ],
  };
  if (estConfirme(c.telephone.e164)) magasin.telephone = c.telephone.e164;
  if (estConfirme(c.email)) magasin.email = c.email;
  if (c.geo && typeof c.geo.latitude === 'number' && typeof c.geo.longitude === 'number') {
    magasin.geo = { '@type': 'GeoCoordinates', latitude: c.geo.latitude, longitude: c.geo.longitude };
  }
  if (c.horaires.confirme) {
    magasin.openingHoursSpecification = c.horaires.schema.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.jours,
      opens: h.ouverture,
      closes: h.fermeture,
    }));
  }
  const sameAs = [c.liens.ficheGoogle, c.liens.facebook, c.liens.instagram].filter(estConfirme);
  if (sameAs.length) magasin.sameAs = sameAs;
  return magasin;
}

function schemaFilAriane(page, config) {
  const items = [{ nom: 'Accueil', path: '/' }, ...(page.parents || []), { nom: page.titreCourt, path: page.path }];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nom,
      item: `${config.siteUrl}${it.path}`,
    })),
  };
}

function schemaFaq(page, config) {
  return {
    '@type': 'FAQPage',
    '@id': `${config.siteUrl}${page.path}#faq`,
    mainEntity: page.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: texteBrut(f.r) },
    })),
  };
}

function filAriane(page) {
  if (page.path === '/') return '';
  const items = [{ nom: 'Accueil', path: '/' }, ...(page.parents || [])];
  return `<nav class="fil-ariane" aria-label="Fil d'Ariane">
  <ol>
    ${items.map((it) => `<li><a href="${it.path}">${esc(it.nom)}</a></li>`).join('\n    ')}
    <li aria-current="page">${esc(page.titreCourt)}</li>
  </ol>
</nav>`;
}

function enTete(page, config) {
  return `<header class="site-header">
  <div class="container header-inner">
    <a class="logo" href="/">
      <span class="logo-mark" aria-hidden="true">ZM</span>
      <span class="logo-text">${esc(config.nom)}<small>Aubervilliers</small></span>
    </a>
    <a class="header-cta" href="/demande-de-piece/">Demander une pièce</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-principale">
      <span class="nav-toggle-bar" aria-hidden="true"></span>
      <span class="nav-toggle-label">Menu</span>
    </button>
    <nav class="nav-principale" id="nav-principale" aria-label="Navigation principale">
      <ul>
        ${navigation
          .map(
            (n) =>
              `<li><a href="${n.path}"${page.path === n.path ? ' aria-current="page"' : ''}>${esc(n.libelle)}</a></li>`
          )
          .join('\n        ')}
        <li class="nav-cta"><a href="/demande-de-piece/"${page.path === '/demande-de-piece/' ? ' aria-current="page"' : ''}>Demander une pièce</a></li>
      </ul>
    </nav>
  </div>
</header>`;
}

function piedDePage(config, pages) {
  const c = config;
  const horaires = c.horaires.affichage.map((h) => `<li><span>${esc(h.jours)}</span> <span>${esc(h.heures)}</span></li>`).join('\n        ');
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <h2 class="footer-titre">${esc(c.nom)}</h2>
      <p>${esc(c.slogan)}.</p>
      <address>
        ${esc(c.adresse.rue)}<br>
        ${esc(c.adresse.codePostal)} ${esc(c.adresse.ville)}<br>
        Téléphone : <a href="${lienTel(c)}">${esc(c.telephone.affichage)}</a><br>
        WhatsApp : <a href="${lienWhatsApp(c, messageDemande(c))}">${esc(c.whatsapp.affichage)}</a>
      </address>
      <p><a href="${esc(c.liens.itineraireGoogleMaps)}" rel="noopener" target="_blank">Itinéraire Google Maps</a></p>
    </div>
    <div>
      <h2 class="footer-titre">Horaires</h2>
      <ul class="horaires">
        ${horaires}
      </ul>
    </div>
    <div>
      <h2 class="footer-titre">Pièces</h2>
      <ul class="footer-liens">
        ${pages
          .filter((p) => p.famille || p.path === '/pieces-occasion/' || p.path === '/pieces-neuves/')
          .map((p) => `<li><a href="${p.path}">${esc(p.titreCourt)}</a></li>`)
          .join('\n        ')}
      </ul>
    </div>
    <div>
      <h2 class="footer-titre">Le magasin</h2>
      <ul class="footer-liens">
        <li><a href="/demande-de-piece/">Demande de pièce</a></li>
        <li><a href="/zone-desservie/">Zone desservie</a></li>
        <li><a href="/faq/">Questions fréquentes</a></li>
        <li><a href="/contact/">Contact et accès</a></li>
        <li><a href="/mentions-legales/">Mentions légales</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bas">
    <p>© ${new Date().getFullYear()} ${esc(c.nom)}, ${esc(adresseLigne(c))}. Pièces auto neuves et d'occasion, toutes marques.</p>
  </div>
</footer>`;
}

function barreMobile(config) {
  return `<div class="barre-mobile" role="region" aria-label="Contacter le magasin">
  <a class="btn btn-whatsapp" href="${lienWhatsApp(config, messageDemande(config))}"${estConfirme(config.whatsapp.numero) ? ' target="_blank" rel="noopener"' : ''}>${iconeWhatsApp()} WhatsApp</a>
  <a class="btn btn-call" href="${lienTel(config)}">${iconeTel()} Appeler</a>
</div>`;
}

/** Rend une page complète. */
export function renderPage(page, config, pages) {
  const c = config;
  const url = `${c.siteUrl}${page.path}`;
  const graph = [schemaMagasin(c)];
  if (page.path !== '/') graph.push(schemaFilAriane(page, c));
  if (page.faq && page.faq.length) graph.push(schemaFaq(page, c));
  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('</', '<\\/');
  const contenu = page.contenu(c, pages);

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.titre)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${url}">
  ${page.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">'}
  <meta name="theme-color" content="#1f2428">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta property="og:type" content="${page.path === '/' ? 'website' : 'article'}">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="${esc(c.nom)}">
  <meta property="og:title" content="${esc(page.titre)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${c.siteUrl}/images/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(c.nom)}, ${esc(adresseLigne(c))}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="/css/style.css">
  <script type="application/ld+json">${jsonLd}</script>
</head>
<body class="${page.path === '/' ? 'page-accueil' : 'page-interne'}">
  <a class="skip-link" href="#contenu">Aller au contenu</a>
  ${enTete(page, c)}
  <main id="contenu">
    ${filAriane(page)}
    ${contenu}
  </main>
  ${piedDePage(c, pages)}
  ${barreMobile(c)}
  <script src="/js/main.js" defer></script>
</body>
</html>
`;
}

/** Page 404. */
export function renderNotFound(config, pages) {
  const page = {
    path: '/404.html',
    titre: `Page introuvable | ${config.nom}`,
    titreCourt: 'Page introuvable',
    description: 'Cette page n\'existe pas ou plus.',
    noindex: true,
    contenu: () => `<section class="section container">
  <h1>Page introuvable</h1>
  <p>La page demandée n'existe pas ou a été déplacée. Vous cherchez une pièce auto à Aubervilliers ? Ces pages devraient vous aider.</p>
  <ul>
    <li><a href="/">Accueil</a></li>
    <li><a href="/pieces-occasion/">Pièces auto d'occasion</a></li>
    <li><a href="/pieces-neuves/">Pièces auto neuves</a></li>
    <li><a href="/demande-de-piece/">Faire une demande de pièce</a></li>
    <li><a href="/contact/">Contact et accès</a></li>
  </ul>
</section>`,
  };
  return renderPage(page, config, pages);
}
