../
export NODE_ENV=production
sudo yarn install
webpack
cp ./dist/index.js ./index.js
cd example
sudo yarn install
webpack