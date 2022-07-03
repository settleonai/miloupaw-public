#!/bin/bash
git pull
yarn build
pm2 start ecosystem.config.js --env production
pm2 logs miloupawWebServer --lines 100