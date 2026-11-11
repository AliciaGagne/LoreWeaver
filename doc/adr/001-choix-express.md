# ADR-001 : Utilisation de Node.js et Express pour le backend

## Contexte

Lore Weaver est une application web permettant aux utilisateurs de créer et de gérer leurs propres univers fictifs. Elle devra notamment 
permettre la création de comptes, l'authentification et la gestion d'informations telles que les personnages, les lieux, les factions et
les événements.

Pour prendre en charge ces fonctionnalités, l'application nécessite un backend capable de recevoir et de traiter des requêtes HTTP, 
d'exécuter la logique de l'application et de communiquer avec une base de données relationnelle.

Puisque j'ai choisi HTML, CSS et JavaScript pour développer l'interface utilisateur, je souhaite privilégier une solution qui me permettra
d'utiliser un langage avec lequel je suis déjà familière.

## Décision

J'ai choisi d'utiliser Node.js comme environnement d'exécution JavaScript côté serveur, accompagné du framework Express.

Node.js permettra d'exécuter le code JavaScript du backend, tandis qu'Express simplifiera la création des routes HTTP, le traitement des 
requêtes et l'envoi des réponses aux utilisateurs.

Cette combinaison permettra d'utiliser JavaScript autant pour le frontend que pour le backend.

J'ai également décidé de séparer la configuration de l'application Express dans un fichier app.js et le démarrage du serveur dans 
server.js. Cette organisation facilitera notamment les tests automatisés.

## Alternatives considérées

**Python avec Django**

Django propose plusieurs fonctionnalités intégrées, notamment pour l'authentification et l'accès aux bases de données.

Cette solution aurait pu réduire la quantité de fonctionnalités à configurer manuellement. Cependant, elle aurait nécessité l'utilisation
de Python, avec lequel je suis moins familière que JavaScript.

**Node.js sans Express**
Node.js permet de développer un serveur HTTP sans utiliser Express.
Cette approche aurait toutefois nécessité davantage de code pour gérer les routes et certaines fonctionnalités communes aux applications
web.
J'ai donc préféré utiliser Express pour simplifier le développement. De plus, Express est le framework Node.js le plus populaire. Il 
bénéficie donc d'une bonne documentation et d'une large communauté.

## Conséquences positives
- Possibilité d'utiliser JavaScript autant pour le frontend que pour le backend.
- Réutilisation de mes connaissances existantes en JavaScript.
- Simplification de la gestion des routes et des requêtes HTTP.
- Possibilité de développer progressivement les fonctionnalités de l'application.
- Compatibilité avec les systèmes de bases de données relationnelles comme PostgreSQL et MySQL, au moyen de bibliothèques adaptées.
- Possibilité de tester l'application avec les outils de tests de Node.js.

## Conséquences négatives
- Express ne fournit pas directement un système complet d'authentification.
- L'intégration à la base de données nécessitera des bibliothèques supplémentaires.
- Certaines décisions concernant la structure et la sécurité de l'application devront être prises manuellement.
- Je devrai approfondir mes connaissances du fonctionnement des serveurs web et du traitement des requêtes HTTP.

## Conclusion
Node.js et Express ont été retenus parce qu'ils correspondent aux besoins de Lore Weaver tout en me permettant de développer 
l'application avec JavaScript.

Cette solution offre un compromis entre simplicité, flexibilité et possibilités d'évolution, ce qui me semble approprié pour un projet
réalisé au cours d'une session universitaire dont les fonctionnalités seront développées progressivement.
