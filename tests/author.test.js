const request = require('supertest');
const app = require('../src/app');
const author = require('../src/models/author');
const { authorOneId, authorOne, setupDatabase } = require('./fixtures/db');

jest.setTimeout(30000);

beforeEach(setupDatabase);

test('can retrieve list of authors', async ()=>{
  const response = await request(app)
    .get('/authors')
    .send()
    .expect(200);

  expect(response.body.length).toBe(3);
});

test('can create author', async ()=>{
  await request(app).post('/authors').send({
    name: 'Leonardo'
  }).expect(201);

  const response = await request(app)
    .get('/authors')
    .send()
    .expect(200);

  expect(response.body.length).toBe(4);
});