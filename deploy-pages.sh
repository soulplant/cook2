#!/bin/bash

cd "$(dirname "$0")"

( cd client ; yarn build )

rm -rf pages
cp -r client/build pages
cp -r server/data pages/data

npx gh-pages -d pages
