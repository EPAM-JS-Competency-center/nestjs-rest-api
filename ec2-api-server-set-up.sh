#!/bin/bash

# NOTE: this script was tested on Amazon Linux AMI.
# Prior to be used for Ubuntu this script should be modified and tested accordingly

# install dependencies
npm i

# Set up variable to DRY:

# Locate your private key file. The key used to launch this instance is my-n-virginia-key-pair.pem
# ./ec2-api-server-set-up.sh ~/Downloads/my-n-virginia-key-pair.cer ec2-user ec2-10-20-14-18.compute-1.amazonaws.com
PATH_TO_CERTIFICATE=$1 # first cli argument
EC2_USER=$2 # second argument
EC2_HOST=$3 # third argument

# or hardcode the values:
#PATH_TO_CERTIFICATE=~/Documents/my-n-virginia-key-pair.cer
#EC2_USER=ec2-user
#EC2_HOST=ec2-18-208-164-184.compute-1.amazonaws.com

EC2_URI=${EC2_USER}@${EC2_HOST}

APP_DIR=nest-js-rest-api
NODE_ENV=production
PORT=80

# Run this command, if necessary, to ensure your key is not publicly viewable.
chmod 400 ${PATH_TO_CERTIFICATE}

# using secure shell (SSH) enable node.js to use port 80 (see: https://stackoverflow.com/questions/60372618/nodejs-listen-eacces-permission-denied-0-0-0-080):
# Note: for ubuntu this command must be executed directly within instance
ssh -i ${PATH_TO_CERTIFICATE} ${EC2_URI} "sudo setcap cap_net_bind_service=+ep $(which node)"

# create a temporary folder for built api server via SSH:
ssh -i ${PATH_TO_CERTIFICATE} ${EC2_URI} "mkdir -p /tmp/${APP_DIR}"

# build the app
npm run build

# install pm2 if necessary:
# Note: for ubuntu this command must be executed directly within instance
ssh -i ${PATH_TO_CERTIFICATE} ${EC2_URI} "npm i pm2 --location=global"

# copy files from dist folder to our EC2 instance using Secure Copy Protocol (SCP) (Note: add -q flag to hide progress reporting)
scp -r -i ${PATH_TO_CERTIFICATE} ./dist "${EC2_URI}:/tmp/${APP_DIR}"
scp -r -i ${PATH_TO_CERTIFICATE} package.json "${EC2_URI}:/tmp/${APP_DIR}/"
scp -r -i ${PATH_TO_CERTIFICATE} package-lock.json "${EC2_URI}:/tmp/${APP_DIR}/"

# via ssh move files from tmp folder to /var/www so that it will not be accidentally removed. Clean up folder beforehand.
# Note: for ubuntu this command must be executed directly within instance
ssh -i ${PATH_TO_CERTIFICATE} ${EC2_URI} "pm2 stop all || echo 'nothing to stop.' && echo 'moving files' &&sudo rm -rf /var/www/${APP_DIR} && sudo mv -f /tmp/${APP_DIR} /var/www/${APP_DIR} && cd /var/www/${APP_DIR} && echo 'installing npm packages' && npm i --silent"

# run app with pm2:
# Note: for ubuntu this command must be executed directly within instance
ssh -i ${PATH_TO_CERTIFICATE} ${EC2_URI} "pm2 delete all || echo 'nothing to delete' && export PORT=${PORT}; export NODE_ENV=${NODE_ENV}; pm2 start /var/www/${APP_DIR}/main.js -f"
