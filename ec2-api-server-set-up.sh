#!/bin/bash

# NOTE: this script was tested on Amazon Linux AMI.
# Prior to be used for Ubuntu with NVM
# you should add . ~/.nvm/nvm.sh; at the beginning of all ssh commands which require node/npm or any npm package

# install dependencies
npm i

# Set up variable to DRY:

# Locate your private key file. The key used to launch this instance is my-n-virginia-key-pair.pem
# ./ec2-api-server-set-up.sh ~/Downloads/my-n-virginia-key-pair.cer ec2-user ec2-10-20-14-18.compute-1.amazonaws.com
PATH_TO_CERTIFICATE=$1 # first cli argument
EC2_USER=$2 # second argument
EC2_HOST=$3 # third argument

# or hardcode the values:
#PATH_TO_CERTIFICATE=~/Downloads/my-n-virginia-key-pair.cer
#EC2_USER=ec2-user
#EC2_HOST=ec2-18-20-14-14.compute-1.amazonaws.com

if [[ -z "$PATH_TO_CERTIFICATE" ]]; then
    echo 'PATH_TO_CERTIFICATE is not provided.'
    echo 'Please provide it to continue.'
    exit 1
fi

if [ -z "$EC2_USER" ]; then
    echo 'EC2_USER is not provided.'
    echo 'Please provide it to continue.'
    exit 1
fi

if [[ -z "$EC2_HOST" ]]; then
    echo 'EC2_HOST is not provided.'
    echo 'Please provide it to continue.'
    exit 1
fi

EC2_URI="${EC2_USER}@${EC2_HOST}"

APP_DIR="nest-js-rest-api"
APP_ZIP_FILE_NAME="nest-js-rest-api.zip"

APP_DIST_PATH="./dist"
NODE_ENV="production"
PORT=80

# Run this command, if necessary, to ensure your key is not publicly viewable.
chmod 400 "${PATH_TO_CERTIFICATE}"

# using secure shell (SSH) enable node.js to use port 80 (see: https://stackoverflow.com/questions/60372618/nodejs-listen-eacces-permission-denied-0-0-0-080):
ssh -i "${PATH_TO_CERTIFICATE}" "${EC2_URI}" 'sudo setcap cap_net_bind_service=+ep $(which node)'
ssh -i "${PATH_TO_CERTIFICATE}" "${EC2_URI}" 'sudo setcap cap_net_bind_service=+ep $(which pm2)'
# For Ubuntu server with NVM:
#ssh -i "${PATH_TO_CERTIFICATE}" "${EC2_URI}" '. ~/.nvm/nvm.sh; sudo setcap cap_net_bind_service=+ep $(which node)'

# create a temporary folder for built api server via SSH:
ssh -i "${PATH_TO_CERTIFICATE}" "${EC2_URI}" "mkdir -p /tmp/${APP_DIR}"

# build the app
npm run build

# install pm2 if necessary:
ssh -i "${PATH_TO_CERTIFICATE}" "${EC2_URI}" "npm i pm2 --location=global"
# For Ubuntu server with NVM:
#ssh -i "${PATH_TO_CERTIFICATE}" "${EC2_URI}" ". ~/.nvm/nvm.sh; npm i pm2 --location=global"

# copy files from dist folder to our EC2 instance using Secure Copy Protocol (SCP) (Note: add -q flag to hide progress reporting)
cd ${APP_DIST_PATH} && zip -r ${APP_ZIP_FILE_NAME} . && cd ../

scp -i "${PATH_TO_CERTIFICATE}" "${APP_DIST_PATH}/${APP_ZIP_FILE_NAME}" "${EC2_URI}:/tmp/${APP_DIR}"
scp -i "${PATH_TO_CERTIFICATE}" package.json package-lock.json yarn.lock "${EC2_URI}:/tmp/${APP_DIR}"

ssh -i "${PATH_TO_CERTIFICATE}" "${EC2_URI}" "echo 'installing npm packages' && cd /tmp/${APP_DIR} && npm i --silent"
# For Ubuntu server with NVM:
#ssh -i "${PATH_TO_CERTIFICATE}" "${EC2_URI}" ". ~/.nvm/nvm.sh; echo 'installing npm packages' && cd /tmp/${APP_DIR} && npm i --silent"


# via ssh move files from tmp folder to /var/www so that it will not be accidentally removed. Clean up folder beforehand.
ssh -i "${PATH_TO_CERTIFICATE}" "${EC2_URI}" "pm2 stop all || echo 'nothing to stop.' && echo 'moving files' && sudo rm -rf /var/www/${APP_DIR} && sudo mkdir -p /var/www/${APP_DIR} && sudo unzip -o /tmp/${APP_DIR}/${APP_ZIP_FILE_NAME} -d /var/www/${APP_DIR} && sudo mv -f /tmp/${APP_DIR}/node_modules /var/www/${APP_DIR}/node_modules && sudo mv -f /tmp/${APP_DIR}/package.json /var/www/${APP_DIR}/package.json && cd /var/www/${APP_DIR}"

# For Ubuntu server with NVM:
#ssh -i "${PATH_TO_CERTIFICATE}" "${EC2_URI}" ". ~/.nvm/nvm.sh; sudo apt-get install unzip && pm2 stop all || echo 'nothing to stop.' && echo 'moving files' && sudo rm -rf /var/www/${APP_DIR}&& sudo mkdir -p /var/www/${APP_DIR} && sudo unzip -o /tmp/${APP_DIR}/${APP_ZIP_FILE_NAME} -d /var/www/${APP_DIR}/ && sudo mv -f /tmp/${APP_DIR}/node_modules /var/www/${APP_DIR}/node_modules && sudo mv -f /tmp/${APP_DIR}/package.json /var/www/${APP_DIR}/package.json && cd /var/www/${APP_DIR}"

# run app with pm2:
ssh -i "${PATH_TO_CERTIFICATE}" "${EC2_URI}" "pm2 delete all || echo 'nothing to delete' && export PORT=${PORT}; export NODE_ENV=${NODE_ENV}; pm2 start /var/www/${APP_DIR}/main.js -f -i 0"

# For Ubuntu server with NVM:
#ssh -i "${PATH_TO_CERTIFICATE}" "${EC2_URI}" ". ~/.nvm/nvm.sh; pm2 delete all || echo 'nothing to delete' && export PORT=${PORT}; export NODE_ENV=${NODE_ENV}; pm2 start /var/www/${APP_DIR}/main.js -f -i 0"

# Clean up
rm -rf ${APP_DIST_PATH}
