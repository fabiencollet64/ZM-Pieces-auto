/**
 * Pages par famille de pièces : /alternateurs/, /batteries/, /amortisseurs/, /demarreurs/
 * Un seul gabarit, des données différentes par famille.
 */
import { esc, adresseLigne, boutonsCta, blocFaq, liensFamilles, photoPlaceholder } from '../helpers.js';

const familles = [
  {
    slug: 'alternateurs',
    singulier: 'Alternateur',
    pluriel: 'Alternateurs',
    genre: 'm',
    resume: "Neufs et d'occasion testés, toutes marques.",
    titre: "Alternateur neuf et d'occasion à Aubervilliers | ZM Pièces Auto",
    description:
      "Alternateur neuf ou d'occasion pour toutes marques à Aubervilliers (93). Symptômes d'alternateur HS, infos à fournir, demande sur WhatsApp. ZM Pièces Auto, 61 rue Heurtault.",
    role: "L'alternateur recharge la batterie et alimente le circuit électrique quand le moteur tourne. Quand il faiblit, la voiture finit par ne plus démarrer, même avec une batterie récente.",
    symptomes: [
      'Le voyant de batterie reste allumé sur le tableau de bord moteur tournant.',
      "Les phares faiblissent au ralenti et reprennent de l'intensité quand vous accélérez.",
      'La batterie se décharge à répétition alors qu\'elle a été remplacée.',
      'Un sifflement ou un grondement côté courroie, souvent lié au roulement de l\'alternateur.',
      'Une odeur de brûlé ou de caoutchouc chaud sous le capot.',
    ],
    offre: {
      neuf: "Alternateurs neufs pour toutes marques, avec ou sans échange de la vieille pièce [À CONFIRMER].",
      occasion: "Alternateurs d'occasion d'origine, testés avant la vente [À CONFIRMER], à prix réduit.",
    },
    infos: [
      'Marque, modèle, année et motorisation du véhicule (ou numéro d\'immatriculation).',
      "L'ampérage indiqué sur l'étiquette de l'alternateur (ex. 90 A, 120 A, 150 A).",
      'La référence gravée sur la pièce d\'origine et une photo du connecteur.',
      'Si le véhicule a la climatisation ou le stop and start, ce qui change souvent la référence.',
    ],
    faq: [
      {
        q: "Comment savoir si c'est l'alternateur ou la batterie qui est en cause ?",
        r: `<p>Si la voiture démarre avec des câbles puis cale ou se décharge à nouveau quelques kilomètres plus tard, l'alternateur est suspect. Si elle démarre et roule normalement après une recharge, c'est plutôt la batterie. Un test de tension moteur tournant (autour de 14 V attendus) permet de trancher.</p>`,
      },
      {
        q: "Un alternateur d'occasion est-il fiable ?",
        r: `<p>Un alternateur d'occasion d'origine, démonté sur un véhicule et testé, fonctionne comme le neuf pour un prix bien inférieur. Garantie et procédure de test : [À CONFIRMER].</p>`,
      },
      {
        q: 'Faut-il rapporter le vieil alternateur ?',
        r: `<p>Reprise de la pièce usagée : [À CONFIRMER]. Demandez-nous au moment de la commande.</p>`,
      },
    ],
  },
  {
    slug: 'batteries',
    singulier: 'Batterie',
    pluriel: 'Batteries',
    genre: 'f',
    resume: 'Batteries neuves toutes capacités, voitures et utilitaires.',
    titre: 'Batterie neuve et d\'occasion à Aubervilliers | ZM Pièces Auto',
    description:
      'Batterie auto neuve à Aubervilliers (93), toutes marques et capacités. Symptômes de batterie faible, comment choisir, demande sur WhatsApp. ZM Pièces Auto, 61 rue Heurtault.',
    role: "La batterie fournit l'énergie nécessaire au démarrage et alimente l'électronique moteur à l'arrêt. Sa durée de vie moyenne est de 4 à 6 ans, moins en cas de petits trajets répétés.",
    symptomes: [
      'Le démarrage est lent, le moteur peine à se lancer surtout le matin ou par temps froid.',
      'Les voyants et l\'éclairage faiblissent au moment de tourner la clé.',
      'Le véhicule ne démarre plus après quelques jours sans rouler.',
      'Le témoin de batterie s\'allume par intermittence.',
      'La batterie a plus de 5 ans ou présente des traces de corrosion sur les bornes.',
    ],
    offre: {
      neuf: 'Batteries neuves pour voitures, utilitaires et véhicules avec stop and start (AGM, EFB) [À CONFIRMER], toutes marques.',
      occasion: "Batteries d'occasion : [À CONFIRMER]. Pour cette pièce, le neuf est en général recommandé.",
    },
    infos: [
      'Marque, modèle, année et motorisation du véhicule.',
      "Les valeurs inscrites sur la batterie actuelle : tension (12 V), capacité (ex. 60 Ah) et puissance de démarrage (ex. 540 A).",
      'Les dimensions et la position des bornes (+ à droite ou à gauche).',
      'Si le véhicule a le stop and start, qui impose une batterie AGM ou EFB.',
    ],
    faq: [
      {
        q: 'Quelle batterie choisir pour ma voiture ?',
        r: `<p>Reprenez la capacité (Ah) et la puissance de démarrage (A) de la batterie d'origine, ou légèrement au dessus, avec les mêmes dimensions et la même position des bornes. Pour un véhicule stop and start, une batterie AGM ou EFB est obligatoire. Nous vérifions la compatibilité avec votre immatriculation.</p>`,
      },
      {
        q: 'Vendez-vous des batteries d\'occasion ?',
        r: `<p>[À CONFIRMER]. Une batterie perd de la capacité avec le temps, c'est pourquoi nous recommandons le neuf pour cette pièce, avec la garantie du fabricant [À CONFIRMER].</p>`,
      },
      {
        q: 'Reprenez-vous l\'ancienne batterie ?',
        r: `<p>Reprise de l'ancienne batterie pour recyclage : [À CONFIRMER]. Une batterie usagée ne doit jamais être jetée avec les ordures ménagères.</p>`,
      },
    ],
  },
  {
    slug: 'amortisseurs',
    singulier: 'Amortisseur',
    pluriel: 'Amortisseurs',
    genre: 'm',
    resume: 'Amortisseurs avant et arrière, neufs ou d\'occasion.',
    titre: "Amortisseur neuf et d'occasion à Aubervilliers | ZM Pièces Auto",
    description:
      "Amortisseurs neufs ou d'occasion toutes marques à Aubervilliers (93). Symptômes d'amortisseurs usés, infos à fournir, demande sur WhatsApp. ZM Pièces Auto, 61 rue Heurtault.",
    role: "Les amortisseurs maintiennent les roues au contact de la route. Usés, ils allongent les distances de freinage et usent les pneus plus vite. Ils se remplacent par paire, sur le même essieu.",
    symptomes: [
      'La voiture rebondit plusieurs fois après une bosse ou un dos d\'âne.',
      'Le nez plonge fortement au freinage ou l\'arrière s\'affaisse à l\'accélération.',
      'Des traces d\'huile sur le corps de l\'amortisseur.',
      'Une usure irrégulière des pneus, par vagues ou par plaques.',
      'Des claquements dans la suspension sur les pavés ou les nids de poule.',
    ],
    offre: {
      neuf: 'Amortisseurs neufs avant et arrière, toutes marques, vendus à l\'unité ou par paire, avec les coupelles et butées si besoin [À CONFIRMER].',
      occasion: "Amortisseurs d'occasion d'origine, contrôlés visuellement (absence de fuite, tige droite) [À CONFIRMER].",
    },
    infos: [
      'Marque, modèle, année et motorisation du véhicule (ou immatriculation).',
      'Avant ou arrière, et si possible côté gauche ou droit.',
      'Le type de suspension : standard, sport, châssis surbaissé ou rehaussé.',
      'Une photo de l\'amortisseur en place si vous avez un doute.',
    ],
    faq: [
      {
        q: 'Faut-il changer les amortisseurs par paire ?',
        r: `<p>Oui. Deux amortisseurs d'usure différente sur un même essieu déséquilibrent la tenue de route. On remplace toujours les deux avant ou les deux arrière en même temps.</p>`,
      },
      {
        q: 'À quelle fréquence changer les amortisseurs ?',
        r: `<p>En moyenne tous les 80 000 km, plus tôt en ville avec des routes dégradées. Un contrôle visuel à chaque révision permet de repérer une fuite avant que la tenue de route ne se dégrade.</p>`,
      },
      {
        q: 'Faites-vous le montage des amortisseurs ?',
        r: `<p>Montage : [À CONFIRMER]. Le remplacement d'un amortisseur demande un compresseur de ressort, c'est un travail de garage.</p>`,
      },
    ],
  },
  {
    slug: 'demarreurs',
    singulier: 'Démarreur',
    pluriel: 'Démarreurs',
    genre: 'm',
    resume: "Démarreurs neufs et d'occasion, toutes marques.",
    titre: "Démarreur neuf et d'occasion à Aubervilliers | ZM Pièces Auto",
    description:
      "Démarreur neuf ou d'occasion toutes marques à Aubervilliers (93). Symptômes de démarreur HS, infos à fournir, demande sur WhatsApp. ZM Pièces Auto, 61 rue Heurtault.",
    role: "Le démarreur est le petit moteur électrique qui lance le moteur thermique au moment de tourner la clé. Quand il lâche, la batterie peut être pleine et la voiture ne démarre quand même pas.",
    symptomes: [
      'Un clic sec au moment de tourner la clé, sans que le moteur se lance.',
      'Le démarreur tourne dans le vide avec un bruit de ventilateur, sans entraîner le moteur.',
      'Un grincement métallique au démarrage, signe de dents de pignon abîmées.',
      'Le démarrage fonctionne une fois sur deux, ou seulement après quelques tentatives.',
      'Une fumée ou une odeur de chaud sous le capot après plusieurs essais.',
    ],
    offre: {
      neuf: 'Démarreurs neufs pour toutes marques, avec ou sans consigne de l\'ancienne pièce [À CONFIRMER].',
      occasion: "Démarreurs d'occasion d'origine, testés avant la vente [À CONFIRMER], à prix réduit.",
    },
    infos: [
      'Marque, modèle, année et motorisation du véhicule (ou immatriculation).',
      'Boîte manuelle ou automatique, ce qui change souvent le démarreur.',
      'La référence gravée sur le démarreur d\'origine et le nombre de dents du pignon si vous l\'avez démonté.',
      'Une photo du démarreur et de son connecteur.',
    ],
    faq: [
      {
        q: 'Comment distinguer une panne de démarreur d\'une batterie vide ?',
        r: `<p>Si les phares et le tableau de bord s'allument normalement mais que vous entendez un simple clic, ou rien, le démarreur est probablement en cause. Si tout faiblit en tournant la clé, c'est la batterie. Un essai avec des câbles de démarrage permet de confirmer.</p>`,
      },
      {
        q: "Un démarreur d'occasion tient-il dans le temps ?",
        r: `<p>Un démarreur d'origine ne s'use que pendant quelques secondes à chaque démarrage. Une pièce d'occasion testée a donc encore une longue durée de vie devant elle. Garantie : [À CONFIRMER].</p>`,
      },
      {
        q: 'Peut-on réparer un démarreur plutôt que le remplacer ?',
        r: `<p>Parfois, en changeant les charbons ou le solénoïde. Mais le coût de la main d'œuvre dépasse souvent le prix d'un démarreur d'occasion. Nous vous conseillons selon votre cas.</p>`,
      },
    ],
  },
];

