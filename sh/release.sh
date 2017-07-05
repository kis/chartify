git commit -m "release 2.1.0"
git tag "2.1.0" -m "release 2.1.0"
git push --tags origin HEAD:master
npm publish
