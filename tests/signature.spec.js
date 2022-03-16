const request = require("supertest");
const app = require("../app");

describe('GET /signatures/{eventName}', () => {
  let event;
  beforeAll(async () => {
    //jest.setTimeout(30000);
    event = await request(app)
      .get('/events')
      .send({});
  });

  afterAll(async () => {
  });

  it('should get signatures for an event outcome', async () => {
    const res = await request(app)
      .get('/signatures/' + event.body[1])
      .send({});
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('signatures');
  });

});