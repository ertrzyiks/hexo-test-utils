#!/bin/bash

BASE_DIR=`pwd`
OUTPUT_FOLDER="$BASE_DIR/dist"

# Clean
rm -fr $OUTPUT_FOLDER

# Compile
npx babel lib --out-dir $OUTPUT_FOLDER

# Copy required files
cp package.json $OUTPUT_FOLDER
cp package-lock.json $OUTPUT_FOLDER
cp README.md $OUTPUT_FOLDER
cp LICENSE $OUTPUT_FOLDER
cp -r lib/fixtures $OUTPUT_FOLDER/fixtures
