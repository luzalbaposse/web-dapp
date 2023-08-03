#!/bin/bash

LAST_COMMIT=$(git rev-parse HEAD)
FILES=$(git show --pretty="" --name-only $LAST_COMMIT | grep js)

if [ -z "$FILES" ]; then
    echo "No changes affecting tests"
    exit 0
else
    echo "Running tests for files:"
    echo $FILES
fi
