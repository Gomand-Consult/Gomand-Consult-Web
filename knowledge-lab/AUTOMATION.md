# Automatisation du Knowledge Lab — mode d'emploi

Ce document est le playbook suivi par la tâche planifiée qui publie automatiquement
**1 nouvel article par semaine**, préparé chaque **mercredi matin** (heure de
Bruxelles) sur le Knowledge Lab de gomandconsult.com. L'article part de l'actualité
utile à la cible quand c'est possible, et d'un sujet intemporel sinon. Il est conçu
pour être exécuté par une session Claude fraîche, sans mémoire des sessions
précédentes — tout ce qui est nécessaire doit donc se trouver ici ou dans les
fichiers qu'il référence.

Dépôt : `https://github.com/Gomand-Consult/Gomand-Consult-Web` (branche `main`).
Le site est un site statique HTML déployé automatiquement par Netlify à chaque
push sur `main` — il n'y a pas de build à lancer. En revanche, **toute
publication passe par une Pull Request** : le propriétaire du site relit et
merge lui-même avant que l'article soit en ligne (voir étape 11).

Fichiers de référence, à lire à chaque exécution :
- `knowledge-lab/_audience.md` : le lecteur visé et le test d'un bon angle ;
- `knowledge-lab/_veille.md` : thèmes, sources et méthode de sélection de l'actualité ;
- `knowledge-lab/_backlog.json` : articles déjà publiés et réserve de sujets intemporels.

## Étapes à suivre à chaque exécution

1. **Cloner le dépôt** dans un répertoire de travail temporaire. Vérifier qu'il
   n'existe pas déjà 2 Pull Requests ouvertes dont la branche commence par
   `article/` : dans ce cas, ne rien publier, expliquer pourquoi dans la réponse
   finale et s'arrêter (le relecteur a déjà du retard à rattraper).
2. **Lire** `_audience.md`, `_veille.md` et `_backlog.json` (pour connaître les
   articles déjà publiés et éviter tout doublon de sujet).
3. **Faire la veille** en suivant `_veille.md` et choisir **un seul angle**. Les
   exclusions privées (sujets et marques à ne jamais traiter) sont fournies dans le
   prompt de la tâche : elles priment sur tout le reste. Si aucune actualité ne
   passe le seuil défini dans `_veille.md`, prendre le premier sujet `todo` de type
   `evergreen` du backlog (voir "Réserve de sujets" plus bas).
4. **Rédiger l'article** en suivant strictement le gabarit ci-dessous.
5. **Créer le fichier** `knowledge-lab/<slug>.html` (slug en kebab-case, sans
   accents, sans date).
