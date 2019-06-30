#!/bin/bash

cd "$(dirname "$0")"

(
cd client
yarn build
)

rm -rf build-static
mkdir build-static

cp -r client/build/* build-static
cp -r server/data build-static
