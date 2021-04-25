/**
 * @jest-environment node
 */

 const app = require('../../../network');
 const request = require('supertest');
 const History = require('../../../models/History');
 const User = require('../../../models/User');
 const mongoose = require('mongoose');
 
 let server;
 
 beforeEach(() => { server = require('../../../network').listen(); });
 
 afterEach( async () => { 
   await History.remove({});
   await User.remove({});
   server.close(); 
 });
   
 afterAll(async () => {
   if (server) {
     await server.close();
   }
   await History.remove({});
   await User.remove({});
   mongoose.disconnect();
 });
 
 describe('/api/history', () => {
   // Make sure the server starts and stops before each test
 
   describe('GET /', () =>{
     it('should return a user history with status 200', async () => {
        // Create user to hold histories, since histories are embedded in users as references
        const user = new User({
            _id: mongoose.Types.ObjectId("591f47d10d957323386f0c42"),
            username: "admin",
            email: 'admin@email.com',
            password: 'password'
        })

        // Add the user to the database
        await user.save();

        // Create history entries and write them to the database
        const hist1 = new History({
            condition: "silly"
        });

        const hist2 = new History({
            condition: "grumpy"
        });
        await hist1.save();
        await hist2.save();

        // Update the user's history to reference the created history entries
        await User.findByIdAndUpdate(
            user._id, 
            {
                $push: {
                    history: {
                        $each: [hist1, hist2]}}},
            { upsert: true },
            function(err, result) {
                // console.log(result);
                if (err) {
                    console.log(err);
                } 
            });
        
        
        // Retrieve all history entries from the database
        const response = await request(app).get('/api/history')
        .set('x-auth-token', await user.generateAuthToken())
        .send({ user: user._id });
        // Should find a way to access the history entries and compare against our creations
        // response.res.text gets you almost all the way there.
        expect(response.status).toBe(200);
     });
   });


    // This test is almost identical to the GET test
    describe('POST /', () =>{
        it('should add a history entry to the db and update the user returning status 200', async () => {
        // Create user to hold histories, since histories are embedded in users as references
        const user = new User({
            _id: mongoose.Types.ObjectId("591f47d10d957323386f0c42"),
            username: "admin",
            email: 'admin@email.com',
            password: 'password'
        })

        // Add the user to the database
        await user.save();

        // Create history entries and write them to the database
        const hist1 = new History({
            condition: "silly"
        });

        const hist2 = new History({
            condition: "grumpy"
        });
        await hist1.save();
        await hist2.save();

        // Update the user's history to reference the created history entries
        await User.findByIdAndUpdate(
            user._id, 
            {
                $push: {
                    history: {
                        $each: [hist1, hist2]}}},
            { upsert: true },
            function(err, result) {
                // console.log(result);
                if (err) {
                    console.log(err);
                } 
            });
        
        
        // Retrieve all history entries from the database
        const response = await request(app).get('/api/history')
        .set('x-auth-token', await user.generateAuthToken())
        .send({ user: user._id });
        // Should find a way to access the history entries and compare against our creations
        // response.res.text gets you almost all the way there.
        expect(response.status).toBe(200);
     });
   });

});