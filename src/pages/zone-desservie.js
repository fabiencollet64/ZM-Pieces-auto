/**
 * Page : /zone-desservie/
 * Une seule page, un paragraphe réellement différent par ville (pas de pages locales dupliquées).
 */
import { esc, adresseLigne, boutonsCta } from '../helpers.js';

/* Texte propre à chaque zone. Le temps de trajet vient de site.config.json. */
const textes = {
  Aubervilliers: (c) =>
    `Le magasin est situé au ${esc(adresseLigne(c))}. Si vous habitez Aubervilliers, vous êtes à quelques minutes du comptoir, à pied, en bus ou en voiture. Vous pouvez passer vérifier une pièce en main propre avant de l'acheter, ce qui évite les erreurs de référence.`,
  'Saint-Denis': (c) =>
    `Saint-Denis est la commune voisine directe d'Aubervilliers. Pour les automobilistes du centre de Saint-Denis, de la Plaine ou de Pleyel, ${esc(c.nom)} est une alternative de proximité aux grandes enseignes : vous appelez ou envoyez un message WhatsApp, et vous ne vous déplacez que si la pièce est disponible.`,
  'La Courneuve': (c) =>
    `Depuis La Courneuve, le magasin se rejoint facilement par les axes qui traversent Aubervilliers. Beaucoup de véhicules qui roulent à La Courneuve ont plusieurs années : les pièces d'occasion d'origine (alternateur, démarreur, carrosserie) sont souvent la solution la plus économique pour les maintenir en état.`,
  Pantin: (c) =>
    `Pantin est limitrophe d'Aubervilliers au sud. Pour une batterie ou des amortisseurs, plutôt que de commander en ligne et d'attendre la livraison, vous pouvez obtenir la pièce le jour même après avoir vérifié le stock par WhatsApp. Temps de trajet indicatif : ${esc(c.zonesDesservies.find((z) => z.nom === 'Pantin').trajet)}.`,
  Bobigny: (c) =>
    `Bobigny, préfecture de la Seine-Saint-Denis, est à quelques kilomètres à l'est. Les automobilistes de Bobigny et des communes voisines trouvent chez ${esc(c.nom)} des pièces multimarques, neuves ou d'occasion, avec un conseil au comptoir pour choisir la bonne référence.`,
  'Paris 18e': (c) =>
    `Le 18e arrondissement de Paris (Porte de la Chapelle, Porte d'Aubervilliers, Marx Dormoy) touche directement Aubervilliers. Pour les Parisiens du nord, le magasin est souvent plus proche qu'un centre auto en périphérie, et les tarifs des pièces d'occasion sont difficiles à égaler dans Paris.`,
  'Paris 19e': (c) =>
    `Le 19e arrondissement (Porte de la Villette, Porte de Pantin, Rosa Parks) est à quelques minutes d'Aubervilliers par le boulevard périphérique ou les avenues. Envoyez votre demande avant de vous déplacer : nous confirmons la disponibilité et le prix, vous passez récupérer la pièce.`,
};

export default {
  path: '/zone-desservie/',
  titreCourt: 'Zone desservie',
  titre: 'Pièces auto à Aubervilliers, Saint-Denis, Pantin, Paris nord | ZM Pièces Auto',
  description:
    "Pièces auto neuves et d'occasion pour Aubervilliers, Saint-Denis, La Courneuve, Pantin, Bobigny, Paris 18e et 19e. ZM Pièces Auto, 61 rue Heurtault, Aubervilliers.",
  priorite: '0.7',
  contenu: (c) => `
<section class="section container">
  <h1>Pièces auto près de chez vous : Aubervilliers et alentours</h1>
  <p class="chapo">${esc(c.nom)} est situé au ${esc(adresseLigne(c))}, au nord de Paris, en Seine-Saint-Denis. Le magasin sert les automobilistes d'Aubervilliers et des communes voisines qui cherchent une pièce neuve ou d'occasion, toutes marques, sans attendre une livraison.</p>
  ${boutonsCta(c)}
</section>

<section class="section section-alt" aria-labelledby="zones-titre">
  <div class="container">
    <h2 id="zones-titre">Villes desservies</h2>
    <p>Temps de trajet indicatifs jusqu'au magasin, en voiture et hors embouteillages.</p>
    ${c.zonesDesservies
      .map(
        (z) => `<article class="zone">
      <h3>Pièces auto à ${esc(z.nom)}</h3>
      <p class="zone-trajet">Trajet approximatif : ${esc(z.trajet)}</p>
      <p>${textes[z.nom] ? textes[z.nom](c) : ''}</p>
    </article>`
      )
      .join('\n    ')}
  </div>
</section>

<section class="section container" aria-labelledby="ailleurs-titre">
  <h2 id="ailleurs-titre">Vous êtes plus loin ?</h2>
  <p>Nous répondons aussi aux demandes venant du reste de la Seine-Saint-Denis et de l'Île-de-France. Livraison ou expédition : ${esc(c.livraison)}. Dans tous les cas, commencez par une demande WhatsApp, cela ne vous engage à rien.</p>
  <p><a href="/contact/">Adresse, horaires et accès au magasin</a></p>
</section>
`,
};
