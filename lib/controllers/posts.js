const { Router } = require('express');
const Post = require('../models/Post');
const ensureAuth = require('../middleware/ensureAuth');

// needs to be updated to reflect auth/req.user
module.exports = Router() 
	.post('/', ensureAuth, (req, res, next) => {
		Post.insert({
			...req.body,
			userName: req.user.userName
		})
		.then(post => res.send(post))
		.catch(next);
	})
	.get('/', (req, res, next) => {
		Post.getAllUserPosts('devon_wolf')
			.then(userPost => res.send(userPost))
				.catch(next)
	})