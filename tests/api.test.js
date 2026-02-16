const request = require('supertest');
const app = require('../server'); // Import the Express app

describe('Books API', () => {

  // Test GET /api/books
  it('GET /api/books should return all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test GET /api/books/:id
  it('GET /api/books/:id should return a single book', async () => {
    const res = await request(app).get('/api/books/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Dune');
  });

  it('GET /api/books/:id should return 404 for invalid ID', async () => {
    const res = await request(app).get('/api/books/999');
    expect(res.statusCode).toEqual(404);
  });

  // Test POST /api/books
  it('POST /api/books should add a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({ title: 'New Book', author: 'Author', available: true });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('New Book');
  });

  // Test PUT /api/books/:id
  it('PUT /api/books/:id should update a book', async () => {
    const res = await request(app)
      .put('/api/books/1')
      .send({ title: 'Updated Dune' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Updated Dune');
  });

  // Test DELETE /api/books/:id
  it('DELETE /api/books/:id should delete a book', async () => {
    const res = await request(app).delete('/api/books/2'); // Delete 1984
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', '1984');
  });

});
