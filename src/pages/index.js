/**
 * Liste de toutes les pages du site, dans l'ordre du sitemap.
 * Pour ajouter une page : créer un fichier dans src/pages/ et l'ajouter ici.
 */
import accueil from './accueil.js';
import piecesOccasion from './pieces-occasion.js';
import piecesNeuves from './pieces-neuves.js';
import familles from './familles.js';
import demandeDePiece from './demande-de-piece.js';
import zoneDesservie from './zone-desservie.js';
import faq, { questionsFaq } from './faq.js';
import contact from './contact.js';
import mentionsLegales from './mentions-legales.js';

export const pages = [
  accueil,
  piecesOccasion,
  piecesNeuves,
  ...familles,
  demandeDePiece,
  zoneDesservie,
  faq,
  contact,
  mentionsLegales,
];


/* La FAQ dépend de la configuration : on la résout au moment du rendu */
export function resoudreFaq(page, config) {
  if (page.faqDynamique) page.faq = questionsFaq(config);
}
