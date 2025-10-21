# Le Pain de mon Quartier

Carte interactive qui repertorie les boulangeries et patisseries parisiennes recommandees par la communaute. L application repose sur React et Leaflet pour afficher des marqueurs, proposer un menu de selection par distinction et permettre une navigation bilingue.

## Fonctionnalites clefs
- Affichage d une carte OpenStreetMap avec les coordonnees issues de `src/datas/datas.json`
- Filtrage des points par palmares (annees, distinctions ou categorie "Autre")
- Mise en avant de la selection survolee et indication des resultats visibles dans la zone affichee
- Contenu traduit en francais, anglais, slovene, italien, espagnol, allemand et ukrainien via les fichiers `src/datas/{fr,en,sl,it,es,de,uk}.json`
- Liens directs vers chaque adresse dans Google Maps et vers l Instagram du palmares actif

## Stack et structure
- React 17 avec Create React App (`react-scripts`)
- React Leaflet et Leaflet pour la carte
- Contexte React (`src/store.js`) pour partager l etat : selection active, survol, langue, modales
- Donnees JSON organises par distinctions qui contiennent nom, adresse, coords `[lat, lng]`, compte Instagram, commentaire optionnel

Elements a connaitre :
- `src/components/` contient l interface (carte, menu, modal d info, avertissement)
- `src/datas/` abrite les dictionnaires de traduction et la liste des points
- `Makefile` et `deploy.txt` automatisent la construction et l envoi SFTP du dossier `build`

## Prerequis
- Node.js 16 ou 18 (Create React App 5 fonctionne sans avertissement sur ces versions)
- npm 7 ou version superieure (ou yarn si vous preferez, un `yarn.lock` est present)
- WinSCP installe si vous utilisez la cible `make deploy` (chemin par defaut `C:\Program Files (x86)\WinSCP\WinSCP.com`)

## Lancer le projet en local
1. Installer les dependances : `npm install`
2. Demarrer le serveur de developpement : `npm start`
   - Lance l application sur http://localhost:3000 avec rechargement a chaud
3. Executer les tests (facultatif) : `npm test`

Pour produire un build optimise : `npm run build`. Les fichiers prets pour la production sont generes dans `build/`.

## Mettre a jour les donnees
- Editer `src/datas/datas.json` pour ajouter ou modifier des points.
  - Chaque cle de premier niveau represente une distinction (exemple `Baguette 2024`).
  - Chaque entree doit fournir `name`, `adresse`, `coords` (latitude puis longitude), `insta` et, si besoin, `comments`.
- Adapter les fichiers de langue (`src/datas/fr.json`, `en.json`, `sl.json`, `it.json`, `es.json`, `de.json`, `uk.json`) si de nouvelles chaines apparaissent dans l interface.
- Le contexte memorise la langue choisie dans `localStorage` sous la cle `mbp-lang`.

## Deploiement
Deux modes de mise en ligne sont actuellement disponibles.

### 1. Vercel
1. Verifier que le projet est relie au compte Vercel indique dans `.vercel/project.json`.
2. Construire localement pour valider le build : `npm run build`.
3. Deployer via la CLI :
   ```bash
   npx vercel --prod
   ```
   Vercel installera automatiquement les dependances puis lancera `npm run build` avant de publier.

### 2. Hebergement statique via SFTP (Hostinger)
Ce flux utilise WinSCP et le script `deploy.txt` pour synchroniser le dossier `build` sur le serveur `200.work`.

1. Regenerer le build : `npm run build` (ou `make build`).
2. Verifier que WinSCP est installe et que `deploy.txt` contient des identifiants a jour.
3. Lancer `make deploy` (via `nmake` ou `make` disponible dans WSL ou Git Bash) :
   - WinSCP est execute avec le script `deploy.txt`
   - Le dossier `build/` est synchronise avec `/home/u372623295/domains/200.work/public_html/boulangerieParisBio`
   - Le journal est ecrit dans `deploy.log`

Alternative manuelle sans Makefile :
```powershell
"C:\Program Files (x86)\WinSCP\WinSCP.com" /log=deploy.log /ini=nul /script=deploy.txt
```

## Bonnes pratiques
- Controler le resultat du build en ouvrant `build/index.html` avant de publier.
- Commiter regulierement les modifications de `datas.json` pour garder un historique clair.
- Mettre a jour les images dans `src/img/` si la charte graphique evolue.
- Surveiller les avertissements ESLint (`npm run lint` via un outil local) pour garder le code propre.

## Support
Pour toute question ou suggestion : `ecrivez.moi@simonertel.net`.


