const pool = require("../utils/pool");

module.exports = class Post {
	userName;
	photoUrl;
	caption;
	tags;

	constructor(row) {
		const { post_by, photo_url, caption, tags } = row;
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
}