#!/usr/bin/env bash

#Run eslint
echo "Runining ESlint check..."
npm run lint
echo "Lint check finished"

#Run testing
echo "Runing tests ..."
npm run test:cov
echo "Test check finished"

#Run dependencies check
echo "Running dependencies check ..."
npm audit
echo "Dependencies check finished"

#Run static code analysis
echo "Runing static code analysis ..."
sonar-scanner
echo "Static code analysis finished"
