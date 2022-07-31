import fetch from 'node-fetch';
import https from 'https';

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

async function refreshAuthenticationCookiesIfNeeded() {
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

var authenticationMiddleware = async function (_req, res, next) {
    var status = await refreshAuthenticationCookiesIfNeeded();
    if (status == false) {
        return res.json({status: 'failed', message: 'Failed to authenticate'});
    }
    next();
};

export default authenticationMiddleware;
export { refreshAuthenticationCookiesIfNeeded };
export { agent, cookies };