const { getToken, getUser } = require("../utils/github");

module.exports = class UserServices {
    static async create(code) {
        const token = getToken(code);

        const user = getUser(token);
        
        return user;
    }
}
