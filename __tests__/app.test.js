const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');

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


  // needs to update to reflect auth routes
  it('adds a new post', async () => {
    const response = await request(app)
      .post('/api/v1/posts')
      .send({
        userName: 'devon_wolf',
        photoUrl: 'some.image.url',
        caption: 'look at this amazing image',
        tags: ['image', 'great', 'image', 'hashtag CRUD']
      });

    expect(response.body).toEqual({
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
      userName: 'devon_wolf',
      photoUrl: 'some.image.url',
      caption: 'look at this amazing image',
      tags: ['image', 'great', 'image', 'hashtag CRUD']
    }])
  });
});
