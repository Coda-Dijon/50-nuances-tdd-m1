![50 nuances de T.D.D](img/50-nuances-tdd.png)

## Objectifs pédagogiques
- Expliquer les différences entre `T.D.D` et `B.D.D`
- Mettre en œuvre le TDD selon les deux grandes écoles : `Chicago` (Classicist), `London` (outside-in)
- Utiliser l'`Example Mapping` pour faire émerger les règles métier, les exemples clés et les zones d'ambiguïté avant d'écrire du code
- Clarifier les besoins métier pour sécuriser le delivery à travers des tests d'acceptation partagés
- Écrire des scénarios lisibles et pertinents, orientés intention, sans sur-spécifier l'implémentation
- Mettre en œuvre le `Type-Driven Development` pour laisser émerger la conception à partir des types et des exemples de test

## Organisation du dépôt

Le cours est un deck [Slidev](https://sli.dev). `slides.md` contient la couverture et importe, dans l'ordre, les slides de chaque partie.
Chaque partie a son dossier, avec ses slides (`slides.md`), ses images (`img/`) et ses exercices (`exercices/`) :

| Dossier              | Partie                         | Exercices                                                                                                                                                                                                  |
|----------------------|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `01.tdd-inside-out`  | TDD Inside-Out                 | [Le Bouchonnois](01.tdd-inside-out/exercices/bouchonnois), [Xtrem TDD](01.tdd-inside-out/exercices/xtrem-tdd), [Algorithme de Luhn](01.tdd-inside-out/exercices/luhn)                                       |
| `02.tcr`             | Test && Commit \|\| Revert     | [Coda Buzz](02.tcr/exercices/codabuzz)                                                                                                                                                                     |
| `03.bdd`             | Behavior-Driven Development    | [Deses'po'rate Housewives](03.bdd/exercices/desporate-housewives), [Rock Paper Scissors Lizard Spock](03.bdd/exercices/rock-paper-scissors)                                                                |
| `04.tdd-ia`          | TDD et IA                      | [L'EID avec TDD Guardian](04.tdd-ia/exercices/eid-tdd-guardian)                                                                                                                                            |
| `05.tdd-outside-in`  | TDD Outside-In                 | [Bank Kata](05.tdd-outside-in/exercices/bank-kata)                                                                                                                                                         |
| `06.type-driven`     | Type-Driven Development        | [Parse Elf IDs](06.type-driven/exercices/eid)                                                                                                                                                              |

Les évaluations sont dans [`evals/`](evals).

Le thème (`theme/`) est le thème Signal du talk [Green Craft](https://github.com/ythirion/journee-econception2027), complété par `theme/styles/course.css` pour les éléments Markdown du cours (tableaux, citations, code, colonnes, encarts d'exercice).

## Lancer les slides en local

Prérequis : Node.js 20 ou plus.

```bash
npm install

# Serveur de développement (http://localhost:3030)
npm run dev

# Site statique dans dist/
npm run build

# Export PDF (nécessite playwright-chromium)
npm run export
```

En présentation : `→` / `Espace` pour avancer, `o` pour la vue d'ensemble, `p` pour le mode présentateur (notes et slide suivante).
