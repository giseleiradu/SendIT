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
  // eslint-disable-next-line no-console
  console.log('Database connection successful');
});
const create = () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS 
                  users(
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(50) NOT NULL,
                    password VARCHAR(16) NOT NULL,
                    names VARCHAR(100) NOT NULL
                  )`;
  const adminsTable = `CREATE TABLE IF NOT EXISTS 
                  admins(
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(50) NOT NULL,
                    password VARCHAR(16) NOT NULL,
                    name VARCHAR(100) NOT NULL
                  )`;
  const parcelsTable = `CREATE TABLE IF NOT EXISTS 
                  parcels(
                    parcelId SERIAL PRIMARY KEY,
                    userId INT NOT NULL,
                    weight DECIMAL(9,2) NOT NULL,
                    location VARCHAR(100) NOT NULL,
                    destination VARCHAR(100) NOT NULL,
                    description TEXT NOT NULL,
                    price DECIMAL(9,2) NOT NULL,
                    status VARCHAR(100)
                  )`;
  pool.query(`${usersTable}; ${adminsTable}; ${parcelsTable}`)
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      pool.end();
    });
  pool.on('remove', () => {
    // eslint-disable-next-line no-console
    console.log('Removed');
    process.exit(0);
  });
};
export { create, pool };
require('make-runnable');