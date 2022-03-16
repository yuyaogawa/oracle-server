const request = require("supertest");
const app = require("../app");

describe('GET /events', () => {
  beforeAll(async () => {
    //jest.setTimeout(30000);
  });

  afterAll(async () => {
  });

  it('should get event list', async () => {
    const res = await request(app)
      .get('/events')
      .send({});
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([]))
  });

});