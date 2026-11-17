# Schéma de données — Lore Weaver

## 1. Présentation du domaine
Lore Weaver est une application web de *worldbuilding* permettant aux utilisateurs de créer et d'organiser des univers fictifs. Chaque univers peut contenir différents éléments, notamment des personnages, des lieux, des factions et des événements. Les utilisateurs pourront également établir des relation entre les personnages, les associer à différentes factions ou lieux et définir leur participation à des événements. 

Pour représenter ces informations, j'ai choisi d'utiliser une base de données relationnelle PostgreSQL. Cette approche permet de structurer les données en tables distinctes et de définir clairement les liens qui les unissent. Elle permet également de limiter la répétition des informations et de préserver leur cohérence grâce à l'utilisation de clés primaires, de clés étrangères et de contraintes.

Mon schéma comprend neuf tables, réparties en deux catégories : **six tables principales** (utilisateur, univers, personnage, lieux, faction et evenement) et **trois tables de relations** (pers_faction, pers_evenement et relation).

Le schéma est présenté à l'aide d'instructions SQL CREATE TABLE, accompagnées de commentaires décrivant le rôle des tables, leurs champs et leurs relations. Les noms des tables et des colonnes utilisent des minuscules et des underscores afin de faciliter leur utilisation dans PostgreSQL.

## 2. Schéma relationnel commenté

### 2.1 Table UTILISATEUR

Cette table contient les informations nécessaires à la gestion des comptes utilisateurs. Chaque utilisateur possède un identifiant unique, un pseudonyme, une adresse courriel et un mot de passe enregistré sous forme de hachage sécurisé.

```
CREATE TABLE utilisateur (
    id_user INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom_user VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mdp_hash VARCHAR(255) NOT NULL,
    date_creation TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX utilisateur_email_unique
ON utilisateur (LOWER(email));

CREATE UNIQUE INDEX utilisateur_nom_user_unique
ON utilisateur (LOWER(nom_user));
```

La colonne **id_user** constitue la clé primaire de la table. Sa valeur est générée automatiquement lors de la création d'un compte. Les champs **nom_user** et **email** sont obligatoires et doivent être uniques, sans tenir compte de la casse. Cette règle est appliquée à l'aide d'index d'unicité sur les valeurs converties en minuscules.

Le champ **mdp_hash** servira à conserver le hachage du mot de passe plutôt que le mot de passe original, afin de protéger les informations d'authentification des utilisateurs. Le champ **date_creation** enregistre automatiquement la date de création du compte.

**Relation** : un utilisateur peut créer plusieurs univers, mais chaque univers appartient à un seul utilisateur. Cette relation de type un-à-plusieurs (1) sera représentée par une clé étrangère dans la table univers. Si éventuellement, je souhaite permettre à plusieurs utilisateurs de travailler sur un même univers, je pourrai adapter mes tables aux nouveaux besoins de l'application web.



### 2.2 Table UNIVERS

Cette table représente les univers fictifs créés par les utilisateurs. Elle conserve leurs informations générales et permet d'identifier leur propriétaire.

