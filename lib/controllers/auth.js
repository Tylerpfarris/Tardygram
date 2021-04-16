const { Router } = require("express");
const UserServices = require('../Services/UserServices');
const ensureAuth = require('../middleware/ensureAuth');
const {sign} = require('../utils/jwt');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;


module.exports = Router()
    .get('/login', (req, res) => {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scopes=read:user`)
    })

    .get('/login/callback', (req, res, next) => {
        UserServices.create(req.query.code)
            .then((user) => {
                res.cookie('session', sign(user), {
                    httpOnly: true,
                    maxAge: ONE_DAY_IN_MS,
                    sameSite: 'strict'
                })
                res.redirect('/');
            })
            .catch(next);
    })
    
    .get('/verify', ensureAuth, (req, res, next) => {
        res.send(req.user)
    });

