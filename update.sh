#!/bin/bash
echo "I will update the nodejs application ..."
npm --version
npm i npm@latest -g
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
