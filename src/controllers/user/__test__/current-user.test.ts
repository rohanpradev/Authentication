import request from 'supertest';
import app from '../../../app';

it('responds with the details of the current user', async () => {
  const cookie = await global.signin();
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .expect(200);
  expect(response.body.data.currentUser).not.toBeNull();
});