function pageFamille(f) {
  const article = f.genre === 'f' ? 'une' : 'un';
  const neufAdj = f.genre === 'f' ? 'neuve' : 'neuf';
  const defectueux = f.genre === 'f' ? 'défectueuse' : 'défectueux';
  return {
    path: `/${f.slug}/`,
    titreCourt: f.pluriel,
    titre: f.titre,
    description: f.description,
    priorite: '0.8',
    famille: f,
    faq: f.faq,
    contenu: (c, pages) => `
<section class="section container">
  <h1>${esc(f.singulier)} ${neufAdj} et d'occasion à Aubervilliers</h1>
  <p class="chapo">${esc(c.nom)}, ${esc(adresseLigne(c))}, vend des ${esc(f.pluriel.toLowerCase())} ${f.genre === 'f' ? 'neuves' : 'neufs'} et d'occasion pour toutes les marques de véhicules. ${esc(f.role)}</p>
  ${boutonsCta(c, { piece: f.singulier.toLowerCase(), libelleWhatsApp: `Demander ${article} ${f.singulier.toLowerCase()} sur WhatsApp` })}
</section>

<section class="section section-alt" aria-labelledby="symptomes-titre">
  <div class="container grille-2 grille-texte-photo">
    <div>
      <h2 id="symptomes-titre">Symptômes d'${f.genre === 'f' ? 'une' : 'un'} ${esc(f.singulier.toLowerCase())} ${defectueux}</h2>
      <ul class="liste-check">
        ${f.symptomes.map((s) => `<li>${esc(s)}</li>`).join('\n        ')}
      </ul>
      <p>Vous reconnaissez un de ces signes ? Faites vérifier la pièce avant qu'elle ne vous laisse en panne. Nous pouvons vous conseiller au comptoir.</p>
    </div>
    ${photoPlaceholder('pieces', `${f.pluriel} disponibles au magasin`)}
  </div>
</section>

<section class="section container" aria-labelledby="offre-titre">
  <h2 id="offre-titre">Ce que nous proposons</h2>
  <div class="grille-2">
    <article class="carte">
      <h3>${esc(f.singulier)} ${neufAdj}</h3>
      <p>${esc(f.offre.neuf)}</p>
      <p><a href="/pieces-neuves/">En savoir plus sur les pièces neuves</a></p>
    </article>
    <article class="carte">
      <h3>${esc(f.singulier)} d'occasion</h3>
      <p>${esc(f.offre.occasion)}</p>
      <p><a href="/pieces-occasion/">En savoir plus sur les pièces d'occasion</a></p>
    </article>
  </div>
</section>

<section class="section section-alt" aria-labelledby="infos-titre">
  <div class="container">
    <h2 id="infos-titre">Infos à nous fournir pour trouver la bonne référence</h2>
    <ol>
      ${f.infos.map((i) => `<li>${esc(i)}</li>`).join('\n      ')}
    </ol>
    <p>Avec ces éléments, nous trouvons la référence exacte et vous répondons vite.</p>
    ${boutonsCta(c, { piece: f.singulier.toLowerCase(), libelleWhatsApp: `Demander ${article} ${f.singulier.toLowerCase()} sur WhatsApp` })}
    <p>Ou <a href="/demande-de-piece/">remplissez le formulaire de demande</a>, il prépare le message WhatsApp avec vos informations.</p>
  </div>
</section>

<div class="container">
  ${blocFaq(f.faq, `Questions fréquentes sur les ${f.pluriel.toLowerCase()}`)}
  ${liensFamilles(pages, `/${f.slug}/`)}
</div>
`,
  };
}

export default familles.map(pageFamille);
