# Kata : l'algorithme de Luhn

## Contexte
Vous travaillez pour un prestataire de paiement en ligne. Avant même d'interroger la banque, votre système doit pouvoir détecter qu'un numéro de carte a été **mal saisi** (faute de frappe, chiffre oublié, copier-coller tronqué...).

La plupart des numéros de carte bancaire (Visa, Mastercard, Amex, Discover...) intègrent un **chiffre de contrôle**, calculé à partir des autres chiffres grâce à l'**algorithme de Luhn**. C'est un premier filtre, rapide et local, avant tout appel réseau.

Votre mission : **écrire un parseur** capable de dire si une chaîne de caractères représente un numéro valide au sens de Luhn.

## L'algorithme de Luhn
Pour vérifier un numéro :
1. En partant du chiffre le **plus à droite**, parcourir tous les chiffres vers la gauche.
2. **Doubler un chiffre sur deux**, en commençant par l'avant-dernier (donc le 2ème, 4ème, 6ème... en partant de la droite).
3. Si le doublement donne un nombre **supérieur à 9**, lui soustraire **9** (ce qui revient à additionner ses deux chiffres).
4. **Additionner** tous les chiffres obtenus (doublés ou non).
5. Le numéro est valide si cette somme totale est un **multiple de 10**.

**Exemple avec `4532 0151 1283 0366` :**

| Position (depuis la droite) | Chiffre | Doublé ? | Valeur retenue |
|-----------------------------|---------|----------|----------------|
| 1                           | 6       | non      | 6              |
| 2                           | 6       | oui      | 12 → 1+2 = 3   |
| 3                           | 3       | non      | 3              |
| 4                           | 0       | oui      | 0              |
| ...                         | ...     | ...      | ...            |

La somme de toutes les valeurs retenues doit être un multiple de 10 pour que le numéro soit valide.

## Règles
1. La fonction doit accepter une **chaîne de caractères** représentant un potentiel numéro.
2. Les **espaces** doivent être tolérés (ils servent juste à la lisibilité humaine : `4532 0151 1283 0366`) mais ignorés pour le calcul.
3. Une chaîne **vide**, **nulle**, ou contenant des caractères **non numériques** doit être rejetée d'emblée, sans même calculer de somme.
4. Un numéro dont le format est correct mais dont la somme de contrôle échoue doit également être rejeté.
5. En cas de succès, on doit pouvoir récupérer le numéro **nettoyé** (sans les espaces).

<details>
<summary>Des exemples pour démarrer (à ouvrir après avoir cherché les vôtres)</summary>

| Entrée                  | Résultat attendu | Pourquoi                                                    |
|-------------------------|------------------|-------------------------------------------------------------|
| `null`                  | Invalide         | Pas de valeur                                               |
| `""`                    | Invalide         | Chaîne vide                                                 |
| `"00"`                  | Valide           | Somme = 0, multiple de 10                                   |
| `"9"`                   | Invalide         | Somme = 9, pas un multiple de 10                            |
| `"10"`                  | Invalide         | 1 doublé = 2, + 0 = 2, pas un multiple de 10                |
| `"18"`                  | Valide           | En partant de la droite : 8 + (1 × 2) = 10                  |
| `"5555 5555 5555 4444"` | Valide           | Mastercard, les espaces sont ignorés                        |
| `"79927398713"`         | Valide           | Numéro de démonstration classique (doublés supérieurs à 9)  |
| `"6011 1111 1111 1117"` | Valide           | Discover                                                    |

</details>

## Objectif du kata
Écrire une fonction qui prend en entrée une chaîne de caractères et :
- retourne un **échec explicite** si le format est invalide ou si la somme de contrôle ne passe pas ;
- retourne un **succès** contenant le numéro nettoyé (sans espaces) sinon.

Avancez en **TDD** : commencez par les cas invalides les plus simples (chaîne vide, chaîne nulle), puis les cas où le format est mauvais, puis seulement ensuite attaquez le calcul de la somme de Luhn sur des numéros réels. Laissez les tests vous guider vers l'algorithme plutôt que de l'écrire d'un bloc.

