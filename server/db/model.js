import pg from 'pg';
import dotenv from 'dotenv';


dotenv.config();
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};
const pool = new pg.Pool(config);
pool.on('connect', () => {
  console.log('Database connection successful');
});


const create = () => {
    const usersTable = `CREATE TABLE IF NOT EXISTS 
                    users(
                      id SERIAL PRIMARY KEY,
                      names VARCHAR(50) NOT NULL,
                      uname VARCHAR(25) NOT NULL UNIQUE,
                      role VARCHAR(10) NULL,
                      password VARCHAR(100) NOT NULL,
                      email VARCHAR(50) NULL UNIQUE,
                      phone VARCHAR(16) NOT NULL UNIQUE,
                      location TEXT NULL,
                      createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    )`;
  
    const parcelsTable = `CREATE TABLE IF NOT EXISTS 
                    parcels(
                      id SERIAL PRIMARY KEY,
                      userId INT NOT NULL REFERENCES users(id),
                      receiverEmail VARCHAR(50) NOT NULL,
                      weight DECIMAL(9,2) NOT NULL,
                      origin VARCHAR(100) NOT NULL,
                      presentLocation VARCHAR(100) NOT NULL,
                      destination VARCHAR(100) NOT NULL,
                      price DECIMAL(9,2) NOT NULL,
                      status VARCHAR(50),
                      createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                      updatedDate TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
                    )`;
    pool
      .query(`${usersTable}; ${adminsTable}; ${parcelsTable}`)
      .then(res => {
        console.log(res);
        pool.end();
      })
      .catch(err => {
        console.log(err);
        pool.end();
      });
    pool.on("remove", () => {
      console.log("Removed");
      process.exit(0);
    });
  };
  export { create, pool };
  require("make-runnable");
  