#!/bin/bash

set -e

cd "$(dirname "$0")"

./build.sh

npx gh-pages -d pages