> Avant de coder, construisez votre **Example Mapping** : une règle, des exemples qui l'illustrent, des questions.

## Bonus : génération de numéros valides
Une fois la validation en place, ajoutez une fonction capable de **générer** un numéro valide au sens de Luhn, de longueur `n` donnée.

1. La fonction prend en entrée une longueur `n` (nombre de chiffres souhaité).
2. Les `n - 1` premiers chiffres peuvent être tirés aléatoirement (ou fournis).
3. Le **dernier chiffre** (chiffre de contrôle) doit être calculé pour que le numéro complet passe la validation de Luhn.
4. Le numéro généré doit systématiquement être reconnu comme **valide** par votre fonction de validation : c'est le meilleur test de cohérence entre les deux fonctions.
5. Une longueur invalide (`n <= 0`, par exemple) doit être rejetée.

Cette fonction est un bon terrain pour un **property-based test** : générer des numéros pour plusieurs valeurs de `n`, puis vérifier que chacun d'eux est validé par votre parseur.

---

## Une solution : la liste de tests en Example Mapping

<details>
<summary>Afficher la solution (après avoir construit votre propre Example Mapping)</summary>

Légende : 🟨 User Story · 🟦 Règle · 🟩 Exemple · 🟥 Question

🟨 **En tant que** prestataire de paiement, **je veux** détecter un numéro de carte mal saisi **afin de** ne pas interroger la banque inutilement.

| 🟦 Règle                                                             | 🟩 Exemples                                                                                                                                     |
|---------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| **R1** Une valeur absente ou vide est rejetée                       | `null` → ❌ *(step 1)*<br>`""` → ❌ *(step 3)*                                                                                                    |
| **R2** Seuls des chiffres (et des espaces) sont acceptés            | `"Invalid Number"` → ❌ *(couvert par la regexp du step 11, pas de test dédié)*                                                                 |
| **R3** La somme des chiffres doit être un multiple de 10            | `"00"` → ✅ *(step 4)*<br>`"9"` → ❌ *(step 6)*<br>`"10"` → ❌ : (1 × 2) + 0 = 2 *(step 7)*                                                              |
| **R4** Un chiffre sur deux, en partant de la droite, est doublé     | `"18"` → ✅ : 8 + (1 × 2) = 10 *(step 8)*                                                                                                       |
| **R5** Un chiffre doublé supérieur à 9 est diminué de 9             | `"79927398713"` → ✅ *(step 10)*<br>`"6011 1111 1111 1117"` → ✅ *(step 10)*<br>`"59"` → ✅ : 9 + (10 - 9) = 10 *(non retenu dans la solution)* |
| **R6** Les espaces sont ignorés pour le calcul                      | `"5555 5555 5555 4444"` → ✅ *(test d'acceptation du step 2, vert au step 9)*<br>`"3782 822463 10005"` → ✅ *(non retenu dans la solution)*      |
| **R7** En cas de succès, on récupère le numéro (partie 2)            | `"5555 5555 5555 4444"` → `LuhnNumber` de valeur `"5555 5555 5555 4444"` *(step 15)*                                                            |

🟥 **Questions**
- `"9"` est-il rejeté parce qu'il est **trop court** ou parce que sa **somme** est fausse ? (la réponse change au step 11)
- Le numéro restitué doit-il être **nettoyé** (`"5555555555554444"`) ou tel que **saisi** ? L'énoncé dit nettoyé, la solution renvoie la saisie.
- Faut-il tolérer d'autres séparateurs (`-`, `.`) ?
- Existe-t-il une longueur minimale ou maximale ? `"0"` est-il un numéro valide ?
- Que doit dire l'erreur : un message unique, ou une raison par règle (format, somme de contrôle) ?

[La résolution commit par commit](step-by-step.md)

</details>

## Objectifs pédagogiques
- Pratiquer le **TDD** sur un algorithme numérique non trivial.
- Manipuler des **chaînes de caractères** (nettoyage, validation de format).
- Représenter un résultat qui peut **échouer proprement**, sans exception pour un cas métier attendu.
- Découper un calcul en petites fonctions **pures**.
- Relier **génération** et **validation** pour renforcer la confiance dans l'algorithme (tests croisés).
