# ADR-002 — Choix de PostgreSQL comme système de gestion de base de données

## Contexte

Lore Weaver est une application web de worldbuilding permettant aux utilisateurs de créer et d'organiser des univers fictifs. 
Chaque univers pourra contenir différents éléments, notamment des personnages, des lieux, des factions et des événements. Ces éléments 
devront pouvoir être liés entre eux. L'application nécessite donc un système de gestion de base de données capable de stocker ces 
informations de façon structurée, de gérer les relations entre les tables et de préserver l'intégrité des données. Le projet utilisant
JavaScript, Node.js et Express, je devais également choisir une solution pouvant être intégrée facilement à cet environnement. J'ai 
principalement considéré deux systèmes de gestion de base de données relationnelle : MySQL et PostgreSQL. J'avais déjà appris à utiliser 
le langage SQL avec MySQL dans le cadre du cours Introduction aux bases de données (INF1250), mais je n'avais encore jamais travaillé 
avec PostgreSQL.

## Options considérées
**Option 1 — MySQL**

MySQL est un système de gestion de base de données relationnelle largement utilisé dans le développement web. Il permet de créer des
tables liées entre elles et de gérer les données à l'aide du langage SQL.

Avantages :
- Je possédais déjà des connaissances de base de MySQL, ce qui aurait facilité sa prise en main.
- Il s'agit d'une solution bien établie, utilisée dans de nombreuses applications web.
- MySQL prend en charge les clés étrangères, les transactions et les contraintes nécessaires pour représenter les relations entre les
  données de Lore Weaver.
- Il dispose d'une documentation importante et de nombreuses ressources d'apprentissage.

Inconvénients :
- Son utilisation m'aurait principalement amenée à réutiliser un outil que je connaissais déjà, plutôt qu'à développer de nouvelles
  compétences.
- Certaines fonctionnalités avancées et possibilités de personnalisation de PostgreSQL, notamment son système d'extensions et certains
  mécanismes de contraintes, m'intéressaient davantage pour l'évolution éventuelle du projet.
- MySQL aurait donc été un choix tout à fait approprié pour Lore Weaver. Son principal avantage, dans mon contexte, était ma légère
  familiarité avec cet outil.
  
**Option 2 — PostgreSQL**

PostgreSQL est également un système de gestion de base de données relationnelle libre et open source. Il offre des fonctionnalités 
avancées pour représenter, interroger et protéger des données structurées.

Avantages :
- PostgreSQL offre une prise en charge étendue du langage SQL et des contraintes d'intégrité, ce qui convient à la structure relationnelle
de Lore Weaver.
- Il propose des fonctionnalités avancées, notamment des types de données personnalisés, des extensions et le type JSONB, qui pourraient
  être utiles si les besoins de l'application évoluent.
- Il peut être utilisé avec Node.js et Express grâce à la bibliothèque pg.
- Son utilisation représentait une occasion d'apprendre un nouvel outil tout en réutilisant mes connaissances du langage SQL.

Inconvénients :
- Je n'avais aucune expérience préalable avec PostgreSQL, ce qui impliquait un apprentissage supplémentaire.
- Certaines commandes, configurations et particularités du SQL diffèrent de celles que je connaissais avec MySQL.
- L'installation et la configuration de PostgreSQL sur mon Mac risquaient de me demander davantage de temps qu'une solution déjà familière.
- PostgreSQL répondait donc aux besoins techniques de Lore Weaver, tout en présentant un défi d'apprentissage supplémentaire.

## Comparaison des solutions

MySQL et PostgreSQL sont tous deux des systèmes de gestion de base de données relationnelle capables de répondre aux besoins actuels de 
Lore Weaver. Ils permettent notamment de créer des tables liées par des clés étrangères, d'effectuer des transactions et d'assurer la
cohérence des données. Les deux solutions peuvent également être intégrées à une application Node.js et Express à l'aide de bibliothèques
adaptées.

Certaines différences se trouvent dans les fonctionnalités plus avancées. Les deux systèmes prennent en charge les données JSON, mais
PostgreSQL propose notamment le type JSONB, qui permet de stocker des données JSON dans un format facilitant certaines recherches et
opérations. PostgreSQL se distingue aussi par son système d'extensions, ses types de données personnalisables et la variété de ses
contraintes d'intégrité. Ces possibilités pourraient être intéressantes si les fonctionnalités de Lore Weaver deviennent plus complexes.
MySQL demeure néanmoins une solution robuste et largement utilisée. Il aurait permis de développer les fonctionnalités prévues sans
difficulté particulière liée au modèle relationnel. Ma familiarité avec MySQL aurait possiblement réduit le temps nécessaire à 
l'installation et à l'apprentissage.
La principale différence pour mon projet ne concernait donc pas la capacité des deux outils à répondre aux exigences actuelles, mais plutôt
les possibilités d'évolution offertes par PostgreSQL et mon intérêt à découvrir un nouvel environnement de développement.

## Décision
J'ai décidé d'utiliser PostgreSQL comme système de gestion de base de données pour Lore Weaver.
Cette décision repose d'abord sur les caractéristiques techniques de PostgreSQL, notamment ses fonctionnalités relationnelles,
ses contraintes d'intégrité et ses possibilités d'évolution. Ces caractéristiques correspondent aux besoins d'une application dans
laquelle plusieurs types d'entités doivent pouvoir être associés entre eux.

Deux autres éléments ont également influencé mon choix.

Premièrement, une connaissance travaillant en tant que consultant dans le domaine de l'informatique m'a recommandé PostgreSQL. Cette
recommandation a renforcé mon intérêt pour cet outil et m'a encouragée à l'examiner comme solution pour mon projet. Elle n'a toutefois pas
remplacé ma propre comparaison des possibilités offertes par MySQL et PostgreSQL.

Deuxièmement, je souhaitais profiter de ce projet pour élargir mes compétences. Comme j'avais déjà appris les bases du langage SQL avec
MySQL, choisir PostgreSQL me permettait de découvrir un nouvel environnement de travail tout en approfondissant mes connaissances des
bases de données relationnelles.

J'ai donc privilégié une solution qui répond aux besoins de mon application tout en contribuant à mon apprentissage.

## Conséquences
Le choix de PostgreSQL implique l'installation et la configuration d'un nouvel outil, ainsi que son intégration au backend Node.js et
Express. J'ai utilisé la bibliothèque pg pour permettre à l'application de communiquer avec PostgreSQL. La configuration de la connexion
a été placée dans un fichier distinct, src/config/database.js, afin de séparer cette responsabilité du reste de l'application. Cette 
décision m'a également amenée à découvrir Postgres.app et l'outil en ligne de commande psql, ainsi qu'à adapter certaines de mes 
connaissances SQL à PostgreSQL. À court terme, ce choix demande un investissement supplémentaire en apprentissage et en configuration.
À plus long terme, il me permettra de développer mes compétences avec un deuxième système de gestion de base de données et de disposer
d'une solution suffisamment flexible pour accompagner l'évolution de Lore Weaver.
