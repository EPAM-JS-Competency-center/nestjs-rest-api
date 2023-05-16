#!/bin/sh

appName=zoysanna/nestapi

hash=$(git rev-parse --short=5 HEAD)

echo 'Building app version' $appName:$hash
docker image build -t $appName:$hash .
docker image tag $appName:$hash $appName:latest
docker image push $appName:$hash
docker image push $appName:latest
