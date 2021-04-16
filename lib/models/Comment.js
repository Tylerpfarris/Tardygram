const pool = require('../utils/pool');

module.exports = class Comment {
	id;
	postId;
	comment;
	userName;

	constructor(row) {
		const { id, post_id, comment, comment_by} = row;
		this.id = id;
		this.postId = post_id;
		this.comment = comment;
		this.userName = comment_by;
	}

	static async insert({ postId, comment, userName }) {
		const { rows } = await pool.query(`
		INSERT INTO comments
		(post_id, comment, comment_by)
		VALUES ($1, $2, $3)
		RETURNING *`,
		[
			postId,
			comment,
			userName
		]);

		return new Comment(rows[0]);
	}
}