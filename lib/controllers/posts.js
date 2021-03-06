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
			.catch(next);
	})
	.get('/popular', (req, res, next) => {
		Post.getPopularPosts()
			.then(posts => res.send(posts))
			.catch(next);
	})
	.get('/:id', (req, res, next) => {
		Post.getById(req.params.id)
			.then(userPost => res.send(userPost))
			.catch(next);
	})
	.patch('/:id', ensureAuth, (req, res, next) => {
		Post.update(req.params.id, {
			...req.body,
			userName: req.user.userName})
			.then(userPost => res.send(userPost))
			.catch(next);
	})
	.delete('/:id', ensureAuth, (req,res,next) => {
		Post.delete(req.params.id, req.user.userName)
			.then(userPost => res.send(userPost))
			.catch(next);
	})
