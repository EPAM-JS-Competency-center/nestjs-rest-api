npm install pm2 -g

pm2 stop all

cd /home/ec2-user/express-app

pm2 start npm -- run start:prod
