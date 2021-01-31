#!/bin/sh
environment=${ENVIRONMENT:-"local"}

echo "Adjust .env file for ${environment}"
echo "===================================="
cd /src/app &&
cp .env.local .env &&
rm .env.*

echo "Start server"
echo "===================================="
npm run start:prod
