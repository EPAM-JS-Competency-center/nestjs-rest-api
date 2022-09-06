#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/express-app

cd /home/ec2-user/express-app || return

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"                   # loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # loads nvm bash_completion (node is in path now)

npm install -g pm2

pm2 stop all

npm install

# Use AWS Secrets service for setting env variables in prod;
export REGION=eu-central-1
export TABLE_AUTOCREATE=true
export TABLE_AUTOUPDATE=true
export DEVELOPMENT=false
export APP_NAME=Shop

echo "Start building"

npm build

echo "End building"

pm2 start npm -- run start:prod --name api
