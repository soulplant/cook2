#!/bin/bash

cd "$(dirname "$0")"

(
cd client
yarn build
)

rm -rf docs
mkdir docs

cp -r client/build/* docs
cp -r server/data docs
