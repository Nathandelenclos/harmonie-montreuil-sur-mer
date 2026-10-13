# Back-office de l’Harmonie

La V1 permet à deux personnes autorisées de gérer événements, albums et vidéos à `/admin`.
Les comptes utilisent une adresse e-mail et un mot de passe. Il n’existe pas d’inscription publique.

## Utilisation

1. Choisir une rubrique, puis créer ou ouvrir un contenu.
2. Modifier les champs et enregistrer le brouillon. L’ancienne version publique reste inchangée.
3. Ouvrir **Prévisualiser** : l’aperçu enregistré est privé et exige un compte autorisé.
4. **Publier** rend cette version visible ; **Retirer du site** la masque en conservant le brouillon.
5. Un contenu doit être retiré avant suppression. Son identifiant ne change plus après sa première publication pour préserver son adresse.

Les albums acceptent plusieurs images JPEG, PNG, WebP ou AVIF. Elles sont redimensionnées
à 2 400 pixels maximum dans le navigateur, puis vérifiées et réencodées en WebP par le serveur.
Les originaux restent à conserver séparément. Les boutons Monter/Descendre fonctionnent au clavier.
La suppression d’une photo du brouillon ne touche pas la version publiée.

Les vidéos sont des liens vers YouTube, Facebook ou Google Drive ; aucun fichier vidéo n’est hébergé.
Les lecteurs tiers ne se chargent qu’après activation par le visiteur.
Le groupe facultatif permet de conserver les collections existantes dans la vidéothèque.

## Architecture et droits

- `src/editorial/domain` : contenus et validation sans dépendance technique.
- `src/editorial/application` : enregistrement et publication via un port de persistance.
- `src/editorial/infrastructure` : adaptateur Supabase et reprise des données historiques.
- `editorial_entries` : brouillons privés, numéros de version, état de publication.
- `published_content` : copie publique écrite atomiquement à la publication.
- `editorial_editors` : liste des utilisateurs autorisés, administrée avec un accès privilégié.
- `editorial-images` : bucket privé ; lecture publique uniquement des images référencées par une version publiée.

Les RLS vérifient les droits indépendamment de l’interface et des Server Actions.
Les écritures concurrentes refusent une version périmée au lieu d’écraser le travail de l’autre personne.
Les accès de l’application utilisent exclusivement la clé publique et la session de l’utilisateur.
La clé `service_role` n’est jamais nécessaire à Vercel : elle sert uniquement à l’import et à l’administration initiale.

## Développement local

Docker et une version récente de la CLI Supabase compatible PostgreSQL 17 sont nécessaires.

```sh
npm ci
npx supabase@latest start
npx supabase@latest migration up --local
node scripts/import-editorial.cjs
npm test
node --test tests/editorial.integration.cjs
npm run lint
npm run build
```

Les tests d’intégration vérifient que la cible est locale, créent des utilisateurs temporaires
et nettoient leurs propres données. Ils ne contactent ni la base de production ni une boîte e-mail réelle.
Ne pas lancer `next dev` et `next build` simultanément : ils partagent `.next`.

Créer `.env.local` ignoré par Git avec les variables ci-dessous, obtenues depuis **la pile locale**.
Ne jamais copier une clé secrète dans la conversation ou dans un argument de commande.

| Variable | Usage |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet ciblé |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clé publique publishable ou anon |
| `APP_ORIGIN` | Origine exacte de l’application, localhost en développement |
| `CONTENT_SOURCE` | `supabase` après import ; absent pour conserver les fichiers historiques |

Pour importer, injecter `SUPABASE_SERVICE_ROLE_KEY` uniquement dans l’environnement du processus,
puis lancer `node scripts/import-editorial.cjs --apply`. Sans `--apply`, le script valide seulement.
La transaction importe les entrées manquantes et préserve les modifications déjà présentes.
Les 123 entrées initiales réutilisent les images déjà publiques dans `public/assets` ; les nouvelles
images sont stockées dans Supabase. Cela évite de dupliquer les archives dans le quota gratuit.

## Mise en service sur le projet Supabase existant

Projet retenu : `harmonie`, référence `eclnkyglwuyzrevphjqk`. Ne pas réinitialiser ce projet.

