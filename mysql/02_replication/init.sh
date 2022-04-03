#!/usr/bin/env bash

# build master image
docker build -t db-master ./master/

# run docker-compose
#docker-compose -f ./master/docker-compose.yaml up -d

# build slave image
docker build -t db-slave ./slave/

docker-compose -f ./docker-compose.yaml up
