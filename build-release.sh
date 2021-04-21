#!/bin/bash
clear

echo "##############################################"
echo "# ReliableTXT - Build Release v$RELEASE_VERSION"
echo "##############################################"

GIT_RELEASE_VERSION=$(git describe --abbrev=0 --tags)
GIT_RELEASE_VERSION=$(echo $GIT_RELEASE_VERSION| cut -d'v' -f 2)

echo $RELEASE_VERSION
echo $GIT_RELEASE_VERSION

if [[ "$RELEASE_VERSION" == "$GIT_RELEASE_VERSION" ]]; then
    echo "Release version $RELEASE_VERSION already exists on git!"
else
    npm run build
    npm run docs
    # git add .
    # git commit -m "Release build v$RELEASE_VERSION"
    # git push
    # git tag -a v$RELEASE_VERSION -m "Release build v$RELEASE_VERSION"
    # git push --tags
    # npm publish
fi
