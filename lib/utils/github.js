const fetch = require('node-fetch');

const getToken = (code) => {
    return fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        })
    })
    .then((res) => res.json())
    .then(({access_token}) => access_token)
}

const getUser = (token) => {
    return fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then((res) => res.json())
    .then(({ login, avatar_url }) => ({
            userName: login,
            photoUrl: avatar_url,
        }));
}

module.exports = {getToken, getUser};