6. **Mettre à jour `knowledge-lab.html` :**
   - **"À lire en premier"** (`.card-grid`) : exactement **3** cartes, les 3
     articles les plus récents. Ajouter le nouvel article en tête et retirer la
     3ᵉ carte actuelle (elle ne disparaît pas du site : elle reste dans la liste
     "Tous les articles").
   - **"Tous les articles"** (`.kl-list`) : ajouter un bloc `<article
     class="kl-item" data-category="...">` en tête de liste, en copiant les
     blocs existants (date au format `JJ.MM.AA` dans `<time datetime="AAAA-MM-JJ">`,
     catégorie dans `.kl-tag`, titre complet en lien, extrait = la
     `meta description` de l'article, durée de lecture dans `.kl-meta`).
     `data-category` doit valoir exactement : `branding`, `strategie-roi`,
     `digitalisation` ou `pme-terrain`. Ne jamais retirer d'entrée de cette
     liste — elle grandit indéfiniment.
   - La section "Quatre axes de contenu" (`.kl-axes`) et les boutons de filtre
     (`.kl-chip`) sont statiques côté HTML ; leurs compteurs sont calculés par
     `js/knowledge-lab.js` à partir de la liste : **ne pas les modifier** et ne
     rien compter à la main. Ne pas toucher au JS ni au CSS.
   - Mettre à jour le bloc JSON-LD `hasPart` de la page pour qu'il reflète
     exactement les 3 articles actuellement dans "À lire en premier" (pas plus).
7. **Mettre à jour `sitemap.xml`** : ajouter une ligne `<url>` pour le nouvel
   article, juste après `knowledge-lab.html`, avec `priority` `0.5`.
8. **Mettre à jour `llms.txt`** : ajouter une ligne dans la section
   `## Knowledge Lab`, juste après la ligne `[Knowledge Lab](...)`, avec le
   titre et un résumé d'une phrase.
9. **Mettre à jour `knowledge-lab/_backlog.json`** :
   - sujet issu du backlog : passer son `status` à `"published"` avec la date du
     jour dans `published_date` (`AAAA-MM-JJ`) ;
   - sujet issu de la veille : ajouter une entrée à la fin de `topics` avec
     `id` (dernier `id` + 1), `status` `"published"`, `type` `"actualite"`,
     `published_date`, `category`, `title`, `slug`, `angle` (2-3 phrases) et
     `cta_service`.
10. **Vérifier** avant de commiter : le fichier HTML de l'article est complet
    (header, footer, JSON-LD valides), tous les liens internes pointent vers des
    fichiers existants, le nombre de mots est dans la fourchette, chaque chiffre de
    l'article figure dans une source consultée.
11. **Ne jamais commit/push directement sur `main`.** Créer une branche dédiée
    nommée `article/<slug>`, y commit tous les changements (message au format
    `Publie l'article "<titre court>" (Knowledge Lab)`), la pousser, puis ouvrir
    une Pull Request vers `main` avec :
    - Titre : `Knowledge Lab : <titre court de l'article>`
    - Description : le résumé de l'article (`angle`), la catégorie, le type
      (actualité ou intemporel), la liste des fichiers modifiés, et le **brief de
      veille** décrit à la fin de `_veille.md` (angle choisi, sources, candidates
      écartées, points à vérifier).
    Puis **s'arrêter** — ne pas merger la PR. La revue et le merge sont faits
    par le propriétaire du site (ou sur sa demande explicite). C'est le
    fonctionnement voulu par le client : chaque article est relu avant d'être
    visible publiquement.

## Gabarit exact d'un article

Copier la structure d'un article existant, par exemple
`knowledge-lab/4p-marketing-pme-cadre-simple.html` ou
`knowledge-lab/site-vitrine-vs-site-qui-convertit.html`, et l'adapter :

- `<title>` : `"<Titre> — Gomand Consult"`
- `<meta name="description">` et tous les `og:`/`twitter:` équivalents :
  1 à 2 phrases, ton direct, qui donnent envie de cliquer sans être putaclic.
- `<link rel="canonical">` et `og:url` : `https://gomandconsult.com/knowledge-lab/<slug>.html`
- `og:image` : voir `image_by_category` dans `_backlog.json` selon la catégorie
  de l'article.
- JSON-LD `BlogPosting` : `datePublished`/`dateModified` = date du jour de
  publication, `articleSection` = catégorie exacte du backlog.
- JSON-LD `BreadcrumbList` : 3 niveaux (Accueil / Knowledge Lab / titre court).
- `breadcrumb` dans le corps : `<a href="../knowledge-lab.html">Knowledge Lab</a> / <titre court>`
- Hero : `eyebrow` = catégorie, `h1` = titre complet, `lede` = accroche de 1 à 2
  phrases, ligne signature `Par Anthony Gomand · <date en toutes lettres> · Environ
  X min de lecture` (X ≈ nombre de mots / 130, arrondi).
- Corps : 700 à 1000 mots, 3 à 5 sous-titres `<h2>`, au moins une liste
  (`<ul>` ou `<ol>`) quelque part, un paragraphe de conclusion qui fait un lien
  interne naturel (pas forcé) vers `cta_service`.
- **Article d'actualité uniquement** : une dernière section `<h2>Sources</h2>` après
  la conclusion, avec une liste de 2 à 4 liens externes (titre, média, date), chaque
  lien en `target="_blank" rel="noopener noreferrer"`. Reprendre la mise en forme
  des listes des autres articles.
- Section `.cta-band` standard identique à celle des autres articles (titre +
  phrase + bouton "Prenons un café" vers `../contact.html`).
- Header et footer : copier-coller exact depuis un article existant (ne jamais
  les réinventer).

## Ton et style — voix d'Anthony Gomand

- Français de Belgique (`fr-BE`), direct, sans jargon marketing inutile.
- Première personne pour les passages méthode ("Je construis...", "Je fais
  répondre mes clients à...") — c'est un consultant qui parle de sa pratique
  réelle, pas un média généraliste.
- Toujours relier une idée abstraite à un effet business mesurable ou à une
  situation concrète de PME/indépendant belge.
- Éviter les tournures creuses ("dans le monde d'aujourd'hui", "il est
  important de noter que"). Aller directement à l'observation ou à l'exemple.
- Terrain PME/indépendant en Wallonie et à Bruxelles, jamais un ton corporate
  ou start-up.
- Article d'actualité : le fait en 2 ou 3 phrases, puis "ce que ça change pour
  une PME belge", puis une action à faire cette semaine. Pas de prédiction
  présentée comme certaine, pas de titre racoleur.

## Équilibre des catégories

Il n'y a plus de rotation fixe : la catégorie découle de l'angle retenu. Rapprochement
indicatif : marketing, SEO et IA → `digitalisation` ou `strategie-roi` ; économie belge
et PME → `pme-terrain` ou `strategie-roi` ; identité, positionnement →
`branding`. À qualité d'angle équivalente, préférer la catégorie la moins représentée
parmi les 4 derniers articles publiés.

## Réserve de sujets intemporels

Les sujets `"status": "todo"` de `_backlog.json` forment la réserve utilisée quand
aucune actualité ne passe le seuil de `_veille.md`. Les prendre dans l'ordre où ils
apparaissent. Quand il reste moins de 4 sujets `todo`, en générer 6 à 8 nouveaux,
inspirés des pages `services/*.html` et des articles déjà publiés (éviter les
doublons), avec : `category`, `title`, `slug`, `angle` (2-3 phrases de brief),
`cta_service` et `"type": "evergreen"`. Les ajouter à la fin du tableau `topics`
avec `"status": "todo"`. Les entrées existantes sans champ `type` sont
considérées comme `evergreen`.

## Ce qu'il ne faut jamais faire

- Ne jamais publier deux articles sur un sujet quasi identique à un article
  déjà présent dans `_backlog.json` (`published` ou `todo`).
- Ne jamais inventer un chiffre, une citation ou une source, ni écrire une
  statistique de mémoire. Pas de source vérifiée : pas d'affirmation.
- Ne jamais recopier des passages des sources : reformuler.
- Ne jamais traiter un sujet de la liste d'exclusion privée du prompt, ni prendre
  parti sur un sujet politique, partisan ou polémique.
- Ne jamais présenter un conseil juridique, fiscal ou financier comme tel : en
  cas de sujet réglementaire, rester au niveau "ce qu'il faut savoir et faire
  vérifier".
- Ne jamais critiquer nommément une entreprise ou une personne.
- Ne jamais casser la structure JSON-LD ou oublier de mettre à jour
  `sitemap.xml` — c'est ce qui permet au site d'être bien référencé.
- Ne jamais laisser un article de moins de 600 mots ou de plus de 1300 mots.
- Ne jamais merger une Pull Request ni pousser sur `main`.
- Ne jamais changer le design/CSS/JS du site dans le cadre de cette tâche : le
  scope est strictement la publication d'articles et la mise à jour des
  fichiers listés ci-dessus.
