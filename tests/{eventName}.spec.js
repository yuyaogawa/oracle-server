const request = require("supertest");
const app = require("../app");

describe('GET /events/{eventName}', () => {
  let event;
  beforeAll(async () => {
    //jest.setTimeout(30000);
    event = await request(app)
      .get('/events')
      .send({});
  });

  afterAll(async () => {
  });

  it('should return an error', async () => {
    const res = await request(app)
      .get('/events/' + 'hoge')
      .send({});
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      status: 'error',
      message: 'This event is not found.',
    });
  });

  it('should get event detail', async () => {
    const res = await request(app)
      .get('/events/' + event.body[0])
      .send({});
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nonces');
    expect(res.body).toHaveProperty('signedOutcome');
  });

});