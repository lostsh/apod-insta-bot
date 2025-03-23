# Nasa APOD Instagram Bot
[![Daily Publication](https://github.com/lostsh/apod-insta-bot/actions/workflows/daily-publication.yml/badge.svg)](https://github.com/lostsh/apod-insta-bot/actions/workflows/daily-publication.yml)

Script node to publish NASA APOD (Astronomy Picture Of the Day) on Instagram.

This repo contain an Action that run daily, (using cron task) to run the node script and publish the nasa picture on instagram.

## Run locally
```bash
node main $(cat ns-secret.txt) $(cat ig-secret.txt)
```

## TODO
Reels avec whisper pour avoir plus de reco
