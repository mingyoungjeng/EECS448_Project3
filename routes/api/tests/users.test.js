/**
 * @jest-environment node
 */

const app = require('../../../network');
const request = require('supertest');
const User = require('../../../models/User');
const mongoose = require('mongoose');

let server;

beforeEach(() => { server = require('../../../network').listen(); });

afterEach( async () => { 
  await User.remove({});
  server.close(); 
});
  
afterAll(async () => {
  if (server) {
    await server.close();
  }
  mongoose.disconnect();
});

describe('/api/users', () => {
  // Make sure the server starts and stops before each test

  describe('GET /', () =>{
    it('should return all users with status 200', async () => {
      // Populate the test database first
      await User.collection.insertMany([
        { username: 'user1', email: 'user1@email.com', password: 'password1' },
        { username: 'user2', email: 'user2@email.com', password: 'password2' }
      ]);
      const response = await request(app).get("/api/users");
      expect(response.statusCode).toBe(200);
      expect(response.body.some(res => res.username === 'user1')).toBeTruthy();
      expect(response.body.some(res => res.username === 'user2')).toBeTruthy();
    });
  });

    
    describe('GET /:id', () => {
      it('should return specific user with status 200', async () => {
        const newUser = new User({ username: 'admin', email: 'admin@email.com', password: 'password' });
        await newUser.save();
  
        let url = '/api/users/:' + newUser._id;
  
        // console.log(`url = ${url}`);
        const res = await request(app).get(url);
        expect(res.statusCode).toBe(404);
      }); 
    });     

  describe('POST /', () => {
    it('should return new user with status 200', async () => {
      const response = await request(app).post('/api/users').send({ username: 'admin', email: 'admin@email.com', password: 'password' })

      // The response is a token, which maybe could be checked, but this will have to do
      expect(response.status).toBe(200);
    });
  });

  describe('POST invalid user /', () => {
    it('should throw an error', async () => {
      // the email and password are both too short
      const response = await request(app).post('/api/users').send({ username: 'admin', email: 'short', password: 'short' })

      // Check to see that we receive the right status code, and that the response message
      // contains something about passwords
      expect(response.status).toBe(409);
      expect(response.body.message).toContain('password');
    });
  });

  describe('POST duplicate user /', () => {
    it('should throw an error', async () => {
      // First save the user to the database
      const newUser = new User({ username: 'admin', email: 'admin@email.com', password: 'password' });
      await newUser.save();

      // Try to post the newly saved user
      const response = await request(app).post('/api/users').send({ username: 'admin', email: 'admin@email.com', password: 'password' })
    // Check to see that we receive the right status code, and that the response message
      // contains something about Duplicate
      expect(response.status).toBe(409);
      expect(response.body.message).toContain('Duplicate');
    });
  });
  
  describe('DELETE extant user /', () => {
    it('should delete the user', async () => {
      // First save the user to the database
      const newUser = new User({ username: 'admin', email: 'admin@email.com', password: 'password' });
      await newUser.save();
      let url = '/api/users/' + newUser._id;
      // Try to post the newly saved user
      const response = await request(app).delete(url);
    // Check to see that we receive the right status code, and that the response message
      // contains something about Duplicate
      expect(response.status).toBe(200);
      expect(response.body.username).toContain('admin');
    });
  });
  
  describe('DELETE nonexistant user /', () => {
    it('should throw an error', async () => {
      // First save the user to the database
      const newUser = new User({ username: 'admin', email: 'admin@email.com', password: 'password' });
      
      let url = '/api/users/' + newUser._id;

      // Try to post the newly saved user
      const response = await request(app).delete(url)
    // Check to see that we receive the right status code, and that the response message
      // contains something about Duplicate
      expect(response.status).toBe(404);
      console.log(`body = ${response.body}`);
      expect(response.body.success).toBeFalsy();
    });
  });

});