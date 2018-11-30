import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import bodyParser from 'body-parser';

const { expect } = chai;
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
        it('should create an account on the application', (done)=>{
            chai.request(app).post("/api/v1/auth/signup").send(user).end((err,  res)=>{
                expect(res.status).to.equal(201);
                
                done();
            });         
        });
    });
});

const login ={
    "uname": "esperance",
    "password": "esperance"
}

describe("User login routes test", ()=>{
    describe(`POST /api/v1/auth/login`, ()=>{
        it('should get a specific user account', (done)=>{
            chai.request(app).post("/api/v1/auth/login").send(login).end((err, res)=>{
                expect(res.status).to.equal(202);
                done();
            });
            
        });
    });
});

describe("User's parcels routes test", ()=>{
    describe(`GET /api/v1/users/1/parcels`, ()=>{
        it('should get all the parcels of a specific user', (done)=>{
            chai.request(app).get("/api/v1/users/1/parcels").set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InVzZXIiLCJpYXQiOjE1NDM1MTY5MDJ9.d2DEXsJsG5_ssfNq_jTEzcfwUAb2dNf9RtO0v4xEDYY').end((err, res)=>{
                expect(res.status).to.equal(200);
                done();
            });
            
        });
    });
});


