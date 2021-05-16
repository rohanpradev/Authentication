import request from 'supertest';
import app from '../../../app';

it('fails when an email that does not exists is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: '12345' })
    .expect(401);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '12345' })
    .expect(201);
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: '1234' })
    .expect(401);
});

it('responds with a cookie when valid credentials are given', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '12345' })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: '12345' })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
