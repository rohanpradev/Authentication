import request from 'supertest';
import app from '../../../app';

it('returns a successful 201 on signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
});

it('returns a 400 with an invalid email on signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test', password: 'password' })
    .expect(400);
});

it('returns a 400 with an invalid password on signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '1' })
    .expect(400);
});

it('returns a 400 with missing email and password on signup', async () => {
  await request(app).post('/api/users/signup').send({ email: 'test@test.com' }).expect(400);
  await request(app).post('/api/users/signup').send({ password: '12345' }).expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '12345' })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '12345' })
    .expect(400);
});

it('sets a cookie after a successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '12345' })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
