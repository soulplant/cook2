#!/bin/bash

set -e

cd "$(dirname "$0")"

( cd client ; yarn && yarn build )

rm -rf pages
cp -r client/build pages
