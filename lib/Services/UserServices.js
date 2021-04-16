const { getToken, getUser } = require("../utils/github");
const User = require('../models/User');

module.exports = class UserServices {
    static async create(code) {
        const token = await getToken(code);
        const user = await getUser(token);
        
        User.findByUserName(user)
            .then(result => {
                if (result.length < 1) {
                   return User.insert(user);
                }
                 else {
                     return User.updatePhoto(user);
                 }
            })
            .then(console.log);
        }
}