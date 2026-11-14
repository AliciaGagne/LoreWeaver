# Schéma de données — Lore Weaver

## 1. Présentation du domaine
Lore Weaver est une application web de worldbuilding dans laquelle un utilisateur crée des univers fictifs et organise les éléments qui 
les composent. Chaque univers regroupe notamment des personnages, des lieux, des factions et des événements. Les personnages peuvent 
appartenir à plusieurs factions, participer à plusieurs événements et entretenir des relations avec d'autres personnages.

J'ai choisi de représenter ces informations dans des tables distinctes afin de limiter les répétitions et de rendre explicites les liens
entre les entités. Le schéma comprend **six tables principales** et **trois tables de relation**, soit neuf tables.

