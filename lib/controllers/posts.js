const { Router } = require('express');
const Post = require('../models/Post');

// needs to be updated to reflect auth/req.user
module.exports = Router() 
	.post('/', (req, res, next) => {
		Post.insert({
			...req.body
		})
		.then(post => res.send(post))
		.catch(next);
	})
	.get('/', (req, res, next) => {
		Post.getAllUserPosts('devon_wolf')
			.then(userPost => res.send(userPost))
				.catch(next)
	})