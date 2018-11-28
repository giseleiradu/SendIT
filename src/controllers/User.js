import db from "../db/db";

import bcrypt from 'bcrypt';

export default class User {
  constructor(users) {
    this.users = users;
    this.user = [];
  }

  getAll() {
    return this.users;
  }

  async signUp(reqBody) {
    if (reqBody.names && reqBody.uname && reqBody.password && reqBody.phone) {
      const qry = `INSERT INTO
                    users(names, uname, password, email, phone, location)
                    VALUES($1, $2, $3, $4, $5, $6) returning id, uname, email, phone, location`;

      this.user = [
        reqBody.names,
        reqBody.uname,
        reqBody.password,
        reqBody.email,
        reqBody.phone,
        reqBody.location
      ];

      try{
        const { rows } = await db.query(qry, this.user);

        if(rows.length > 0) {
          return rows[0];
        }
      } catch(e){
        return "Not successfully Registered!";
        console.log(e);
      }
    } else {
      return "Please enter the required information.";
    }
  }

  signIn(reqBody) {
    if (reqBody.uname && reqBody.password) {
      this.users.forEach(user => {
        if (
          user.uname === reqBody.uname &&
          user.password === reqBody.password
        ) {
          this.user = {
            client_id: user.client_id,
            names: user.names,
            uname: user.uname,
            email: user.email,
            phone: user.phone,
            location: user.location
          };
        }
      });
      if (Object.keys(this.user).length > 0) {
        return this.user;
      } else {
        return "The username or password is incorrect";
      }
    } else {
      return "Please enter the username and password";
    }
  }
}
