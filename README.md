# Patisseries Paris

## Apercu

Patisseries Paris est une carte interactive qui rassemble les patisseries parisiennes les plus recommandees par les communautes en ligne. Chaque point sur la carte correspond a une boutique reconnue pour une specialite precise (pavlova, tarte, viennoiserie, etc.), avec un lien direct vers Google Maps pour s y rendre facilement.

## Fonctionnalites principales

- Carte Leaflet centree sur Paris avec navigation souris et tactile
- Regroupement des adresses repertoriees dans `src/datas/datas.json`
- Filtre par type de specialite pour afficher uniquement les boutiques correspondantes
- Popups detaillant le dessert recommande, le nom de la patisserie et son adresse
- Fenetre d aide integrant le contexte du projet et une alerte lorsque la zone affichee ne contient plus de points

## Prerequis

- Node.js 18+ et npm
- Vite (fourni via `npm run dev`)
- Make (facultatif mais conseille pour piloter le build et le deploiement)
- WinSCP installe sur Windows (utilise par le script de deploiement SFTP)
- Acces aux identifiants SFTP references dans `deploy.txt`

## Installation locale

```powershell
npm install
npm run dev
```

Le serveur Vite s ouvre par defaut sur `http://localhost:5173` avec rechargement a chaud.

Pour tester le build de production en local :

```powershell
npm run build
npm run preview
```

`npm run preview` lance Vite en mode previsualisation sur le build genere (port `4173` par defaut).

## Deploiement

### 1. Generer le build statique

```powershell
npm run build
```

Le dossier `dist/` contient les fichiers statiques prets a etre deployes.

### 2. Deployer via WinSCP et Make

Le workflow par defaut utilise la cible `deploy` du `Makefile`, qui enchaine la construction et l envoi des fichiers sur l hebergement Hostinger.

```powershell
make deploy
```

Cette commande :
- lance `npm run build`
- appelle WinSCP (`WinSCP.com`) avec le script `deploy.txt`
- synchronise le contenu du dossier `dist/` vers `/home/u372623295/domains/200.work/public_html/patisseriesparis`

> Assurez-vous que le chemin WinSCP defini dans le `Makefile` correspond a votre installation locale. Adaptez `deploy.txt` si les identifiants ou le repertoire distant changent.

### 3. Deploiement manuel (optionnel)

Si vous preferez lancer WinSCP manuellement :

1. Ouvrez WinSCP et connectez-vous avec les parametres du fichier `deploy.txt`.
2. Pointez le repertoire local sur `dist/` et le repertoire distant sur `public_html/patisseriesparis`.
3. Synchronisez ou glissez-deposez les fichiers.

## Redirection Vercel

Un fichier `vercel.json` redirige automatiquement toutes les requetes du domaine historique vers `https://patisseriesparis.200.work`. Vous pouvez ajuster cette redirection si le domaine d arrivee evolue.

## Donnees et maintenance

- Les adresses et categories sont definies dans `src/datas/datas.json`.
- Ajoutez une entree par patisserie en precisant le nom, l adresse et les coordonnees `[latitude, longitude]`.
- Les icones associees aux categories se trouvent dans `src/components/icon.jsx`.
- Le contexte global (`src/store.jsx`) expose maintenant uniquement les etats necessaires (selection, modal, langue) et se base sur Vite pour le rechargement a chaud.

## Contact

Pour toute question ou suggestion : [ecrivez.moi@simonertel.net](mailto:ecrivez.moi@simonertel.net)
