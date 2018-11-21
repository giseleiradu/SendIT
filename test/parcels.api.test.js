import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
// const chai = require('chai');
// const chaHtt = require('chai-http');
// const app = require('../src/app');

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
        it('should return an empty array', (done)=>{
            chai.request(app).get("/api/v1/parcels/22222").end((err, res)=>{
                // console.log(res.text);
                expect(JSON.parse(res.text).parcel.length).to.be.equal(0);
                done();
            });
        });
    });


    describe("PUT /api/v1/parcels/id/status", ()=>{
            it(`should change the specified order's status`, (done)=>{
                chai.request(app).put("/api/v1/parcels/7/cancel").end((err, res)=>{
                    expect(res.status).to.equal(200);
    
                    done();
                });
                
            });
        });
    });


    describe("POST /api/v1/parcels/", ()=>{
        it(`should add a percel to the parcels' list`, (done)=>{
            chai.request(app).post("/api/v1/parcels/").end((err, res)=>{
                expect(res.status).to.equal(200);
                
                done();
            });
            
        });
    });