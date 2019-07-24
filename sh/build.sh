../
export NODE_ENV=production
sudo yarn install
webpack
cp ./dist/index.js ./example/index.js
cd example
sudo yarn install
webpack