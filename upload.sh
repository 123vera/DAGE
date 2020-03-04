#!/usr/bin/env bash

cd deploy/dgc-front
git remote -v
git checkout $1
git pull
rm -r dist
ls | grep -v -E ".git|.gitignore" | xargs rm -rf

cd ../../
yarn build
cp -r dist/* deploy/xhs-front

cd  deploy/xhs-front
git remote -v
git add .
git commit -m $1
git push

cd ../../
shsh
