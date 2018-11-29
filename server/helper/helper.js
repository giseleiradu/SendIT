// src/usingDB/controllers/Helper.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
    
    userRole(role){
        if(role === "admin@"){
          return 'admin';
        } else{
          return 'user';
        }
      },

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
  },

  verifyPassword(dbPassword, password) {
    return bcrypt.compareSync(password, dbPassword);
  },

//   isValidEmail(email) {
//     return /\S+@\S+\.\S+/.test(email);
//   },

  generateToken(id) {
    const token = jwt.sign({
      userId: id
    },
      process.env.SECRET, { expiresIn: '5m' }
    );
    return token;
  }
}

export default Helper;
