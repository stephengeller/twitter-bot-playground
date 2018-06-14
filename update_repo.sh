#!/bin/bash

git pull --rebase

echo "updating api"
cd api
pwd
npm i -s


echo "updating bot"
cd ../bot
pwd
npm i -s
