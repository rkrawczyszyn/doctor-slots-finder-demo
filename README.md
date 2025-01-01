scp -r C:\Examples\rpi-copy-folder\* rkrawczyszyn@192.168.100.18:/home/rkrawczyszyn/fetcher

crontab -e

* * * * * /usr/bin/node /home/rkrawczyszyn/demos/fetchSlots.js && /home/rkrawczyszyn/demos/gitUpdate.sh
0 * * * * /usr/bin/node /home/rkrawczyszyn/demos/fetchSlots.js && /home/rkrawczyszyn/demos/gitUpdate.sh
