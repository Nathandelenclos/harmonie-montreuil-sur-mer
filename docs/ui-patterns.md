# Repères visuels

Les couleurs de marque restent les tokens `primary` (bleu) et `secondary` (jaune). Les grilles utilisent `--card-min-compact`, `--card-min-default` et `--card-min-wide` selon la largeur nécessaire au contenu. Les titres sont bornés par `--display-title-size` et `--section-title-size`.

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
