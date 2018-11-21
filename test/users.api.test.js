import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
const { expect } = chai;

chai.use(chaiHttp);

describe("User's routes test", ()=>{
    describe(`GET /api/v1/users/:uId/parcels`, ()=>{
        it('should get all the parcels of a specific user', (done)=>{
            chai.request(app).get("/api/v1/users/user1R1/parcels").end((err, res)=>{
                expect(res.status).to.equal(200);
                done();
            });
            
        });
    });
});