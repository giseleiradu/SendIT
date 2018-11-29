import db from '../db/db';
import Helper from '../helper/helper';

class User {

  static getAll(req, res) {
    return res.status(200).json({
      status: "Successful",
      message: "All the users",
      users
    });
  }

  static async signUp(req, res) {
    if (req.body.names && req.body.uname && req.body.password && req.body.phone && req.body.email) {
      const qry = `INSERT INTO
      users(names, uname, role, password, email, phone, location)
      VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;

      const user = [
        req.body.names,
        req.body.uname,
        Helper.userRole(req.body.role),
        Helper.hashPassword(req.body.password),
        req.body.email,
        req.body.phone,
        req.body.location
      ];

      try {
        const { rows } = await db.query(qry, user);

        if (rows.length > 0) {
          return res.status(201).json({ newUser: rows[0] });
        }
      } catch (e) {
        return res
          .status(500)
          .json({ message: "Not successfully Registered!" });
         
        }  
        // console.log(e);
    } else {
      return res
        .status(400)
        .json({ message: "Please enter the required information" });
    }
  }

  static async signIn(req, res) {
    if (req.body.uname && req.body.password) {
      const qry = "SELECT * FROM users WHERE uname = $1";
      const login = [req.body.uname];
      
      try {
        const { rows } = await db.query(qry, login);
        if (rows.length > 0) {
          console.log("eeeee==============", Helper.hashPassword(req.body.password), '====', rows[0].password);
          if (Helper.verifyPassword(rows[0].password, req.body.password)) {
            return res.status(202).json({
              user: {
                names: rows[0].names,
                uname: rows[0].uname,
                phone: rows[0].phone,
                email: rows[0].email,
                location: rows[0].location
              }
            });
          } else {
            return res
              .status(401)
              .json({ message: "Username or Password is incorrect!" });
          }
        } else {
          return res.status(404).json({ message: "Bad request" });
        }
      } catch (e) {}
    } else {
      return res
        .status(400)
        .json({ message: "Please enter the required information" });
    }
  }
}
export default User;
