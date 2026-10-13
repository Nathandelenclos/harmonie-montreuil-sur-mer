# Captations de Montreuil

Inventaire ponctuel du 12 octobre 2026 de la chaîne publique https://www.youtube.com/@MARLENE47100 : 231 vidéos accessibles dans son onglet Vidéos, dont 81 identifiées comme liées à Montreuil dans leur titre ou leur description.

Les 81 titres et descriptions ont été relus. Cela inclut l’harmonie, la classe d’orchestre, les concerts partagés et les invités : notamment l’Union musicale de Campagne-lès-Hesdin / Beaurainville au concert d’automne 2017. Le titre d’origine permet de distinguer cet invité de l’harmonie de Montreuil. Les autres vidéos de la chaîne ne sont pas intégrées.

`data/videos.json` conserve les titres, descriptions et dates de publication de YouTube comme trace de sélection. Les vidéos YouTube restent classées par année de publication. Les collections importées rejoignent la même frise, selon l’année explicitement documentée du concert. Les informations anciennes sur des personnes ne sont pas reprises comme informations actuelles du site.

Les vignettes sont locales. Les lecteurs du domaine youtube-nocookie.com se chargent seulement à l’activation. Le catalogue est statique : un nouvel import sera nécessaire pour ajouter les futures vidéos ou retirer celles devenues indisponibles.

Les six captations mises en avant (`0DapvwTHhz4`, `j591F-YCkBs`, `KGIi6CUYmLw`,
`tBcUdDxvP0k`, `8SaXsLgCffM`, `XQZA28P2dxY`) utilisent les vignettes YouTube
`https://i.ytimg.com/vi/{id}/maxresdefault.jpg` récupérées le 12 octobre 2026,
conservées localement en 1280 × 720 et optimisées en JPEG qualité 85.

## Import des rediffusions du 13 octobre 2026

`data/recordings.json` complète les 81 vidéos YouTube avec des collections liées aux albums locaux :

- Dordogne 2026 : deux lecteurs Google Drive, concerts du cloître de Cadouin le 15 mai et du château de Biron le 16 mai (dates affichées sur la page source).
- Sacrée Fiesta 2025 : les 21 captations répertoriées sont conservées dans leur ordre, réparties entre harmonie (12), chorale (4) et classe orchestre (5). Les 20 lecteurs Facebook publics ont été vérifiés individuellement. La publication Facebook « O’Connell’s » étant indisponible, le lecteur YouTube déjà présent (`0DapvwTHhz4`) rejoint directement cette collection, sans doublon.
- Vie de l’harmonie : le reel public de répétition « La Belle et la Bête » de la page officielle est ajouté. L’année 2026 est établie par la publication affichée « 5 days ago » lors du relevé du 13 octobre 2026 ; aucun jour précis n’est ajouté.

Les 21 nouvelles vignettes Facebook sont téléchargées et optimisées localement en JPEG, largeur maximale 800 px. Les aperçus des concerts en Dordogne utilisent des photos locales de ce séjour. Les lecteurs Facebook et Drive sont chargés uniquement après activation, avec focus sur l’iframe et lien alternatif permanent. Les titres et descriptions restent du texte React ; aucun HTML distant ou SDK Facebook n’est incorporé.

Les trois pages publiques du Google Site (accueil, Dordogne et Sacrée Fiesta) ont été inventoriées. Les photos, légendes, classement et références aux lecteurs sont maintenant locaux : supprimer le Google Site ne les affecte pas. Les vidéos restent hébergées sur YouTube, Facebook ou Drive ; leur suppression ou un changement de partage chez ces hébergeurs peut empêcher la lecture. Les MP4 ne sont pas copiés dans Git.

Les miniatures mises en cache par Google Sites pour Facebook répondaient 404. Elles ont été récupérées depuis les lecteurs Facebook publics, pas depuis ces URL périmées. L’historique et les albums Facebook complets de l’Harmonie et de Marlène nécessitent une connexion ; l’import est limité aux publications publiques identifiées.

Sources de maintenance :
- https://sites.google.com/view/redifconcertsharmoniemontreuil/dordogne-2026
- https://sites.google.com/view/redifconcertsharmoniemontreuil/sacr%C3%A9e-fiesta
- https://www.facebook.com/people/Harmonie-Montreuil-sur-Mer/100062936003912/
- https://www.facebook.com/marlene.moreau.39

Les URL directes des captations se trouvent dans le catalogue. Ces anciennes pages Google Sites ne sont pas référencées dans l’interface publique.
