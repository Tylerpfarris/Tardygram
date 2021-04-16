const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');

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
    })
  });

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
    
    expect(response.body).toEqual([{
      id: 1,
      userName: 'devon_wolf',
      photoUrl: 'some.image.url',
      caption: 'look at this amazing image',
      tags: ['image', 'great', 'image', 'hashtag CRUD']
    }])
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
      .put('/api/v1/posts/1')
      .send({
        photoUrl: 'some.image.url',
        caption: 'look at this amazing image',
        tags: ['image', 'great', 'image', 'hashtag CRUD', 'I like tarts', 'Air Bud is LYF']});
    expect(response.body).toEqual({
      id: 1,
      userName: 'devon_wolf',
      photoUrl: 'some.image.url',
      caption: 'look at this amazing image',
      tags: ['image', 'great', 'image', 'hashtag CRUD', 'I like tarts', 'Air Bud is LYF']
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

  it('posts a comment', async () => {
    const response = await request(app)
      .post('/api/v1/comments')
      .send({
        postId: 1,
        comment: 'WHAT A GREAT POST'
      });

    expect(response.body).toEqual({
      id: 1,
      postId: 1,
      comment: 'WHAT A GREAT POST',
      userName: 'devon_wolf'
    });
  })
});
