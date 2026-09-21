/**
 * Page : /mentions-legales/
 */
import { esc, adresseLigne } from '../helpers.js';

export default {
  path: '/mentions-legales/',
  titreCourt: 'Mentions légales',
  titre: 'Mentions légales | ZM Pièces Auto',
  description: 'Mentions légales du site de ZM Pièces Auto, magasin de pièces auto à Aubervilliers : éditeur, hébergeur, données personnelles.',
  priorite: '0.2',
  contenu: (c) => `
<section class="section container contenu-texte">
  <h1>Mentions légales</h1>

  <h2>Éditeur du site</h2>
  <p>${esc(c.nom)}<br>
  Raison sociale : ${esc(c.mentionsLegales.raisonSociale)}<br>
  Forme juridique : ${esc(c.mentionsLegales.formeJuridique)}<br>
  SIRET : ${esc(c.mentionsLegales.siret)}<br>
  Adresse : ${esc(adresseLigne(c))}<br>
  Téléphone : ${esc(c.telephone.affichage)}<br>
  Email : ${esc(c.email)}</p>
  <p>Responsable de la publication : ${esc(c.mentionsLegales.responsablePublication)}</p>

  <h2>Hébergement</h2>
  <p>${esc(c.mentionsLegales.hebergeur)}</p>

  <h2>Données personnelles</h2>
  <p>Ce site ne collecte aucune donnée personnelle et n'utilise aucun cookie ni outil de mesure d'audience. Le formulaire de demande de pièce ne transmet rien à ce site : il prépare un message que vous envoyez vous-même via WhatsApp. Les échanges par WhatsApp et par téléphone sont soumis aux conditions de ces services et servent uniquement à traiter votre demande.</p>
  <p>Pour toute question relative à vos données, contactez le magasin aux coordonnées ci-dessus.</p>

  <h2>Propriété intellectuelle</h2>
  <p>Les textes et les images de ce site sont la propriété de ${esc(c.nom)}, sauf mention contraire. Les marques de véhicules et d'équipementiers citées appartiennent à leurs propriétaires respectifs et sont mentionnées uniquement pour identifier la compatibilité des pièces.</p>

  <h2>Responsabilité</h2>
  <p>Les informations sur les symptômes de pannes et les conseils de choix de pièces sont donnés à titre indicatif. Le diagnostic d'un véhicule relève d'un professionnel de la réparation. Les disponibilités et les prix sont confirmés au moment de la demande.</p>
</section>
`,
};
