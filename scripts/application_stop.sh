#!/bin/bash
echo "Stopping the app"

#pkill npm run start:prod

pm2 stop api || true
