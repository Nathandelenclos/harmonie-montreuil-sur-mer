# ADR-0001 — Back-office maison avec Supabase

**Statut :** accepté par Nathan le 13 octobre 2026.

Deux personnes de confiance doivent gérer les événements, les albums et la vidéothèque,
avec brouillon, aperçu et publication, sans toucher au code. Le site Next.js reste sur Vercel.
L’objectif est de commencer gratuitement, avec peu de maintenance d’infrastructure et la possibilité
d’administrer ensuite les textes, tarifs, équipes et coordonnées.

Nous développons `/admin` dans le projet existant. Supabase fournit Postgres, Auth et Storage.
Le métier reste indépendant de Supabase grâce à un port de persistance étroit.
Les documents éditoriaux structurés sont stockés en JSONB avec un type, un identifiant stable et
une version ; une table séparée contient uniquement les versions publiées. Les transitions
sont transactionnelles, et les RLS contrôlent les accès jusque dans le stockage des images.

Sanity aurait réduit le développement initial mais ne répond pas au choix exprimé d’un
back-office maison. Un serveur auto-hébergé aurait ajouté la maintenance que l’équipe souhaite éviter.
Un fournisseur d’images supplémentaire pourra être introduit si les quotas le justifient.

Les photos sont optimisées pour le web ; les originaux restent hors de l’application.
Les vidéos restent hébergées chez YouTube, Facebook et Google Drive.
Les futures rubriques auront des formulaires dédiés, en réutilisant les accès et la publication.

Conséquences : entretien du code applicatif, sauvegarde séparée des données et fichiers,
surveillance du quota gratuit et des mises en pause Supabase. Le tarif gratuit ne constitue pas
une garantie de disponibilité. Le mode historique reste le défaut jusqu’à l’import et la bascule
explicite de `CONTENT_SOURCE`.
