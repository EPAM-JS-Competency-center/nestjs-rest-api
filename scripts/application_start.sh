~/.nvm/versions/node/v16.17.0/bin/pm2 stop all

cd /home/ec2-user/express-app

~/.nvm/versions/node/v16.17.0/bin/pm2 start npm -- run start:prod
