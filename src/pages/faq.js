/**
 * Page : /faq/
 * Questions rédigées comme on les pose à un assistant, réponses courtes et factuelles.
 */
import { esc, adresseLigne, boutonsCta } from '../helpers.js';

export function questionsFaq(c) {
  const horaires = c.horaires.affichage.map((h) => `${h.jours} : ${h.heures}`).join('. ');
  return [
    {
      q: "Où trouver une pièce auto d'occasion à Aubervilliers ?",
      r: `<p>${esc(c.nom)} vend des pièces auto d'occasion au ${esc(adresseLigne(c))}. Pièces d'origine, toutes marques : alternateurs, démarreurs, amortisseurs, carrosserie et autres. Envoyez votre demande par WhatsApp ou par téléphone, nous vérifions le stock avant votre venue.</p>`,
    },
    {
      q: 'Avez-vous des pièces pour toutes les marques ?',
      r: `<p>Oui. ${esc(c.nom)} est un magasin multimarques : pièces neuves et d'occasion pour les véhicules français, allemands, japonais, coréens, italiens et autres. Marques les plus demandées : ${esc(c.marquesDemandees)}.</p>`,
    },
    {
      q: 'Comment savoir si vous avez ma pièce en stock ?',
      r: `<p>Envoyez par WhatsApp la marque, le modèle, l'année, la motorisation et le nom de la pièce, ou appelez le magasin. Nous vous répondons avec la disponibilité, le prix en neuf et en occasion quand les deux existent. Vous pouvez aussi utiliser <a href="/demande-de-piece/">le formulaire de demande</a>.</p>`,
    },
    {
      q: "Les pièces d'occasion sont-elles garanties ?",
      r: `<p>Garantie sur les pièces d'occasion : ${esc(c.garantieOccasion)}. Les conditions vous sont précisées au comptoir pour chaque pièce avant l'achat.</p>`,
    },
    {
      q: "Quels sont vos horaires d'ouverture ?",
      r: `<p>${esc(horaires)}. Adresse : ${esc(adresseLigne(c))}. Les horaires à jour sont aussi sur <a href="/contact/">la page contact</a> et sur notre fiche Google.</p>`,
    },
    {
      q: 'Peut-on réserver une pièce par WhatsApp ?',
      r: `<p>Oui. Après confirmation de la disponibilité et du prix par WhatsApp, nous mettons la pièce de côté le temps que vous passiez au magasin. Durée et conditions de réservation : [À CONFIRMER].</p>`,
    },
    {
      q: 'Quels moyens de paiement acceptez-vous ?',
      r: `<p>Moyens de paiement acceptés : ${esc(c.moyensPaiement)}. Le paiement se fait au magasin, au moment de récupérer la pièce.</p>`,
    },
    {
      q: 'Faites-vous le montage des pièces ?',
      r: `<p>Montage des pièces : ${esc(c.montage)}. Nous pouvons vous conseiller sur la difficulté du remplacement et sur ce qu'il faut prévoir.</p>`,
    },
    {
      q: 'Reprenez-vous les pièces usagées ?',
      r: `<p>Reprise des pièces usagées (ancien alternateur, démarreur, batterie) : ${esc(c.reprisePiecesUsagees)}. Demandez-nous au moment de l'achat.</p>`,
    },
    {
      q: 'Comment venir au magasin (transports, stationnement) ?',
      r: `<p>Le magasin est au ${esc(adresseLigne(c))}. Transports en commun : ${esc(c.acces.transports)}. Stationnement : ${esc(c.acces.stationnement)}. <a href="${esc(c.liens.itineraireGoogleMaps)}" target="_blank" rel="noopener">Itinéraire sur Google Maps</a>.</p>`,
    },
    {
      q: 'Vendez-vous des pièces neuves aussi ?',
      r: `<p>Oui. En plus de l'occasion, ${esc(c.nom)} vend des pièces neuves toutes marques : batteries, alternateurs, amortisseurs, démarreurs, filtres et pièces d'entretien courant. Voir <a href="/pieces-neuves/">la page pièces neuves</a>.</p>`,
    },
    {
      q: 'Livrez-vous ou expédiez-vous les pièces ?',
      r: `<p>Livraison et expédition : ${esc(c.livraison)}. Le mode habituel est le retrait au magasin, à Aubervilliers.</p>`,
    },
  ];
}

export default {
  path: '/faq/',
  titreCourt: 'FAQ',
  titre: 'Questions fréquentes sur les pièces auto à Aubervilliers | ZM Pièces Auto',
  description:
    'Où trouver une pièce d\'occasion à Aubervilliers, garantie, stock, réservation par WhatsApp, paiement, montage, horaires et accès : les réponses de ZM Pièces Auto.',
  priorite: '0.7',
  faqDynamique: true,
  contenu: (c) => `
<section class="section container">
  <h1>Questions fréquentes</h1>
  <p class="chapo">Les réponses courtes aux questions que l'on nous pose le plus souvent. Il vous manque une information ? Envoyez-nous un message WhatsApp, nous vous répondons pendant les horaires d'ouverture.</p>
  <section class="faq" aria-labelledby="faq-liste-titre">
    <h2 id="faq-liste-titre" class="visuellement-cache">Liste des questions</h2>
    ${questionsFaq(c)
      .map(
        (f) => `<details class="faq-item">
      <summary><h3>${esc(f.q)}</h3></summary>
      <div class="faq-reponse">${f.r}</div>
    </details>`
      )
      .join('\n    ')}
  </section>
  ${boutonsCta(c)}
</section>
`,
};
