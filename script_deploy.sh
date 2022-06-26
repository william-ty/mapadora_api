#!/bin/bash

SCRIPT_ENV='/home/marion/var_env.sh'
source ${SCRIPT_ENV}

#___ SUPPRESSION DES FICHIERS DISTANTS
echo 'Connexion ssh au serveur'
ssh ${SSH_REMOTE} << ENDSSH
echo "Arrêt de l'API"
cd ${REMOTE_PATH}
forever stopall
cd ../
echo "Suppression des fichiers"
sudo rm -r -f ${REMOTE_PATH}/*
echo "Suppression des tables de la base"
sudo rm -r -f ${REMOTE_PATH}/*
echo "Suppression et restauration de la base"
sudo -i -u postgres
dropdb ${REMOTE_DB}
createdb ${REMOTE_DB}
psql ${REMOTE_DB}
create extension postgis;
ENDSSH


#___ LOCAL

echo 'Copie des fichiers sur le serveur distant'
sudo rsync -e ssh --exclude="node_modules" --exclude=".git" --exclude="config/config.json" -avz  ${LOCAL_PATH}/ ${SSH_REMOTE}:${REMOTE_PATH}

#___ VM DEPLOY
echo 'Connexion ssh au serveur'
ssh ${SSH_REMOTE} << ENDSSH
cd ${REMOTE_PATH} 
echo 'Renommage config'
sudo mv ./config/${CONFIG_FILE} ./config/${CONFIG_NODE} 
echo 'Installation des packages'
npm install
echo 'Démarrage du service'
forever start app.js
ENDSSH