```
CREATE TABLE univers (
    id_univers INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_user INTEGER NOT NULL REFERENCES utilisateur(id_user),
    nom_univers VARCHAR(150) NOT NULL,
    desc_univers TEXT,
    hist_univers TEXT,
    est_public BOOLEAN NOT NULL DEFAULT FALSE,
    date_creation TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

La colonne **id_univers** identifie chaque univers de manière unique. La clé étrangère **id_user** référence la table utilisateur et permet de déterminer le propriétaire de l'univers.

Les champs **nom_univers**, **desc_univers** et **hist_univers** permettent respectivement d'enregistrer son nom, sa description générale et son contexte narratif. Le champ **date_creation** conserve la date de création.

J'ai également ajouté le champ **est_public**, dont la valeur par défaut est FALSE. Cette décision correspond à une fonctionnalité prévue de Lore Weaver : permettre aux utilisateurs de conserver leurs univers privés ou de les rendre accessibles publiquement.

**Relations :** chaque univers appartient à un utilisateur et peut contenir plusieurs personnages, lieux, factions et événements. Ces éléments possèdent leur propre clé étrangère vers la table univers.



### 2.3 Table PERSONNAGE

La table personnage contient les informations relatives aux personnages imaginés dans les différents univers.

```
CREATE TABLE personnage (
    id_pers INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_univers INTEGER NOT NULL REFERENCES univers(id_univers),
    nom_pers VARCHAR(150) NOT NULL,
    desc_pers TEXT,
    hist_pers TEXT
);
```

Chaque personnage possède un identifiant unique (**id_pers**) et est associé à un univers par la clé étrangère **id_univers**.
Les champs **nom_pers**, **desc_pers** et **hist_pers** permettent d'enregistrer son nom, ses caractéristiques et son histoire.

**Relations :** un personnage appartient à un seul univers, mais un univers peut contenir plusieurs personnages (1). Un personnage peut également appartenir à plusieurs factions, participer à plusieurs événements et entretenir des relations avec d'autres personnages. Ces associations seront représentées dans des tables distinctes.

### 2.4 Table LIEU

Cette table représente les lieux géographiques ou narratifs présents dans les univers.

```
CREATE TABLE lieu (
    id_lieu INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_univers INTEGER NOT NULL REFERENCES univers(id_univers),
    nom_lieu VARCHAR(150) NOT NULL,
    desc_lieu TEXT,
    hist_lieu TEXT
);
```

La colonne **id_lieu** constitue la clé primaire, tandis que id_univers indique à quel univers appartient le lieu.

Les autres champs permettent d'enregistrer le nom du lieu, sa description et son histoire. Il pourrait par exemple s'agir d'une ville, d'un royaume, d'une région ou d'un bâtiment important dans l'univers.

**Relation :** un univers peut contenir plusieurs lieux, mais chaque lieu appartient à un seul univers (1). Pour le moment, je n'ai pas prévu de table permettant d'associer directement plusieurs personnages à plusieurs lieux. Cette fonctionnalité pourra être ajoutée ultérieurement si elle devient nécessaire.



### 2.5 Table FACTION
La table factions représente les groupes, organisations ou communautés présents dans les univers fictifs.

```
CREATE TABLE faction (
    id_faction INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_univers INTEGER NOT NULL REFERENCES univers(id_univers),
    nom_faction VARCHAR(150) NOT NULL,
    desc_faction TEXT,
    hist_faction TEXT
);
```

Chaque faction possède un identifiant unique (**id_faction**) et appartient à un univers grâce à la clé étrangère **id_univers**.
Les champs **nom_faction**, **desc_faction** et **hist_faction** permettent de décrire son identité, son rôle et son évolution dans l'univers.

**Relations :** un univers peut contenir plusieurs factions. Une faction peut également regrouper plusieurs personnages, et un personnage peut appartenir à plusieurs factions. Cette dernière relation, de type plusieurs-à-plusieurs, nécessite une table d'association.



### 2.6 Table EVENEMENT
Cette table permet d'enregistrer les événements historiques ou narratifs d'un univers fictif.

```
CREATE TABLE evenement (
    id_even INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_univers INTEGER NOT NULL REFERENCES univers(id_univers),
    id_lieu INTEGER REFERENCES lieu(id_lieu)
    nom_even VARCHAR(150) NOT NULL,
    desc_even TEXT,
    hist_even TEXT,
    date_fictive VARCHAR(100),
    ordre_chrono INTEGER
);
```

La colonne **id_even** identifie chaque événement, tandis que **id_univers** indique l'univers auquel il appartient.
La colonne facultative **id_lieu** fait référence au lieu dans lequel s’est produit l’événement. 

Les champs **nom_even**, **desc_even** et **hist_even** permettent d'enregistrer le titre, la description et le récit de l'événement.

J'ai également prévu deux champs facultatifs pour représenter le temps dans un univers fictif. Le champ **date_fictive**, de type VARCHAR(100), permettra d'inscrire une date qui ne correspond pas nécessairement au calendrier réel. Le champ **ordre_chrono**, de type INTEGER, pourra servir à classer les événements dans une chronologie.

**Relations :** un univers peut contenir plusieurs événements. Un événement ne peut survenir qu’à un seul lieu. Un événement peut également impliquer plusieurs personnages, et un personnage peut participer à plusieurs événements.


### 2.7 Table PERS_FACTION
Cette table d'association représente les appartenances des personnages aux factions.

```
CREATE TABLE pers_faction (
    id_pers INTEGER NOT NULL
        REFERENCES personnage(id_pers)
        ON DELETE CASCADE,

    id_faction INTEGER NOT NULL
        REFERENCES factions(id_faction)
        ON DELETE CASCADE,

    role_faction VARCHAR(100),

    PRIMARY KEY (id_pers, id_faction)
);
```

Les colonnes **id_pers** et **id_faction** sont des clés étrangères qui référencent respectivement les tables personnage et factions. Ensemble, elles constituent une clé primaire composée. Cette contrainte empêche l'enregistrement de deux associations identiques entre un personnage et une faction.

Le champ facultatif **role_faction** permettra de préciser la position occupée par un personnage, par exemple membre, dirigeant ou conseiller.

**Relation :** cette table représente une association plusieurs-à-plusieurs. Un personnage peut appartenir à plusieurs factions et une faction peut compter plusieurs personnages.

L'instruction ON DELETE CASCADE permet de supprimer automatiquement une association si le personnage ou la faction concernée est supprimé.



### 2.8 Table PERS_EVENEMENT

Cette table d'association permet d'enregistrer la participation des personnages aux événements.

```
CREATE TABLE pers_evenement (
    id_pers INTEGER NOT NULL
        REFERENCES personnage(id_pers)
        ON DELETE CASCADE,

    id_even INTEGER NOT NULL
        REFERENCES evenement(id_even)
        ON DELETE CASCADE,

    role_even VARCHAR(100),

    PRIMARY KEY (id_pers, id_even)
);
```

Les colonnes **id_pers** et **id_even** sont des clés étrangères qui constituent également une clé primaire composée.

Le champ facultatif **role_even** permet de préciser le rôle joué par un personnage lors d'un événement.

**Relation :** un personnage peut participer à plusieurs événements et un événement peut réunir plusieurs personnages. La clé primaire composée évite de répéter une même association.

Comme dans la table précédente, ON DELETE CASCADE permet de retirer automatiquement les associations liées à un personnage ou à un événement supprimé.



### 2.9 Table RELATION

Cette table permet de représenter les relations narratives entre les personnages d'un univers.

```
CREATE TABLE relation (
    id_relation INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    id_pers_source INTEGER NOT NULL
        REFERENCES personnage(id_pers)
        ON DELETE CASCADE,

    id_pers_cible INTEGER NOT NULL
        REFERENCES personnage(id_pers)
        ON DELETE CASCADE,

    type_relation VARCHAR(100) NOT NULL,
    descr_relation TEXT,

    CONSTRAINT relation_personnages_distincts
        CHECK (id_pers_source <> id_pers_cible),

    CONSTRAINT relation_unique
        UNIQUE (id_pers_source, id_pers_cible, type_relation)
);
```

Chaque relation possède un identifiant unique (**id_relation**) et référence deux personnages à l'aide des clés étrangères **id_pers_source** et **id_pers_cible**.

La présence de deux clés étrangères vers la même table est volontaire. Elle permet de représenter une relation entre un personnage source et un personnage cible.

Le champ **type_relation** précise la nature du lien, comme une amitié, une rivalité, une relation familiale ou une relation de mentorat. Le champ **desc_relation** permet d'ajouter des informations supplémentaires.

La contrainte **CHECK (id_pers_source <> id_pers_cible)** empêche un personnage d'être associé à lui-même dans une relation.

La contrainte **UNIQUE (id_pers_source, id_pers_cible, type_relation)** évite les doublons du même type de relation dans la même direction (personne source à personne cible).

**Relations :** cette table représente des liens entre les personnages. Les relations peuvent être dirigées, par exemple « mentor de », ou réciproques, comme certaines amitiés. Les règles concernant les relations réciproques pourront être précisées lors du développement de cette fonctionnalité.

