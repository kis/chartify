git commit -m "release 3.6.0"
git tag "3.6.0" -m "release 3.6.0"
git push --tags origin HEAD:master
npm publish
