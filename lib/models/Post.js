const pool = require("../utils/pool");

module.exports = class Post {
	id;
	userName;
	photoUrl;
	caption;
	tags;

	constructor(row) {
		const { id, post_by, photo_url, caption, tags } = row;
		this.id = id;
		this.userName = post_by;
		this.photoUrl = photo_url;
		this.caption = caption;
		this.tags = tags;
	}

	static async insert({ userName, photoUrl, caption, tags }) {
		const { rows } = await pool.query(`
		INSERT INTO posts
		(post_by, photo_url, caption, tags)
		VALUES ($1, $2, $3, $4)
		RETURNING *
		`,
		[
			userName,
			photoUrl,
			caption,
			tags
		]);

		return new Post(rows[0]);
	}

	static async getAllUserPosts(userName) {
		const { rows } = await pool.query(`
		SELECT *
		from posts
		WHERE post_by=$1
		`, [userName]);
		return rows.map(row => new Post(row));
	}

	static async getPopularPosts() {
		const { rows } = await pool.query(`
		SELECT
			posts.*,
			COUNT(*)
		FROM posts
		INNER JOIN comments
		ON posts.id = comments.post_id
		GROUP BY posts.id
		ORDER BY count DESC
		LIMIT 10`);

		return rows.map(row => new Post(row));
	}


	static async getById(id) {
		const { rows } = await pool.query(`
		SELECT *
		from posts
		WHERE id=$1`, [id]);
		return new Post(rows[0]);
	}

	static async update(id, { caption, userName }) {
		const { rows } = await pool.query(`
		UPDATE posts
		SET caption=$1
		WHERE id=$2
		and post_by=$3
		RETURNING *
		`, [
			caption,
			id,
			userName])
		return new Post(rows[0]);
	}

	static async delete(id, userName) {
		const { rows } = await pool.query(`
		DELETE 
		from posts
		WHERE id=$1
		and post_by=$2
		RETURNING *
		`, [id, userName]);
		
		return new Post(rows[0]); 
	}
}
