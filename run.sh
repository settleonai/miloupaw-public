#!/bin/bash
git pull
pm2 start ecosystem.config.js --env production
pm2 logs miloupawServer --lines 100