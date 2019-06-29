#!/bin/bash

cd "$(dirname "$0")"

(
cd client
yarn build
)

cp -r client/build server/client

cd server

gcloud app deploy --project timely-list
