const Post = require("../models/Post");
const User = require("../models/User");

const makeUser = (suffix) => {
	return {
		userName: `user${suffix}`,
		avatarUrl: `this.is.a.url`
	}
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
    await (seedPosts(posts));
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

module.exports =
{
    makeNUsers,
    makeNPosts
};
