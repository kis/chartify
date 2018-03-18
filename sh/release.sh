git commit -m "release 3.0.0"
git tag "3.0.0" -m "release 3.0.0"
git push --tags origin HEAD:master
npm publish
