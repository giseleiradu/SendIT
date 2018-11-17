import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
const { expect } = chai;

chai.use(chaiHttp);

describe("app test", ()=>{
    describe(`GET /parcels`, ()=>{
        it('should get all the parcers', (done)=>{
            chai.request(app).get("/parcels").end((err, res)=>{
                expect(res.status).to.equal(200);

                done();
            });
            
        });
    });

    describe(`GET /parcels/id`, ()=>{
        it('should get a specific parcel', (done)=>{
            chai.request(app).get("/parcels/2").end((err, res)=>{
                expect(res.status).to.equal(200);
                done();
            });
            
        });
    });

    describe(`GET /parcels/id`, ()=>{
        it('should get a specific parcel', (done)=>{
            chai.request(app).get("/parcels/22222").end((err, res)=>{
                expect(res).to.be.equal(undefined);
                done();
            });
            
        });
    });
});