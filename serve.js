/**
 * serve.js : petit serveur local pour tester dist/ (http://localhost:8080).
 * Aucune dépendance. Ne pas utiliser en production : l'hébergeur s'en charge.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

const port = Number(process.env.PORT) || 8080;
http
  .createServer((req, res) => {
    let url = decodeURIComponent(req.url.split('?')[0]);
    let file = path.join(dist, url);
    if (url.endsWith('/')) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) && fs.existsSync(file + '/index.html')) {
      res.writeHead(301, { Location: url + '/' });
      return res.end();
    }
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404, { 'Content-Type': types['.html'] });
      return res.end(fs.readFileSync(path.join(dist, '404.html')));
    }
    const ext = path.extname(file);
    res.writeHead(200, {
      'Content-Type': types[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    });
    res.end(fs.readFileSync(file));
  })
  .listen(port, () => console.log(`Site de test : http://localhost:${port}/`));
