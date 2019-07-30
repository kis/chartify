# http://www.damian.oquanta.info/posts/one-line-deployment-of-your-site-to-gh-pages.html
## deprecated after using firebase hosting

git checkout -b gh-pages
git commit -am "init"
git push origin gh-pages
git checkout master
git push origin `git subtree split --prefix example gh-pages`:gh-pages --force

# every push

git subtree push --prefix example origin gh-pages