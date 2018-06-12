#!/bin/bash

git pull --rebase

cd api && npm i

cd ../bot && npm i