1. Reprendre le projet en pause et vérifier son schéma, son historique de migrations et ses sauvegardes.
2. Sauvegarder avant changement. Lier la CLI à ce projet, inspecter `supabase db push --dry-run`,
   puis appliquer les migrations versionnées comme étape distincte avant le déploiement applicatif.
   En cas de tables préexistantes homonymes, arrêter et réconcilier le schéma ; ne pas masquer le conflit.
3. Exécuter l’import une fois, puis vérifier son caractère réexécutable et les comptes attendus.
4. Désactiver les inscriptions publiques dans Auth tout en laissant la connexion par e-mail active.
5. Créer les deux comptes fournis et ajouter leur UUID à `editorial_editors`.
   Un compte Auth sans cette ligne ne peut pas administrer les contenus.
6. Configurer le SMTP de Supabase Auth, son Site URL et les URL de redirection avec l’origine réelle.
   Le SMTP du formulaire de contact n’est pas automatiquement réutilisé par Supabase.
   Utiliser `supabase/templates/recovery.html` comme modèle de récupération ; le message contient un code à usage unique à saisir sur `/admin/confirm`. Aucun jeton
   ne transite dans les URL, journaux de requête ou liens partagés.
7. Injecter les quatre variables applicatives dans Vercel, puis déployer après validation.
   Supabase n’envoie aucun e-mail lors de la simple préparation du code.
8. Vérifier connexion, récupération du mot de passe, import d’image, aperçu privé,
   publication, dépublication, sitemap et accès anonyme aux médias.

## Sauvegarde et exploitation

Sur le forfait gratuit, prévoir un export régulier hors Supabase : schéma, données
(`public`, `editorial_private`, comptes Auth), historique des migrations et fichiers du bucket.
Le dump SQL ne contient pas les fichiers Storage : copier aussi `editorial-images` avec
la CLI Storage vers une destination privée. Chiffrer les sauvegardes et limiter leur accès.
Conserver le dernier export avant déploiement et tester une restauration dans un projet isolé.
La restauration des utilisateurs Auth est nécessaire pour conserver les UUID des droits d’accès.

La personne responsable du projet gère la rotation/révocation des clés dans Supabase.
Après rotation de la clé publique, actualiser Vercel et redéployer ; les secrets d’administration
ne doivent pas être injectés dans le site. En cas de départ, retirer d’abord le membre de
`editorial_editors`, puis révoquer ses sessions Auth.

La lecture publique utilise le cache Next.js avec revalidation de cinq minutes ; la publication
invalide les pages concernées. En cas d’échec de revalidation, Next conserve les pages déjà en cache,
mais une page jamais générée peut rester indisponible : cela ne garantit pas la disponibilité
si Supabase est suspendu. Surveiller les alertes de pause et les quotas stockage/trafic.

Les fichiers uploadés sont immuables et ne sont pas effacés automatiquement : un brouillon retiré
peut encore en avoir besoin. Avant de purger des médias non référencés, comparer **brouillons et
versions publiées**, conserver une sauvegarde et prévoir un délai de rétention.

## Critères de validation V1

- Un éditeur autorisé enregistre un brouillon visible uniquement par les éditeurs.
- Un visiteur ou compte non autorisé ne voit pas les brouillons ni leurs nouvelles images.
- Modifier un contenu publié conserve son ancienne version publique jusqu’à publication.
- Une version périmée ne peut pas écraser ni publier le travail d’un autre éditeur.
- Les légendes, la couverture et l’ordre d’un album sont conservés après enregistrement.
- Un import interrompu conserve dans le formulaire les images déjà importées.
- Les liens vidéo non reconnus sont refusés avant enregistrement.
- La dépublication retire le contenu des listes, pages et sitemap après invalidation du cache.
- Le mot de passe n’est jamais communiqué à l’autre utilisateur ; la récupération utilise un code à usage unique reçu par e-mail.
- Les rubriques publiques conservent leurs URL et les liens vers les archives existantes.

- La validation des formulaires signale les erreurs après sortie du champ ; un refus de connexion conserve les saisies.

## Demandes reçues (V1)

