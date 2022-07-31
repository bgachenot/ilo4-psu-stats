import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import https from 'https';
import { initScheduledJobs } from './scheduledFunctions.js';

const app = express();

const agent = new https.Agent({
    maxCachedSessions: 0,
    rejectUnauthorized: false,
});

var cookies = [];

async function isAuthenticated() {
    const headers = {
        cookie: cookies,
    };
    const options = {
        agent,
        headers,
    }
    const response = await fetch(`https://${process.env.ILO4_IP}/json/session_info`, options);
    const data = await response.json();
    if ('message' in data && data['message'] == 'JS_ERR_LOST_SESSION') {
        return false;
    }
    return true;
}

async function loginToILO() {
    console.log('Logging in to ILO...');
    const options = {
        agent,
        method: 'POST',
        body: JSON.stringify({method: 'login', user_login: process.env.ILO4_USERNAME, password: process.env.ILO4_PASSWORD})
    }
    const response = await fetch(`https://${process.env.ILO4_IP}/json/login_session`, options);
    const data = await response.json();
    if (response.status !== 200) {
        console.log('Error logging in to ILO');
        return false;
    }
    cookies = response.headers.raw()['set-cookie'];
}

export async function refreshAuthenticationCookiesIfNeeded() {
    var connectionStatus = await isAuthenticated();
    if (! connectionStatus) {
        console.log('Not authenticated, logging in...');
        var loginStatus = await loginToILO();
        if (loginStatus == false) {
            return false;
        }
    }
    return true;
}

export async function getPowerReadings() {
    const headers = {
        cookie: cookies,
    };
    const options = {
        agent,
        headers,
    }
    const response = await fetch(`https://${process.env.ILO4_IP}/json/power_readings`, options);
    if (response.status != 200) {
        return {status: 'failed'};
    }
    const data = await response.json();
    return {status: 'success', data: data};
}

export async function getPowerStatus() {
    const headers = {
        cookie: cookies,
    };
    const options = {
        agent,
        headers,
    }
    const response = await fetch(`https://${process.env.ILO4_IP}/json/host_power`, options);
    if (response.status != 200) {
        return {status: 'failed'};
    }
    const data = await response.json();
    return {status: 'success', data: data};        
}

async function pressPowerButton() {
    var sessionKey = cookies.at(0).toString().split(';')[0].split('=')[1];
    const headers = {
        cookie: cookies,
    };
    const options = {
        agent,
        headers,
        method: 'POST',
        body: JSON.stringify({method: 'press_power_button', session_key: sessionKey})
    }
    
    const response = await fetch(`https://${process.env.ILO4_IP}/json/host_power`, options);

    if (response.status == 200) {
        return {status: 'success'};
    }
    return {status: 'failed'};
}

app.get('/', async (req, res) => {
    res.send('Hello World!');
});

app.use(async function (req, res, next) {
    var status = await refreshAuthenticationCookiesIfNeeded();
    if (status == false) {
        return res.json({status: 'failed', message: 'Failed to authenticate'});
    }
    next();
});

app.get('/getPowerReadings', async (req, res) => {
    const data = await getPowerReadings();
    if (data.status == 'success') {
        return res.json(data);
    }
    return res.json(data);
});

app.get('/pressPowerButton', async (req, res) => {
    const data = await pressPowerButton();
    if (data.status == 'success') {
        return res.json(data);
    }
    return res.json(data);
});

app.get('/getPowerStatus', async (req, res) => {
    const data = await getPowerStatus();
    if (data.status == 'success') {
        return res.json(data);
    }
    return res.json(data);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

initScheduledJobs();