import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

// const chai = require('chai');
// const chaHtt = require('chai-http');
// const app = require('../src/app');

const { expect } = chai;

chai.use(chaiHttp);

describe("User's parcels routes test", ()=>{
    describe(`GET /api/v1/users/:uId/parcels`, ()=>{
        it('should get all the parcels of a specific user', (done)=>{
            chai.request(app).get("/api/v1/users/user1R1/parcels").end((err, res)=>{
                expect(res.status).to.equal(200);
                done();
            });
            
        });
    });
});

describe("User sign-up routes test", ()=>{
    describe(`POST /api/v1/users/sign-up`, ()=>{
        it('should create an account on the application', (done)=>{
            chai.request(app).post("/api/v1/users/sign-up").end((err, res)=>{
                expect(res.status).to.equal(200);
                done();
            });
            
        });
    });
});

describe("User login routes test", ()=>{
    describe(`POST /api/v1/users/sign-in`, ()=>{
        it('should get a specific user account', (done)=>{
            chai.request(app).post("/api/v1/users/sign-in").end((err, res)=>{
                expect(res.status).to.equal(200);
                done();
            });
            
        });
    });
});

describe("Fetch users routes test", ()=>{
    describe(`GET /api/v1/users/`, ()=>{
        it('should get all the users of stored', (done)=>{
            chai.request(app).get("/api/v1/users/").end((err, res)=>{
                expect(res.status).to.equal(200);
                done();
            });
            
        });
    });
});