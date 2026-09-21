/**
 * Page : /demande-de-piece/
 * Formulaire sans backend : le bouton d'envoi construit un lien wa.me avec le message prérempli.
 */
import { esc, estConfirme, lienTel, iconeTel, iconeWhatsApp } from '../helpers.js';

export default {
  path: '/demande-de-piece/',
  titreCourt: 'Demande de pièce',
  titre: 'Demander une pièce auto par WhatsApp à Aubervilliers | ZM Pièces Auto',
  description:
    'Décrivez votre véhicule et la pièce recherchée, neuve ou occasion : le formulaire prépare votre message WhatsApp pour ZM Pièces Auto, Aubervilliers.',
  priorite: '0.8',
  contenu: (c) => `
<section class="section container">
  <h1>Demander une pièce auto</h1>
  <p class="chapo">Remplissez ce court formulaire. Le bouton ouvre WhatsApp avec un message déjà rédigé, que vous pouvez modifier avant de l'envoyer. Aucune donnée n'est enregistrée sur ce site.</p>

  <form class="formulaire" id="formulaire-demande" data-whatsapp="${estConfirme(c.whatsapp.numero) ? esc(c.whatsapp.numero.replace(/\D/g, '')) : ''}" data-nom="${esc(c.nom)}" novalidate>
    <div class="grille-form">
      <div class="champ">
        <label for="marque">Marque du véhicule <span class="obligatoire" aria-hidden="true">*</span></label>
        <input id="marque" name="marque" type="text" autocomplete="off" required placeholder="Ex. Peugeot">
      </div>
      <div class="champ">
        <label for="modele">Modèle <span class="obligatoire" aria-hidden="true">*</span></label>
        <input id="modele" name="modele" type="text" autocomplete="off" required placeholder="Ex. 308">
      </div>
      <div class="champ">
        <label for="annee">Année</label>
        <input id="annee" name="annee" type="number" inputmode="numeric" min="1980" max="2030" placeholder="Ex. 2016">
      </div>
      <div class="champ">
        <label for="motorisation">Motorisation</label>
        <input id="motorisation" name="motorisation" type="text" autocomplete="off" placeholder="Ex. 1.6 HDi 92 ch">
      </div>
      <div class="champ champ-large">
        <label for="piece">Pièce recherchée <span class="obligatoire" aria-hidden="true">*</span></label>
        <input id="piece" name="piece" type="text" autocomplete="off" required placeholder="Ex. alternateur, batterie, amortisseur avant gauche">
      </div>
      <fieldset class="champ champ-large">
        <legend>Neuf ou occasion</legend>
        <div class="choix">
          <label><input type="radio" name="etat" value="indifférent" checked> Indifférent, au meilleur prix</label>
          <label><input type="radio" name="etat" value="neuf"> Neuf</label>
          <label><input type="radio" name="etat" value="occasion"> Occasion</label>
        </div>
      </fieldset>
      <div class="champ">
        <label for="telephone">Votre téléphone</label>
        <input id="telephone" name="telephone" type="tel" autocomplete="tel" placeholder="Pour vous rappeler si besoin">
      </div>
      <div class="champ">
        <label for="immatriculation">Immatriculation (facultatif)</label>
        <input id="immatriculation" name="immatriculation" type="text" autocomplete="off" placeholder="Ex. AB-123-CD">
      </div>
    </div>
    <p class="form-erreur" id="form-erreur" role="alert" hidden>Merci d'indiquer au moins la marque, le modèle et la pièce recherchée.</p>
    <div class="cta-group">
      <button class="btn btn-whatsapp" type="submit">${iconeWhatsApp()} Envoyer sur WhatsApp</button>
      <a class="btn btn-call" href="${lienTel(c)}">${iconeTel()} Appeler le magasin</a>
    </div>
    ${
      estConfirme(c.whatsapp.numero)
        ? ''
        : `<p class="note">Numéro WhatsApp du magasin : [À CONFIRMER]. En attendant, le bouton ouvre WhatsApp avec votre message prêt à copier.</p>`
    }
  </form>

  <details class="apercu">
    <summary>Aperçu du message qui sera envoyé</summary>
    <pre id="apercu-message">Bonjour ${esc(c.nom)}, je cherche une pièce.
Véhicule : (marque) (modèle) (année) (motorisation)
Pièce : (pièce recherchée), état : indifférent
Téléphone : (votre numéro)</pre>
  </details>
</section>

<section class="section section-alt" aria-labelledby="conseils-titre">
  <div class="container">
    <h2 id="conseils-titre">Pour une réponse rapide</h2>
    <ul class="liste-check">
      <li>Ajoutez une photo de la pièce d'origine ou de sa référence, directement dans WhatsApp.</li>
      <li>Une photo de la carte grise (rubriques D.1, D.2, E) nous permet d'identifier le véhicule sans erreur.</li>
      <li>Précisez le côté (gauche ou droit) et la position (avant ou arrière) pour les pièces symétriques.</li>
    </ul>
    <p>Nous répondons aux demandes pendant les horaires d'ouverture du magasin : voir <a href="/contact/">la page contact</a>.</p>
  </div>
</section>
`,
};
