#!/bin/sh
# Install Node Modules
docker-compose run --rm backend npm install
docker-compose run --rm frontend npm install
# Start Containers
docker-compose up -d
# Create .env file
cd backend
cat > .env << EOF
DATABASE_URL="postgresql://admin:pass@db:5432/flashcards?schema=public"

EOF
# Create tables and prisma client.
docker-compose run --rm backend npx prisma db push
docker-compose run --rm backend npx prisma generate
# Display containers logs
docker logs -f backend
