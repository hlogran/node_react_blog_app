const request = require('supertest');
const app = require('../src/app');
const Article = require('../src/models/article');
const {
  articleOne,
  articleTwo,
  authorOneId,
  authorTwoId,
  authorThreeId,
  setupDatabase
} = require('./fixtures/db');

jest.setTimeout(30000);

beforeEach(setupDatabase);

test('Can list articles', async ()=>{
  const response = await request(app).get('/articles')
    .send()
    .expect(200);
  expect(response.body.length).toBe(3);
})

test('Can search articles by title', async ()=>{
  const response = await request(app).get('/articles')
    .send()
    .query({title: 'econd'})
    .expect(200);
  expect(response.body.length).toBe(1);
  expect(response.body[0]._id.toString()).toBe(articleTwo._id.toString());
})

test('Can search articles by author', async ()=>{
  const response = await request(app).get('/articles')
    .send()
    .query({authors: [authorTwoId.toString(), authorThreeId.toString()]})
    .expect(200);
  expect(response.body.length).toBe(2);
})

test('Can create article', async()=>{
  const response = await request(app).post('/articles')
    .send({
      title: 'my test article',
      short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      authors: [authorOneId, authorTwoId]
    })
    .expect(201);
  const articleId = response.body._id;
  const article = await Article.findById(articleId);
  expect(article).not.toBeNull();
});

test('Can update article', async()=>{
  const NEW_TITLE = 'UPDATED TITLE';
  await request(app).patch('/articles/' + articleOne._id.toString())
    .send({title: NEW_TITLE})
    .expect(200);
  const article = await Article.findById(articleOne._id.toString());
  expect(article.title).toBe(NEW_TITLE);
});


test('User can delete article', async()=>{
  await request(app).delete('/articles/' + articleOne._id.toString())
    .expect(200);
  const response = await request(app).get('/articles')
    .send()
    .expect(200);
  expect(response.body.length).toBe(2);
});