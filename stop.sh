echo "I will stop the nodejs application ..."
#To kill node Processes on port 3000
sudo kill -9 $(sudo lsof -t -i:3000)
#To kill all PHP Processes
kill $(ps aux | grep '[p]hp' | awk '{print $2}')
#To kill all Nginx Processes
kill $(ps aux | grep '[n]ginx' | awk '{print $2}')
#To kill all MySQL Processes
kill $(ps aux | grep '[m]ysql' | awk '{print $2}')
