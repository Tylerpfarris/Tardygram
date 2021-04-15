const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Tardygram routes', () => {
  beforeEach(() => {
    return setup(pool);
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
      userName: 'thatUser',
      photoUrl: 'some.image.url',
      caption: 'look at this amazing image',
      tags: ['image', 'great', 'image', 'hashtag CRUD']
    });
  });
});
