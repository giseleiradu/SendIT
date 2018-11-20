
export default class User {
    constructor(users) {
      this.users = users;
      this.user = {};
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
  