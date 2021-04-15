
const pool = require("../utils/pool");


module.exports = class User {
    userName;
    photoUrl;

    constructor(row) {
        this.userName = row.github_user_name;
        this.photoUrl = row.github_avatar_url;
    }

    static async insert({ userName, photoUrl }) {
        const {
            rows
        } = await pool.query(`
        INSERT INTO users
        (github_user_name, github_avatar_url) VALUES ($1, $2)
        RETURNING *
        `, [userName, photoUrl])
        return new User(rows[0]);
    };
    
}