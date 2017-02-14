#!/bin/sh
npm run build
rimraf node_modules
npm install --quiet
