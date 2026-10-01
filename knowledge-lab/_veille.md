# Méthode de veille — choisir l'angle de la semaine

Utilisé à l'étape 3 de `AUTOMATION.md`. Objectif : trouver **un seul** angle
d'actualité utile à la cible décrite dans `_audience.md`, ou à défaut basculer sur
un sujet intemporel.

## Thèmes surveillés

1. **Marketing, SEO et IA** : évolutions de Google et des moteurs de réponse IA,
   réseaux sociaux, outils d'IA utiles à une PME, e-mailing, publicité.
2. **Économie belge et PME** : conjoncture, coûts, consommation, tendances qui
   touchent les PME et indépendants de Wallonie et de Bruxelles.
3. **Marketing adapté aux PME** : toute actualité marketing qu'une petite structure
   peut appliquer sans gros budget (les nouveautés réservées aux grands comptes sont
   à ignorer).

## Où chercher (indicatif, pas exhaustif)

- Économie belge : lecho.be, trends.levif.be, lesoir.be, rtbf.be, ucm.be, uwe.be,
  statbel.fgov.be, nbb.be, digitalwallonia.be, hub.brussels.
- Marketing, SEO et IA : searchengineland.com, le blog Google Search Central
  (developers.google.com/search/blog), blogdumoderateur.com, journaldunet.com,
  maddyness.com, socialmediatoday.com, et les annonces officielles des éditeurs d'IA.
- Toujours privilégier la **source primaire** (communiqué, étude, statistique
  officielle) à l'article qui la commente.

## Méthode

1. Rechercher les actualités des **14 derniers jours** sur les trois thèmes.
   Retenir 5 à 10 candidates.
2. Écarter : rumeurs, annonces non confirmées, levées de fonds, effets de mode,
   chiffres sans source, tout sujet partisan ou polémique, tout sujet de la liste
   d'exclusion privée fournie dans le prompt de la tâche (elle prime sur tout).
3. Noter chaque candidate de 0 à 2 sur : pertinence pour la cible, action concrète
   possible, fiabilité (source primaire ou deux sources indépendantes), nouveauté par
   rapport aux articles déjà publiés (voir `_backlog.json`).
4. Garder la meilleure, à condition qu'elle ait au moins 1 sur chaque critère et un
   total d'au moins 6/8. Sinon : **pas d'actualité cette semaine**, prendre le premier
   sujet `todo` de type `evergreen` du backlog, et l'indiquer dans la PR.
5. Si plusieurs candidates se valent, préférer la catégorie la moins représentée
   parmi les 4 derniers articles publiés.

## Écrire à partir de l'actualité

- Partir du fait, puis de ce que ça change pour une PME belge, puis d'une action.
  L'actualité sert d'amorce : l'article doit rester utile dans 6 mois.
- Chaque chiffre, date ou affirmation factuelle vient d'une source consultée pendant
  la veille. Si un point n'est pas confirmé, le dire ou l'omettre. Aucune citation
  inventée, aucune statistique "de mémoire".
- Reformuler avec ses propres mots, ne jamais recopier des passages des sources.
- Terminer l'article par une section `Sources` (2 à 4 liens : titre, média, date).

## Brief de veille à joindre à la PR

Dans la description de la Pull Request, ajouter :
- l'angle retenu et la raison du choix (3 lignes maximum) ;
- les sources utilisées, avec leurs liens ;
- les 2 ou 3 autres candidates écartées, avec le motif ;
- les **points à vérifier** par le relecteur (chiffres, dates, noms).