Les formulaires Contact et Nous rejoindre alimentent **Administration → Demandes reçues**.
Chaque demande conserve la date, l’origine, le nom, l’adresse e-mail, le sujet et le message complet
(y compris instrument, expérience et téléphone pour Nous rejoindre). Les deux éditeurs peuvent
lire les messages et choisir **Nouveau / Traité**. La liste affiche 50 demandes par page.
La notification SMTP reste destinée à l’association ; son échec ne perd pas la demande.
Les messages sont du texte encodé par React, jamais du HTML exécuté.

Critères d’acceptation :
- Une demande valide devient lisible par un éditeur dans les demandes reçues.
- Une panne SMTP laisse la demande disponible avec un état de notification explicite.
- Une panne de stockage affiche un échec au visiteur et conserve sa saisie.
- Le rejeu d’une même demande ne crée pas de doublon.
- Un visiteur ou un compte non autorisé ne peut ni lire ni modifier les demandes.
- Un éditeur peut marquer une demande comme traitée et revenir à nouveau.
- Un échec de changement de statut permet de réessayer sans perdre le message.
- Les demandes au-delà de la première page restent accessibles par pagination.

Appliquer `20261014000100_form_submissions.sql` avant de déployer cette version. Migration additive,
compatible avec le code précédent ; retour arrière applicatif possible sans supprimer les messages.
Utiliser le ledger Supabase, contrôler le contenu des migrations appliquées, ne jamais rejouer le SQL
au démarrage. En cas de correction, ajouter une nouvelle migration (roll-forward).

Ajouter `SUPABASE_SERVICE_ROLE_KEY` **uniquement côté serveur**, dans les variables sensibles Vercel.
Cette clé sert à enregistrer les demandes après validation reCAPTCHA ; les lecteurs de l’admin
utilisent leur session et les règles RLS. Ne jamais préfixer cette clé par `NEXT_PUBLIC_`.
Propriétaire des secrets : Nathan. Rotation planifiée tous les 90 jours, prochaine échéance le
11 janvier 2027 pour les secrets mis en place le 13 octobre 2026 ; vérifier cette échéance lors de
chaque livraison. Révoquer immédiatement en cas de fuite, sans attendre cette échéance. Révoquer/remplacer la clé depuis Supabase, mettre à jour Vercel,
redéployer puis vérifier le refus de l’ancienne clé. Aucun secret ni contenu de message dans les logs.

Limites : la notification est une tentative SMTP sans relance automatique ; un crash peut laisser
« envoi non confirmé ». La réception dans l’admin fait foi. Les clés de déduplication restent avec
les demandes, sans expiration. Elles sont conservées dans la page du formulaire pour les retries,
réinitialisées après succès ou modification de la saisie. Une ancienne page ouverte avant déploiement
doit être rechargée avant l’envoi : toute demande sans identifiant est refusée sans effet. Les messages historiques
reçus seulement par e-mail ne sont pas importés. Aucun export, suppression ou réponse depuis l’admin
n’est inclus dans cette V1.

## Contrôle quotidien de Supabase

`vercel.json` appelle `/api/cron/supabase` chaque jour à 07:00 UTC (heure approximative en Hobby).
La route exige `Authorization: Bearer <CRON_SECRET>` et effectue une lecture sans cache du catalogue
public. Elle retourne 503 si la base est indisponible, 401 si le secret manque ou est incorrect.
Vercel fournit automatiquement l’en-tête depuis la variable serveur `CRON_SECRET` ; générer une
valeur aléatoire d’au moins 32 octets, distincte entre environnements. Rotation : remplacer la variable,
redéployer, vérifier que l’ancien secret obtient 401. Consulter les exécutions dans Vercel Cron Jobs.
Le cron ne s’exécute automatiquement **qu’en production**, pas sur les prévisualisations.
Il génère de l’activité mais ne garantit pas l’absence de pause sur Supabase Free ; il ne restaure
pas un projet déjà en pause. Aucun e-mail de contrôle n’est envoyé.

## V2

Analytics intégré au back-office, à définir séparément.

Critères complémentaires : une demande sans identité de rejeu est refusée sans enregistrement ; le cron refuse les appels non autorisés et signale une panne de la base.
