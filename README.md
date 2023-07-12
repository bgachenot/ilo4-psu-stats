# ILO4-PSU-STATS

## Why does this project exist?

I own a Proliant DL360p server, which provide a ILO4 interface. This interface provide a lot of information about the server, but some need an advanced licence, including the power meter.

This project is a REST API (powered by Express) built on top of the ILO4 API.

There is a cronjob gathering, every minute, the power taken by the server and sending it to a remote database.

With this data, it's easy estimate the daily/weekly/monthly/yearly electrical cost of the server.

Furthermore, I'm not confident at all about exposing the ILO4 interface to the world. This is an almighty interface, if someone get access to it, he may exfiltrate all the data from the server, or just destroy the RAID array.

This private API will be mainly used by a mobile application I own, allowing me to quickly see the estimated cost of the server, the status of the server: ON/OFF, power ON/OFF within a minute and so on.

## How to use it?

### Requirements

- NodeJS
- NPM
- A server with ILO4 interface
- A remote database (MySQL, MariaDB, PostgreSQL, MongoDB, etc.) => I used MariaDB

### Installation

- Clone the repository
- Run `npm install`
- Copy the `.env.example` file to `.env` and fill it with your own values
- Run `npm start`


### Notes

This project has been done in a few hours, it's not perfect, but it does the job for me, that is to monitor the power usage reported by the ilo4 interface.
It's not meant to be used by anyone else, but if you want to use it, feel free to do so.

It fetches the power usage every 30s, and send it to the remote database. It also fetches the status of the server (on/off) every minute.