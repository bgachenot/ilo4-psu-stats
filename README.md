# ILO4-PSU-STATS

## Why does this project exist?

I own a Proliant DL360p server, which provide a ILO4 interface. This interface provide a lot of information about the server, but some need an advanced licence, including the power meter.

This project is a REST API (powered by Express) built on top of the ILO4 API.

There is a cronjob gathering, every minute, the power taken by the server and sending it to a remote database.

With this data, it's easy estimate the daily/weekly/monthly/yearly electrical cost of the server.

Furthermore, I'm not confident at all about exposing the ILO4 interface to the world. This is a almighty interface, if someone get access to it, he may exfiltrate all the data from the server, or just destroy the RAID array.

This private API will be mainly used by a mobile application I own, allowing me to quickly see the estimated cost of the server, the status of the server: ON/OFF, power ON/OFF within a minute and so on.