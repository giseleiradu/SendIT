import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import bodyParser from 'body-parser';

// const chai = require('chai');
// const chaHtt = require('chai-http');
// const app = require('../src/app');

const { expect } = chai;
const {assert} = chai;
chai.use(chaiHttp);
chai.use(bodyParser);

const user ={
    "names": "Esperance Hagenimana",
    "uname": "esperance",
    "role": " ",
    "password": "esperance",
    "email": "esperance@andela.org",
    "phone": "0789770960",
    "location": "Kigali"
}
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

describe("User sign-up routes test", ()=>{
    describe(`POST /api/v1/auth/signup`, ()=>{
        it.skip('should create an account on the application', (done)=>{
            chai.request(app).post("/api/v1/auth/signup").send(user).end((err,  res)=>{
                console.log(res.body);
                expect(res.status).to.equal(201);
                
                done();
            });         
        });
    });
});

// describe("User sign-up routes test", ()=>{
//     describe(`POST /api/v1/auth/signup`, ()=>{
//         it('should and error massage', (done)=>{
//             chai.request(app).post("/api/v1/auth/signup").end((err, res)=>{
//                 expect(res.status).to.equal(200);
//                 expect(JSON.parse(res.text).message).to.equal("Please enter the required information.");
//                 done();
//             });
            
//         });
//     });
// });
const login ={
    "uname": "esperance",
    "password": "esperance"
}

describe("User login routes test", ()=>{
    describe(`POST /api/v1/auth/login`, ()=>{
        it.only('should get a specific user account', (done)=>{
            chai.request(app).post("/api/v1/auth/signup").send(login).end((err, res)=>{
                console.log(res.body)
                expect(res.status).to.equal(200);
                done();
            });
            
        });
    });
});


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


