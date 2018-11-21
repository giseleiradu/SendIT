
export default class User {
  constructor(users) {
    this.users = users;
    this.user = {};
  }

  getAll() {
    return this.users;
  }

  signUp(reqBody) {
    if (reqBody.names && reqBody.uname && reqBody.password && reqBody.phone) {
      this.user = {
        client_id: this.users.length + 1,
        names: reqBody.names,
        uname: reqBody.uname,
        password: reqBody.password,
        email: reqBody.email,
        phone: reqBody.phone,
        location: reqBody.location
      };

      this.users.push(this.user);
      return "Successfully Registered!";
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
  
