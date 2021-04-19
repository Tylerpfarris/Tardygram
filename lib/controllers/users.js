const { Router } = require("express");
const ensureAuth = require("../middleware/ensureAuth");
const User = require("../models/User");


module.exports = Router()
    .get('/popular', ensureAuth, (req, res, next) => {
        User.getPopularUsers()
            .then(users => res.send(users))
            .catch(next);
    })