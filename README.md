# domain-screen-nodejs
Nodejs version for screen shooting

### domain

http://domain-screen-nodejs.parkingomat.pl/
http://webscreen.pl:3000/png/softreck.com

### TODO

#### Projects

+ NODEJS
  win.nodejs.bashfunc.com
  linux.

letserv

https://github.com/nodejsfunc
+ nodejsfunc/server
  
+ CRON
+ QUEUE sqlite

#### Config

##### ENV - apicra
apicra chat pomoze w instalacji srodowiska do kazdego projektu
skanuje aktualne pliki i pyta co zrobic
w kontekscie konfiguracji package. / composer.

pytania?
    

+ nodejsfunc/server

+ QUEUE sqlite

+ NODEJS
    env update

+ CRON
    restart service each day

##### APP
each
    0:01

LOGS
    logs each day

logs/2021-05-21/url.log

EMAIL

ALERT
    + pobierz email i zrob codzienne/tygodniowe alerty


devalert.pl


### GIT Install

check if exist

    which git

Prepare linux
    
    sudo apt update

Install git

    sudo apt install -y git

check version

    git --version


### github
https://github.com/parkingomat/domain-screen-nodejs
https://github.com/parkingomat/domain-screen-nodejs.git

    git clone https://github.com/parkingomat/domain-screen-nodejs.git webscreen
    cd domain-screen-nodejs
    cd webscreen




### git update

    git stash
    git pull --rebase

## NODEJS Install 

Install the latest version of Node Js
 
    sudo apt install -y nodejs
    sudo apt install -y npm

## start project

    npm install

## Install Packages

To use Puppeteer in your project, run:


    npm i cors
    npm i path
    npm i express
    npm i puppeteer
    npm i path

    npm i puppeteer-core

## BROWSER

After the Nodejs installation, we need to create a new project folder and install Puppeteer, which comes with a recent version of Chromium. We can run the following command to install Puppeteer.

    npm install --save puppeteer

Install browser

    apt install -y chromium-browser

on Ubuntu     
    
    apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

## Start app

    node server.js
    node serv.js

    node app.js
    node png.js

    node pdf.js
    node .js


## URL

http://localhost:3000/create/softreck.com
http://localhost:3000/read/softreck.com

https://webscreen.pl:3000/create/softreck.com

https://webscreen.pl/create/softreck.com
https://webscreen.pl/png/softreck.com
http://webscreen.pl:3000/png/softreck.com
https://webscreen.plread/softreck.com



## DOMAIN

    sudo hostnamectl set-hostname webscreen

    hostnamectl set-hostname webscreen
    hostnamectl status

    hostname webscreen


Open your hosts file.

    sudo nano /etc/hosts

put line

    123.123.123.123	web1.gridscale.io web1

make sure to add the below code just before the ipv6 tables, 
and use the tab key to separate the localhost ip address(127.0.0.1) and the domain name
(*.com).


check

    reboot

    hostname –f


## remove

Using the -S flag, or --save, this operation will also remove the reference in the package.json file.

If the package was a development dependency, listed in the devDependencies of the package.json file, you must use the -D / --save-dev flag to remove it from the file:

    npm uninstall -S puppeteer
    npm uninstall -D puppeteer

---

http://webscreen.pl:3000/png/*

    sh status.sh

    sh stop.sh

## START

    node url.js


## background

    nohup node png.js &

OR
    
    nohup node png.js >> png.log 2>&1 &
    
    nohup node url.js >> url.log 2>&1 &


## PORT 80

sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000


## LINUX 

    apt list --upgradable -a

    apt upgrade -y chromium-browser
