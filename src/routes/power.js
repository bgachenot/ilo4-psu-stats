import { Router } from 'express';
import { agent, cookies } from '../middlewares/authentication.js';
import fetch from 'node-fetch';

var router = Router();

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

export async function getPowerSummary() {
    const headers = {
        cookie: cookies,
    };
    const options = {
        agent,
        headers,
    }
    const response = await fetch(`https://${process.env.ILO4_IP}/json/power_summary`, options);
    if (response.status != 200) {
        return {status: 'failed'};
    }
    const data = await response.json();
    return {status: 'success', data: data};        
}

export async function getPowerCapabilities() {
    const headers = {
        cookie: cookies,
    };
    const options = {
        agent,
        headers,
    }
    const response = await fetch(`https://${process.env.ILO4_IP}/json/power_capabilities`, options);
    if (response.status != 200) {
        return {status: 'failed'};
    }
    const data = await response.json();
    return {status: 'success', data: data};        
}

router.get('/getPowerReadings', async (req, res) => {
    const data = await getPowerReadings();
    if (data.status == 'success') {
        return res.json(data);
    }
    return res.json(data);
});

router.get('/pressPowerButton', async (req, res) => {
    const data = await pressPowerButton();
    if (data.status == 'success') {
        return res.json(data);
    }
    return res.json(data);
});

router.get('/getPowerStatus', async (req, res) => {
    const data = await getPowerStatus();
    if (data.status == 'success') {
        return res.json(data);
    }
    return res.json(data);
});

router.get('/getPowerSummary', async (req, res) => {
    const data = await getPowerSummary();
    if (data.status == 'success') {
        return res.json(data);
    }
    return res.json(data);
});

router.get('/getPowerCapabilities', async (req, res) => {
    const data = await getPowerCapabilities();
    if (data.status == 'success') {
        return res.json(data);
    }
    return res.json(data);
});

export default router;