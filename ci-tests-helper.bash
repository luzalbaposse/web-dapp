#!/bin/bash

LAST_COMMIT=$(git rev-parse HEAD)
FILES=$(git show --pretty="" --name-only 08532ddda4dce1cca98dbb0e932cbca9aed51e56 | grep js)

if [ -z "$FILES" ]; then
    echo "No changes affecting tests"
    exit 0
else
    echo "Running tests for files:"
    echo $FILES
fi