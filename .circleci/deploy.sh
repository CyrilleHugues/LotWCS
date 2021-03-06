!/bin/#!/usr/bin/env bash

 if [ $CIRCLE_BRANCH == $SOURCE_BRANCH ]; then
    git config --global user.email $GH_EMAIL
    git config --global user.name $GH_NAME

    git clone $CIRCLE_REPOSITORY_URL gh-pages

    cd gh-pages
    git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
    git rm -rf .
    cd ..

    npm run build

    cp -a build/. gh-pages/.

    mkdir -p gh-pages/.circleci && cp -a .circleci/. gh-pages/.circleci/.
    cd gh-pages

    git add -A
    git commit -m "Automated deployment to GitHub Pages: ${CIRCLE_SHA1}" --allow-empty

    git push origin $TARGET_BRANCH
  fi
