import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
const { expect } = chai;

chai.use(chaiHttp);

describe("app test", ()=>{
    describe(`GET /api/v1/parcels`, ()=>{
        it('should get all the parcers', (done)=>{
            chai.request(app).get("/api/v1/parcels").end((err, res)=>{
                expect(res.status).to.equal(200);

                done();
            });
            
        });
    });

    describe(`GET /api/v1/parcels/id`, ()=>{
        it('should get a specific parcel', (done)=>{
            chai.request(app).get("/api/v1/parcels/2").end((err, res)=>{
                expect(res.status).to.equal(200);
                done();
            });
            
        });
    });

    describe(`GET /api/v1/parcels/id`, ()=>{
        it('should get a specific parcel', (done)=>{
            chai.request(app).get("/api/v1/parcels/22222").end((err, res)=>{
                expect(res).to.be.equal(undefined);
                done();
            });
            
        });
    });
});