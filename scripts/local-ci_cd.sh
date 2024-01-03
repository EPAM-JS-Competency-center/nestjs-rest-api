yarn test && yarn check-deps && yarn lint;
 if [ $? -eq 1 ]; then # if script succeeded
     echo "\n---== Code quality check failed ==---\n";
 else
    cd /Users/Mikhail_Proshin/work/nestjs-rest-api;
    yarn build;
    ssh ubuntu@13.53.61.166 'sudo rm -rf /home/ubuntu/nestjs-rest-api'
    scp -r /Users/Mikhail_Proshin/work/nestjs-rest-api ubuntu@13.53.61.166:/home/ubuntu;
    ssh ubuntu@13.53.61.166 'cd /home/ubuntu/nestjs-rest-api;npm run buld;pm2 delete main';
    ssh ubuntu@13.53.61.166 'pm2 start ./nestjs-rest-api/dist/main.js';
fi