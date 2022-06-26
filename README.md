# Acrobatt Api

* Documentation générée lors du lancement du serveur : 
http://localhost:8080/docs

# Notes sur le projet 

## Prérequis : installation d'une base locale postgresql + postGIS 

* LINUX
..* https://www.postgresql.org/download/linux/debian/
..*  https://postgis.net/docs/postgis_installation.html#install_short_version

Un utilitaire multi-BDD : https://dbeaver.io/

SETUP FOR JWT:
- create .env file with variable "TOKEN_SECRET="
- in CLI, run 'node'
- in CLI, run 'require('crypto').randomBytes(64).toString('hex')'
- copy generated token and paste to .env to assign TOKEN_SECRET
-> Follow Step 1 of the following tutorial
https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs

## Initialisation du squelette node Express 
`npx express-generator --view=pug api`
`npm install cors --save` 
## Installation de sequelize et son support postgresql
https://sequelize.org/v7/manual/getting-started.html
`npm install --save sequelize`
`npm i --save pg pg-hstore`

# installation du projet
`npm install`

## modification connexion BDD 
copier le fichier 'config/db.config_example.js' en 'config/db.config.js' et éditer les identifiants de bdd

## lancement du serveur node 
`node run dev` (default 'node app.js' remplacé)
* Au lancement du serveur, node génére les données de la base à partir du schéma (pas de réinitialisation pour le moment de manière à ce que les enregistrements soient conservés.)
`node run seed`
* Les données nécessaire au bon fonctionnement de la solution sont générées grâce aux seeders.

# Routes CRUD sur points
* __FINDALL__ /markers/findAll pour voir tous les points en base
* __FINDONE__ /markers/findOne?id=  pour voir un point en particulier
* __POST__ /markers/create avec un body {description, lat,lng}  
* __DELETE__ /markers/delete avec un body {id : }
* __UPDATE__ /markers/update avec un body {id + attr to update}

# Utilisation de sequelize-cli pour la génération du modèle : 

* Voir la doc ici : https://github.com/sequelize/cli et http://sequelize.org/master/manual/model-basics.html
* pour générer une entité : npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string 
* remarque : concernant les objets de type "GEOMETRY", il ne faut pas inclure l'attrbut dans la génération et l'ajouter à la main après (pas de gestion native...)
* héritage de Controller.js pour le CRUD https://github.com/nondefyde/express-controller-inheritance-sample
* sequelize créé automatiquement deux colonnes createdAt et updatedAt, ainsi qu'une PK id 
** dans le cas où on veut modifier la PK par défaut, ajouter dans la méthode init ; 
  id_element: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },


# Gestion des erreurs 

* 02/04 ajout d'un module de gestion des erreurs dans utils, middelware qui gèrent des erreurs identiques. 
