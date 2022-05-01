#!/usr/bin/env bash

# build image
docker build -t example .

# run docker-compose
docker-compose -f ./docker-compose.yaml up
