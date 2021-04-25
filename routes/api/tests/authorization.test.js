/**
 * @jest-environment node
 */


const app = require('../../../network');
const request = require('supertest');
const User = require('../../../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
 
let server;
const tempUser = {
    username: "partyguy",
    email: "goodtimes@email.com",
    password: '12345678cantcrackthis'
};
 
beforeEach( async () => { 
    server = require('../../../network').listen();
    // Create a user in the database so that we have something to compare against
    
    });

afterEach( async () => { 
   await User.remove({});
   server.close(); 
});
   
afterAll(async () => {
   if (server) {
     await server.close();
   }
   await User.remove({});
   mongoose.disconnect();
});
 
describe('/api/authorization', () => {
   // Make sure the server starts and stops before each test
 
    describe('POST /', () =>{
        it('should log user in', async () => {
            const user = new User({
                username: "partyguy",
                email: "goodtimes@email.com",
                password: '12345678cantcrackthis'
            });
            await bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;})
            .catch(error => console.log(error));
            await user.save();
            // await request(app).post('api/users').send(tempUser);

            const response = await request(app).post('/api/authorization').send({
                username: "partyguy",
                email: "goodtimes@email.com",
                password: '12345678cantcrackthis'
            });
            expect(response.status).toBe(200);
        });

    });
    
    describe('POST /', () =>{
        it('should deny user with invalid password', async () => {
            const user = new User({
                username: "partyguy",
                email: "goodtimes@email.com",
                password: '12345678cantcrackthis'
            });
            await bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;})
            .catch(error => console.log(error));
            await user.save();
            // await request(app).post('api/users').send(tempUser);

            const response = await request(app).post('/api/authorization').send({
                username: "partyguy",
                email: "goodtimes@email.com",
                password: 'igotitbro!'
            });
            expect(response.status).toBe(401);
        });
    });
    
    describe('POST /', () =>{
        it('should deny user with invalid username', async () => {
            const user = new User({
                username: "partyguy",
                email: "goodtimes@email.com",
                password: '12345678cantcrackthis'
            });
            await bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;})
            .catch(error => console.log(error));
            await user.save();
            // await request(app).post('api/users').send(tempUser);

            const response = await request(app).post('/api/authorization').send({
                username: "partygirl",
                email: "badtimes@email.com",
                password: '12345678cantcrackthis'
            });
            expect(response.status).toBe(401);
        });
    });
    
    describe('POST /', () =>{
        it('should deny user without email and passord entered', async () => {
            const user = new User({
                username: "partyguy",
                email: "goodtimes@email.com",
                password: '12345678cantcrackthis'
            });
            await bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;})
            .catch(error => console.log(error));
            await user.save();
            // await request(app).post('api/users').send(tempUser);

            const response = await request(app).post('/api/authorization').send({
                password: '12345678cantcrackthis'
            });
            expect(response.status).toBe(400);
        });
    });
    
    describe('POST /', () =>{
        it('should authorize user with only email', async () => {
            const user = new User({
                username: "partyguy",
                email: "goodtimes@email.com",
                password: '12345678cantcrackthis'
            });
            await bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;})
            .catch(error => console.log(error));
            await user.save();
            // await request(app).post('api/users').send(tempUser);

            const response = await request(app).post('/api/authorization').send({
                email: "goodtimes@email.com",
                password: '12345678cantcrackthis'
            });
            expect(response.status).toBe(200);
        });
    });
    
    describe('POST /', () =>{
        it('should authorize user with only username', async () => {
            const user = new User({
                username: "partyguy",
                email: "goodtimes@email.com",
                password: '12345678cantcrackthis'
            }); 
            await bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;})
            .catch(error => console.log(error));
            await user.save();
            // await request(app).post('api/users').send(tempUser);

            const response = await request(app).post('/api/authorization').send({
                username: "partyguy",
                password: '12345678cantcrackthis'
            });
            expect(response.status).toBe(200);
        });
    });


});