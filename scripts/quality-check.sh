#!/bin/bash

ESLINT_CHECK="ESlint check"
TEST_COV_CHECK="Test coverage check"
AUDIT_CHECK="Dependencies audit check"
SONAR_CHECK="Sonar code check"

checkStatus() {
  if [ $? -eq 0 ]
  then
    echo "----> SUCCESS - $1 <----"
  else
    echo "----> FAIL - $1  <----"
    exit 0
  fi
}

echo "---------------! Start running code quality analysis tools !---------------"

echo "----> running $ESLINT_CHECK <----"
npm run eslint
checkStatus "$ESLINT_CHECK"

echo "----> running $TEST_COV_CHECK <----"
npm run test:cov
checkStatus "$TEST_COV_CHECK"

echo "----> running $AUDIT_CHECK <----"
npm run audit
checkStatus "$AUDIT_CHECK"

echo "----> running $SONAR_CHECK <----"
npm run sonar
checkStatus "$SONAR_CHECK"

echo "-------! Running code quality analysis tools completed successfully !-------"
