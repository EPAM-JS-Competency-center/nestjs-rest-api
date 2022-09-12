#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/express-app

cd /home/ec2-user/express-app

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"                   # loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # loads nvm bash_completion (node is in path now)

npm install pm2 -g

npm install --legacy-peer-deps

# Use AWS Secrets service for setting env variables in prod;
file_location=./.env
cat >$file_location <<EOF
REGION="eu-central-1"
TABLE_AUTOCREATE="true"
TABLE_AUTOUPDATE="false"
DEVELOPMENT="false"
APP_NAME="Shop"
EOF

npm run build
