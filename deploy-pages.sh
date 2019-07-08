#!/bin/bash

set -e

cd "$(dirname "$0")"

( cd client ; yarn build )

rm -rf pages
cp -r client/build pages

npx gh-pages -d pages
