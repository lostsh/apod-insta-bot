#!/bin/bash
docker build -t apod-insta-bot-test .
docker run --rm -it apod-insta-bot-test
docker image rm apod-insta-bot-test