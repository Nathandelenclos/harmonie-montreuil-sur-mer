# Identité et images de partage

Le blason simplifié reprend le bleu et le jaune, les trois fleurs de lys, les deux bandes,
la couronne murale et les rubans musicaux du blason historique. Créé avec `image_gen`
le 13 octobre 2026, à partir de l’ancien `public/assets/logo.avif` (conservé dans
l’historique Git, commit `8fc2eee`). Le PNG transparent est la source de travail ; le WebP
de 256 px est utilisé par le site. Le nom reste du vrai texte lisible, séparé de l’image.

Les 24 cartes Open Graph / Twitter sont des PNG locaux de 1200 × 630 px, avec le blason
et une photo existante. Les affiches de concert restent entières. Les albums prennent leur
première photo ; les autres pages sont définies dans `data/social-images.json`.
Le générateur reprend les couleurs des tokens CSS. Ses dimensions et espacements en pixels
correspondent au canevas fixe d’export, avec la même échelle 12/16/24/48/96 que le site.

Après modification du blason, des couleurs, d’un concert, d’un album ou d’une carte :

```sh
node --experimental-strip-types scripts/generate-brand-assets.cjs
npm test
```

Node ≥ 22.12 et les dépendances existantes suffisent : React, `next/og` et Sharp livré par Next.
Le générateur produit aussi `app/favicon.ico` (16/32/48), `app/icon.png` (512) et
`app/apple-icon.png` (180, fond opaque). Next expose automatiquement leurs balises.
Les tests vérifient la couverture du sitemap, l’existence et les dimensions des images.
Vérifier visuellement les PNG avant de committer les sorties avec leurs sources.
Les réseaux sociaux peuvent conserver une ancienne image en cache après publication.

Les anciennes images d’instruments et les autres médias sans référence ont été retirés
du dossier public. Les illustrations studio, les photos d’archives et les 81 vignettes
vidéo chargées via le catalogue sont conservées.
