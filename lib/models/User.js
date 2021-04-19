
const pool = require("../utils/pool");


module.exports = class User {
    userName;
    avatarUrl;

    constructor(row) {
        this.userName = row.github_user_name;
        this.avatarUrl = row.github_avatar_url;
    }

    static async insert({ userName, avatarUrl }) {
        
        const {
            rows
        } = await pool.query(`
        INSERT INTO users
        (github_user_name, github_avatar_url) VALUES ($1, $2)
        RETURNING *
        `, [userName, avatarUrl])
        
        return new User(rows[0]);
    };

    static async findByUserName({ userName }) {
        const { rows } = await pool.query(`SELECT FROM users WHERE github_user_name=$1`, [userName]);

        return rows;
    }
    
    static async updatePhoto({ userName, photoUrl }) {
        const { rows } = await pool.query(`
        UPDATE users
        SET
        github_avatar_url = $1
        WHERE github_user_name = $2
        RETURNING *
        `, [photoUrl, userName]);

        return new User(rows[0]);
    }


	static async getPopularUsers() {
        const { rows } = await pool.query(`
        SELECT users.*,
        COUNT(*)
        from users
        INNER JOIN posts
        ON users.github_user_name = posts.post_by
        INNER JOIN comments
        ON posts.id = comments.post_id
        GROUP BY users.github_user_name
        ORDER BY COUNT DESC
        LIMIT 10
        `);
        // console.log(rows)
        return rows.map(row => new User(row))
	}
        
}