git commit -m "release 2.0.5"
git tag "2.0.5" -m "release 2.0.5"
git push --tags origin HEAD:master
npm publish
