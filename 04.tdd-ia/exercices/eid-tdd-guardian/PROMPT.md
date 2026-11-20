# Le prompt à tester

Lancez ce prompt **tel quel** dans un CLI (Claude Code, Copilot CLI...), depuis un dépôt créé à partir du squelette [`java/`](java) :
1. une première fois **sans** plugin ;
2. une seconde fois, dans un dépôt neuf, **avec TDD Guardian** installé.

Comparez ensuite les deux historiques git : nombre de tests écrits avant le premier code, nombre et taille des commits, tests écrits avant ou en même temps que le code.

```text
Dans ce dépôt Java (Maven, JUnit 5, AssertJ), implémente en TDD la validation
d'un EID (Elf Identifier) : un identifiant de 8 chiffres.

- Position 1 : sexe, 1 (Sloubi), 2 (Gagna) ou 3 (Catact)
- Positions 2-3 : les deux derniers chiffres de l'année de naissance, de 00 à 99
- Positions 4-6 : numéro de série (ordre de naissance dans l'année), de 001 à 999
- Positions 7-8 : clé de contrôle = 97 - (nombre formé par les 6 premiers chiffres % 97),
  de 01 à 97
- Exemple valide : 19800767

Le cycle TDD doit être lisible dans git : un commit par étape, préfixé red:, green: ou refactor:.
```
