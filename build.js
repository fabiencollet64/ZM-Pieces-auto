/**
 * build.js : générateur du site ZM Pièces Auto.
 *
 * Aucune dépendance externe : Node.js (18+) suffit.
 *
 *   node build.js          génère le site dans dist/
 *   node build.js --check  génère puis liste tous les [À CONFIRMER] restants
 *
 * Fonctionnement :
 *   1. lit site.config.json (toutes les informations du magasin) ;
 *   2. charge chaque page de src/pages/ ;
 *   3. enveloppe son contenu dans src/layout.js (en-tête, pied de page, balisage schema.org) ;
 *   4. écrit dist/<chemin>/index.html, copie src/css, src/js et src/static ;
 *   5. génère sitemap.xml, robots.txt, llms.txt et 404.html.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage, renderNotFound } from './src/layout.js';
import { pages, resoudreFaq } from './src/pages/index.js';
import { renderLlmsTxt } from './src/llms.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const checkOnly = process.argv.includes('--check');

const config = JSON.parse(fs.readFileSync(path.join(root, 'site.config.json'), 'utf8'));
config.dateBuild = new Date().toISOString().slice(0, 10);

/*
 * Chemin de base : vide pour un site à la racine (https://example.fr),
 * "/ZM-Pieces-auto" pour un site GitHub Pages sans nom de domaine.
 * Tous les liens internes écrits "/..." dans les pages reçoivent ce préfixe.
 */
config.siteUrl = config.siteUrl.replace(/\/+$/, '');
const basePath = new URL(config.siteUrl).pathname.replace(/\/+$/, '');

function prefixerLiens(html) {
  if (!basePath) return html;
  return html.replace(/(href|src|content)="\/(?!\/)/g, `$1="${basePath}/`);
}

/* Nettoyage puis recréation de dist/ */
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

/* Copie récursive d'un dossier */
function copyDir(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dst);
    else fs.copyFileSync(src, dst);
  }
}

copyDir(path.join(root, 'src/static'), dist);
copyDir(path.join(root, 'src/js'), path.join(dist, 'js'));

/* Le manifeste contient aussi des chemins absolus */
const manifeste = path.join(dist, 'site.webmanifest');
if (basePath && fs.existsSync(manifeste)) {
  fs.writeFileSync(manifeste, fs.readFileSync(manifeste, 'utf8').replace(/"\/(?!\/)/g, `"${basePath}/`));
}

/* GitHub Pages : empêche Jekyll de traiter le dossier */
fs.writeFileSync(path.join(dist, '.nojekyll'), '');

/* CSS : copie minifiée (commentaires et espaces superflus retirés) */
fs.mkdirSync(path.join(dist, 'css'), { recursive: true });
for (const nom of fs.readdirSync(path.join(root, 'src/css'))) {
  const css = fs.readFileSync(path.join(root, 'src/css', nom), 'utf8');
  fs.writeFileSync(path.join(dist, 'css', nom), minifierCss(css));
}

function minifierCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};:,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

/* Génération des pages */
const generated = [];
for (const page of pages) {
  resoudreFaq(page, config);
  const html = prefixerLiens(renderPage(page, config, pages));
  const dir = path.join(dist, page.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  generated.push({ path: page.path, html });
}

/* Page 404 */
fs.writeFileSync(path.join(dist, '404.html'), prefixerLiens(renderNotFound(config, pages)));

/* sitemap.xml */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => !p.noindex)
  .map(
    (p) => `  <url>
    <loc>${config.siteUrl}${p.path}</loc>
    <lastmod>${config.dateBuild}</lastmod>
    <changefreq>${p.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${p.priorite ?? (p.path === '/' ? '1.0' : '0.7')}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

/* robots.txt : autorise explicitement les robots des moteurs et des IA */
const robots = `# ZM Pièces Auto : tous les robots de recherche et d'IA sont les bienvenus.
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Applebot
Allow: /

Sitemap: ${config.siteUrl}/sitemap.xml
`;
fs.writeFileSync(path.join(dist, 'robots.txt'), robots);

/* llms.txt : résumé factuel pour les assistants IA */
fs.writeFileSync(path.join(dist, 'llms.txt'), renderLlmsTxt(config, pages));

/* Vérifications */
const marker = '[À CONFIRMER]';
const emDash = '—';
let totalMarkers = 0;
const report = [];
for (const { path: p, html } of generated) {
  const text = html.replace(/<script[\s\S]*?<\/script>/g, '');
  const count = text.split(marker).length - 1;
  totalMarkers += count;
  if (count) report.push(`  ${p.padEnd(22)} ${count} occurrence(s)`);
  if (html.includes(emDash)) {
    console.error(`ERREUR : tiret cadratin (—) trouvé dans ${p}. Le brief l'interdit.`);
    process.exitCode = 1;
  }
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) {
    console.error(`ERREUR : ${p} contient ${h1} balise(s) H1 (il en faut exactement une).`);
    process.exitCode = 1;
  }
}

console.log(`Site généré dans dist/ : ${generated.length} pages + 404, sitemap.xml, robots.txt, llms.txt.`);
if (basePath) console.log(`Liens internes préfixés par ${basePath}/ (déduit de siteUrl).`);
if (!config.siteUrlConfirme) {
  console.log(`Attention : siteUrl (${config.siteUrl}) n'est pas confirmé. Mettez la vraie adresse du site dans site.config.json.`);
}
if (checkOnly || totalMarkers) {
  console.log(`\n${marker} restants dans les pages : ${totalMarkers}`);
  if (checkOnly) console.log(report.join('\n'));
}
