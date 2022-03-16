const request = require("supertest");
const app = require("../app");

describe('GET /info', () => {
  beforeAll(async () => {
    //jest.setTimeout(30000);
  });

  afterAll(async () => {
  });

  it('should get oracle public key', async () => {
    const res = await request(app)
      .get('/info')
      .send({});
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('pubkey');
  });

});