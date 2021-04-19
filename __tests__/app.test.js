const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');
const {makeNUsers, makeNPosts, makeNComments, completePackage} = require('../lib/utils/dataGen');
jest.mock('../lib/middleware/ensureAuth.js', () => (req, res, next) => {
  req.user = {
    userName: 'devon_wolf',
    avatarUrl: 'some.image.url'
  }
  next()
})

describe('Tardygram routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach( async () => {
    await User.insert({
      userName: 'devon_wolf',
      avatarUrl: 'some.image.url'
    })
  });

  beforeEach( async () => {
    await Post.insert({
      userName: 'devon_wolf',
      photoUrl: 'some.image.url',
      caption: 'look at this amazing image',
      tags: ['image', 'great', 'image', 'hashtag CRUD']
    });
  });

  beforeEach(async () => {
    await Comment.insert({
      postId: 1,
      comment: 'I DO NOT LIKE THIS',
      userName: 'devon_wolf'
    });
  })

  it('adds a new post', async () => {
    const response = await request(app)
      .post('/api/v1/posts')
      .send({
        photoUrl: 'some.image.url',
        caption: 'look at this amazing image',
        tags: ['image', 'great', 'image', 'hashtag CRUD']
      });

    expect(response.body).toEqual({
      id: 2,
      userName: 'devon_wolf',
      photoUrl: 'some.image.url',
      caption: 'look at this amazing image',
      tags: ['image', 'great', 'image', 'hashtag CRUD']
    });
  });

  it('gets all posts from a user', async () => {
    const response = await request(app)
      .get('/api/v1/posts')
    console.log(response.body)
    expect(response.body).toEqual([
      {
      id: 1,
      userName: 'devon_wolf',
      photoUrl: 'some.image.url',
      caption: 'look at this amazing image',
      tags: ['image', 'great', 'image', 'hashtag CRUD']
      }
    ])
  });

  it('gets a post by id', async () => {
    const response = await request(app)
      .get('/api/v1/posts/1');
    expect(response.body).toEqual({
      id: 1,
      userName: 'devon_wolf',
      photoUrl: 'some.image.url',
      caption: 'look at this amazing image',
      tags: ['image', 'great', 'image', 'hashtag CRUD']
    })
  });

  it('updates a post by id', async () => {
    const response = await request(app)
      .patch('/api/v1/posts/1')
      .send({
        caption: 'actually this is a fart',
        });
    expect(response.body).toEqual({
      id: 1,
      userName: 'devon_wolf',
      photoUrl: 'some.image.url',
      caption: 'actually this is a fart',
      tags: ['image', 'great', 'image', 'hashtag CRUD']
    })
  })

  it('deletes a post', async () => {
    const response = await request(app)
      .delete('/api/v1/posts/1')
    expect(response.body).toEqual({
      id: 1,
      userName: 'devon_wolf',
      photoUrl: 'some.image.url',
      caption: 'look at this amazing image',
      tags: ['image', 'great', 'image', 'hashtag CRUD']
    })
  })

  it('gets the 10 most popular posts', async () => {
    const response = await request(app)
      .get('/api/v1/posts/popular');

    expect(response.body).toEqual(expect.any(Array));
  })

  it('posts a comment', async () => {
    const response = await request(app)
      .post('/api/v1/comments')
      .send({
        postId: 1,
        comment: 'WHAT A GREAT POST'
      });

    expect(response.body).toEqual({
      id: 2,
      postId: 1,
      comment: 'WHAT A GREAT POST',
      userName: 'devon_wolf'
    });
  })

  it('deletes a comment by its ID', async () => {
    const response = await request(app)
      .delete('/api/v1/comments/1');

    expect(response.body).toEqual({
      id: 1,
      postId: 1,
      comment: 'I DO NOT LIKE THIS',
      userName: 'devon_wolf'
    });
  })

  it('gets the top 10 users with the most comments', async () => {
    await completePackage(11);

    const response = await request(app)
      .get('/api/v1/users/popular')
console.log(response.body)
    expect(response.body).toEqual(expect.any(Array));
  })
});
