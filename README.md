# Linear Todo Demo

Petite liste de tâches locale conçue pour tester le flux **Linear issue → coding session → branche → pull request GitHub**.

## Lancer l'application

Depuis la racine du dépôt :

```powershell
py -m http.server 4173
```

Puis ouvrir <http://localhost:4173>.

Les tâches sont conservées dans le `localStorage` du navigateur. Il n'y a donc ni serveur ni compte à gérer.

## Vérifier le code

```powershell
npm test
npm run check
```

## Connecter Linear et GitHub

Dans Linear :

1. Ouvrir **Settings → Features → Integrations → GitHub**.
2. Activer l'intégration et sélectionner le dépôt privé `tanguy-jouvin_cnp/linear-todo-demo`.
3. Connecter également le compte GitHub personnel dans **Settings → Connected accounts**.
4. Activer l'accès au code puis les **Coding sessions** dans **Settings → AI**.
5. Dans l'équipe, configurer les automatisations de statut des pull requests.

Ensuite, créer une issue suffisamment précise, puis demander à Linear Agent de l'implémenter. Une session de codage peut créer la branche, modifier le code et ouvrir une pull request brouillon. La PR doit contenir l'identifiant de l'issue, par exemple `Fixes TODO-1`, pour relier automatiquement les deux outils.

## Première issue conseillée

> En tant qu'utilisateur, je veux pouvoir rechercher une tâche par son titre afin de retrouver rapidement une tâche existante.
>
> Ajouter un champ de recherche au-dessus de la liste. Filtrer les tâches en temps réel, sans modifier les tâches stockées. Conserver les filtres Toutes, À faire et Terminées. Ajouter un test pour la recherche insensible à la casse. Ne pas ajouter de dépendance.
