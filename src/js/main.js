/*
 * main.js : le seul script du site (moins de 2 Ko).
 *  1. Ouvre et ferme le menu de navigation sur mobile.
 *  2. Sur la page Demande de pièce, construit le message WhatsApp à partir du formulaire.
 * Aucune donnée n'est envoyée à un serveur.
 */
(function () {
  'use strict';

  /* 1. Menu mobile */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav-principale');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var ouvert = nav.classList.toggle('ouvert');
      toggle.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
    });
  }

  /* 2. Formulaire de demande de pièce */
  var form = document.getElementById('formulaire-demande');
  if (!form) return;

  var apercu = document.getElementById('apercu-message');
  var erreur = document.getElementById('form-erreur');

  function valeur(nom) {
    var el = form.elements[nom];
    if (!el) return '';
    if (el.length && el[0] && el[0].type === 'radio') {
      for (var i = 0; i < el.length; i++) if (el[i].checked) return el[i].value;
      return '';
    }
    return (el.value || '').trim();
  }

  function message() {
    var lignes = [];
    lignes.push('Bonjour ' + form.dataset.nom + ', je cherche une pièce.');
    var vehicule = [valeur('marque'), valeur('modele'), valeur('annee'), valeur('motorisation')].filter(Boolean).join(' ');
    lignes.push('Véhicule : ' + (vehicule || '(marque, modèle, année, motorisation)'));
    if (valeur('immatriculation')) lignes.push('Immatriculation : ' + valeur('immatriculation'));
    lignes.push('Pièce : ' + (valeur('piece') || '(pièce recherchée)') + ', état : ' + (valeur('etat') || 'indifférent'));
    if (valeur('telephone')) lignes.push('Téléphone : ' + valeur('telephone'));
    return lignes.join('\n');
  }

  function rafraichirApercu() {
    if (apercu) apercu.textContent = message();
  }

  form.addEventListener('input', rafraichirApercu);
  form.addEventListener('change', rafraichirApercu);
  rafraichirApercu();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var obligatoires = ['marque', 'modele', 'piece'];
    var manquant = false;
    obligatoires.forEach(function (nom) {
      var el = form.elements[nom];
      var vide = !valeur(nom);
      el.setAttribute('aria-invalid', vide ? 'true' : 'false');
      if (vide && !manquant) {
        manquant = true;
        el.focus();
      }
    });
    if (manquant) {
      if (erreur) erreur.hidden = false;
      return;
    }
    if (erreur) erreur.hidden = true;

    var numero = form.dataset.whatsapp;
    var texte = encodeURIComponent(message());
    /* Sans numéro configuré, WhatsApp s'ouvre avec le message prêt à transférer. */
    var url = numero ? 'https://wa.me/' + numero + '?text=' + texte : 'https://wa.me/?text=' + texte;
    window.open(url, '_blank', 'noopener');
  });
})();
