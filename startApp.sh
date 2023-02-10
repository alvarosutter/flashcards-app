#!/bin/sh
# Install Node Modules
docker-compose run backend npm install
# Start Containers
docker-compose up -d
# Create tables and prisma client.
cd backend
echo "DATABASE_URL=\"postgresql://admin:pass@localhost:5432/flashcards?schema=public\"" > .env
npx prisma db push
npx prisma generate
# Display containers logs
docker logs -f backend
