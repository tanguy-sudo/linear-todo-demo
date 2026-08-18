# Linear Todo Demo

Application Angular standalone de liste de tâches locale conçue pour tester le flux **Linear issue → branche → pull request GitHub → CI → déploiement**.

## Lancer l'application

Prérequis : Node.js 22 et npm 11.

Installer les dépendances :

```powershell
npm ci
```

Lancer Angular en développement :

```powershell
npm start
```

Puis ouvrir <http://localhost:4200>.

Les tâches sont conservées dans le `localStorage` du navigateur. Il n'y a donc ni serveur ni compte à gérer.

Les tâches sont conservées dans le `localStorage` du navigateur. Il n'y a donc ni serveur ni compte à gérer.

## Vérifier le code

```powershell
npm run lint
npm test
npm run build
```

Le build de production est généré dans `dist/linear-todo-demo/browser`. Pour GitHub Pages, `npm run build:pages` ajoute le `base-href` `/linear-todo-demo/` nécessaire au sous-chemin du dépôt.

## Connecter Linear et GitHub

Dans Linear :

1. Ouvrir **Settings → Features → Integrations → GitHub**.
2. Activer l'intégration et sélectionner le dépôt `tanguy-sudo/linear-todo-demo`.
3. Connecter également le compte GitHub personnel dans **Settings → Connected accounts**.
4. Activer l'accès au code puis les **Coding sessions** dans **Settings → AI**.
5. Dans l'équipe, configurer les automatisations de statut des pull requests.

### Règles de statut

Configurer les automatisations de l'équipe Tanguy dans **Settings → Teams → Tanguy → Workflows & automations → Pull request and commit automations** :

| Événement GitHub | Statut Linear |
| --- | --- |
| Commit ou branche poussée | In Progress |
| Pull request ouverte | In Review |
| Pull request prête à fusionner | In Review |
| Pull request fusionnée vers `main` | Done |

Dans l'équipe Tanguy actuelle, `In Review` est le statut utilisé pour une PR prête à fusionner. Les PR doivent cibler `main`, utiliser le format de branche `tanguyjouvin/tan-<numéro>-<description>` et contenir `Fixes TAN-<numéro>`. Le workflow `Validate Linear reference` bloque les PR sans référence `TAN-…`.

Ensuite, créer une issue suffisamment précise, puis demander à Linear Agent de l'implémenter. Une session de codage peut créer la branche, modifier le code et ouvrir une pull request brouillon. La PR doit contenir l'identifiant de l'issue, par exemple `Fixes TODO-1`, pour relier automatiquement les deux outils.

## Déploiement

Le workflow `.github/workflows/deploy.yml` s'exécute après chaque fusion dans `main`. Il installe le lockfile avec `npm ci`, lance lint, tests et build, puis publie `dist/linear-todo-demo/browser` avec GitHub Pages et expose l'URL dans l'environnement du workflow.

Application en ligne : <https://tanguy-sudo.github.io/linear-todo-demo/>

## Échec CI

Le workflow `.github/workflows/ci-failure-report.yml` surveille le workflow `CI`. En cas d'échec sur une PR, il ajoute ou met à jour un commentaire contenant les jobs et étapes en erreur, les logs, une cause probable ou une incertitude et l'action recommandée, puis relance une fois les jobs échoués.

La correction automatique du code nécessite un agent GitHub/Copilot ou Linear payant ; ce dépôt ne fusionne jamais automatiquement.

## Première issue conseillée

> En tant qu'utilisateur, je veux pouvoir rechercher une tâche par son titre afin de retrouver rapidement une tâche existante.
>
> Ajouter un champ de recherche au-dessus de la liste. Filtrer les tâches en temps réel, sans modifier les tâches stockées. Conserver les filtres Toutes, À faire et Terminées. Ajouter un test pour la recherche insensible à la casse. Ne pas ajouter de dépendance.
