#!/bin/sh
# Install Node Modules
docker-compose run backend npm install
# Start Containers
docker-compose up
