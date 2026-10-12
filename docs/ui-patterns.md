# Repères visuels

Les couleurs de marque restent les tokens `primary` (bleu) et `secondary` (jaune). Les grilles utilisent `--card-min-compact`, `--card-min-default` et `--card-min-wide` selon la largeur nécessaire au contenu. Les titres sont bornés par `--display-title-size` et `--section-title-size`.

## Mouvements

Le template Next.js renouvelle un fondu de 320 ms lors des changements de page ; la navigation et le pied de page restent stables. Les photos d’introduction entrent légèrement par le bas. Titres, albums, cours et aperçus apparaissent au défilement avec les animations CSS `view()`, uniquement si le navigateur les prend en charge. Le contenu reste visible sans ce support, sans JavaScript et pendant les effets. Le focus annule l’apparition d’un bloc interactif. Les survols sur les photos et boutons se limitent aux appareils avec survol. Aucun effet en boucle, aucune bibliothèque ajoutée ; `prefers-reduced-motion: reduce` supprime toutes les animations et transitions.

## Button — stable

Composant partagé : `components/ui/button.tsx`. Il reste un bouton natif ; `asChild` compose un lien pour une navigation. Aucun comportement d’envoi ou de routage n’est ajouté au composant.

| État | Rendu / comportement |
|---|---|
| Normal | Texte semi-gras, centré, retour à la ligne autorisé |
| Survol | Variante jaune : fond jaune opaque et texte souligné ; les autres variantes gardent leur contrat existant |
| Focus clavier | Anneau bleu avec espace entre le contrôle et l’anneau ; aucun retrait de focus sans remplacement |
| Désactivé | Sémantique native disabled, curseur interdit, contraste conservé |
| Envoi | Les formulaires affichent « Envoi en cours… » et désactivent le bouton ; leurs données sont conservées en cas d’échec |

Tailles : `default` et `lg` ont une hauteur minimale de 48 px ; `sm` et `icon`, 44 px. Le texte long peut agrandir les boutons de contenu. Une icône seule exige un nom accessible fourni par l’appelant.

Les formulaires de contact et d’adhésion illustrent les états d’envoi, succès et échec. Les tests `tests/forms.test.cjs` vérifient ces transitions, les erreurs associées aux champs et le focus du menu mobile. Le dépôt n’utilise pas Storybook ; ces repères documentent les composants sans ajouter de dépendance.

## PhotoGallery — stable

Une grille de boutons ouvre les photos dans un dialogue HTML natif. Les photos sont chargées progressivement et gardent leurs proportions. États : fermé, photo affichée, précédent/suivant (bouclage), fermeture. Tab reste dans le dialogue ; Échap et « Fermer » le referment et rendent le focus au bouton d’origine. Les flèches gauche/droite parcourent les photos ; les boutons offrent le même accès au tactile. Le défilement de la page est suspendu pendant l’affichage en grand. Les albums publiés sont non vides, validés par les tests du catalogue.
# YouTubeEmbed — stable

Molécule de lecture vidéo, utilisée dans les pages Concerts et Vidéos. État initial : vignette locale, bouton « Lire avec YouTube » et nom accessible comprenant le titre. Après activation : lecteur YouTube intégré, espace réservé conservé (16:9, hauteur minimale 208 px) et focus transféré au lecteur. Aucun lecteur ni appel à YouTube avant le clic. Le lecteur tiers gère chargement, pause et indisponibilité ; la page Vidéos propose aussi un lien direct de secours pour chaque captation. Le bouton identifie YouTube avant activation ; les explications sont regroupées dans la politique de confidentialité accessible depuis le pied de page, avec un rappel discret en bas de la page Vidéos. Les tests couvrent le passage au lecteur et le catalogue complet.

# VideoYearNavigation — stable

Navigation chronologique recevant une liste non vide d’années. L’année consultée au défilement est soulignée, marquée par un repère jaune bordé de bleu et annoncée par `aria-current="location"`. Les liens natifs ciblent les sections annuelles. La frise remplit son conteneur et défile horizontalement quand elle ne tient plus ; l’année active reste visible sans déplacer le focus. Les mises à jour sont regroupées par frame et les animations décoratives respectent la réduction des mouvements. Le test couvre le défilement dans les deux directions, la visibilité de l’année active et le nettoyage des événements.

## MediaFeature — stable

Organisme éditorial partagé par l’école, la présentation de l’harmonie et la page rejoindre.
Un titre de niveau 2 nomme la section ; les slots `media`, `actions` et `children` gardent
le contenu et les liens dans les pages. La composition passe de une à deux colonnes selon
la largeur du conteneur. Bleu/jaune et espacements utilisent les tokens du site.

Aucun état interne : `YouTubeEmbed` garde son aperçu local, puis son lecteur après activation ;
`Button` conserve ses états hover/focus. Les légendes datent les archives et attribuent les
captations. Les contenus et actions restent visibles sur petit écran. Pas d’état vide ou
chargement propre à cet organisme statique : ses slots sont fournis par les pages.

### PageHeader — introduction photographique

Statut stable. Les slots optionnels `media` et `actions` ajoutent une figure légendée et
les liens de la page, sans lier le composant au routeur. Le texte d’accroche `eyebrow`
reste secondaire. Sans média, le titre garde toute la largeur ; avec média, une container
query déploie deux colonnes. Une seule balise h1 et le fil d’Ariane restent présents dans
les deux états. Aucun chargement ni état interactif propre : les liens et Button fournis
gardent leur focus et leur cible tactile. Compositions réelles : école, harmonie,
concerts, contact, rejoindre, albums et vidéos ; le test vérifie les slots et la navigation.
