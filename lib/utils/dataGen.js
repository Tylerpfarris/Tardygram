const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require('../models/Comment');


const makeUser = (suffix) => {
	return {
		userName: `user${suffix}`,
		avatarUrl: `this.is.a.url`
	}
}

const seedUsers = async (usersArr) => {
    
    const seed = await Promise.all(usersArr.map(a => User.insert(a)));
}

const makeNUsers = async (n) => {
    let users = [];
    while (n > 0) {
        users.push(makeUser(n));
        n--;
    }
    await seedUsers(users);
}

const makePost = (postBy) => {
    return {
        userName: `${postBy}`,
        photoUrl: 'some.image.url',
        caption: 'look at this amazing image',
        tags: ['image', 'great', 'image', 'hashtag CRUD']
    }
}

const seedPosts = async (postArr) => {
    return await Promise.all(postArr.map(a => Post.insert(a)));
}

const makeNPosts = async (postBy, n) =>
{
    let posts = [];
    while (n > 0) {
        posts.push(makePost(postBy));
        n--;
    }
    return await (seedPosts(posts));    
}

const makeComment = (postId, userName) => {
    return {
        postId: postId,
        comment: 'I DO NOT LIKE THIS',
        userName: userName
    }
}

const seedComments = async (commentArr) => {
    return await Promise.all(commentArr.map(a => Comment.insert(a)));
}

const makeNComments = async (postId, userName, n)=> {
    let comments = [];
    while (n > 0) {
        comments.push(makeComment(postId, userName));
        n--;
    }
    await seedComments(comments);
}


// THE COMPLETE PACKAGE
const completePackage = async (userNumber) => {
    await makeNUsers(userNumber);
    const userNames = [];
    for(i = userNumber; i>0; i--) {
        userNames.push(`user${i}`);
    }

    await Promise.all(userNames.map(user => {
        const randomNumber = Math.ceil(Math.random() * 10)
        makeNPosts(user, randomNumber)
            .then((result => result.map(post => {
                makeNComments(post.id, user, randomNumber)
            })))
            .catch(err => console.log(err))
    }));
}

module.exports =
{
    makeNUsers,
    makeNPosts,
    makeNComments,
    completePackage
};
