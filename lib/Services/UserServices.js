const { getToken, getUser } = require("../utils/github");

module.exports = class UserServices {
    static async create(code) {
        const token = await getToken(code);

        const user = await getUser(token);
        
        return user;
    }
}
