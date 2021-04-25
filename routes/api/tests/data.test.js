/**
 * @jest-environment node
 */

 const app = require('../../../network');
 const request = require('supertest');
 const Datum = require('../../../models/Datum');
 const mongoose = require('mongoose');
 
 let server;
 
 beforeEach(() => { server = require('../../../network').listen(); });
 
 afterEach( async () => { 
   await Datum.remove({});
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

 
describe('/api/data', () => {
    // Make sure the server starts and stops before each test
  
    describe('GET /', () =>{
      it('checks if data entries are added with the correct keywords', async () => {
        // Populate the test database first
        await Datum.collection.insertMany([
          { keyword: "bad", data: [8, 8, 8] },
          { keyword: "mad", data: [6, 6, 6] },
          { keyword: "rad", data: [7, 7, 7] }
        ]);

        // Fetch data
        const response = await request(app).get("/api/data");

        // Check for 200 status and that the entry with specific keyword was added
        expect(response.statusCode).toBe(200);
        expect(response.body.some(entry => entry.keyword === 'mad')).toBeTruthy();

      });
    });
    
    describe('GET /', () =>{
      it('checks if all data entries are being added to the database', async () => {
        // Populate the test database first
        await Datum.collection.insertMany([
          { keyword: "bad", data: [8, 8, 8] },
          { keyword: "mad", data: [6, 6, 6] },
          { keyword: "rad", data: [7, 7, 7] }
        ]);
        
        // Fetch data
        const response = await request(app).get("/api/data");

        // Check for 200 status, and all entries were added
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(3);

      });
    });
    
    describe('POST /', () =>{
      it('should post a data entry to the database', async () => {
        const response = await request(app).post('/api/data').send({ keyword: "Chill", data: [0,1,2] });
        expect(response.status).toBe(200);
        expect(response.body.keyword).toContain('Chill');
      });
    });
    
});