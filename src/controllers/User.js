export default class User {
  constructor(users) {
    this.users = users;
    this.user = {};
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
}
