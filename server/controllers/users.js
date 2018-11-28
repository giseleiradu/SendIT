import db from '../db/db';;

class User{

  // constructor(users) {
  //   // this.users = users;
  //   this.user = [];
  // }

 static getAll (req, res){
    return res.status(200).json({
        status:'Successful',
        message: 'All the users',
        users,
    });
  }

  static async signUp (req, res){
    // console.log(req.body);
    if (req.body.names && req.body.uname && req.body.password && req.body.phone && req.body.email) {
      const qry = `INSERT INTO
      users(names, uname, password, email, phone, location)
      VALUES($1, $2, $3, $4, $5, $6) returning id, uname, email, phone, location`;
      
      const user = [
        req.body.names,
        req.body.uname,
        req.body.password,
        req.body.email,
        req.body.phone,
        req.body.location
      ];
      
      try{
        const { rows } = await db.query(qry, user);
        
        if(rows.length > 0) {
          // console.log(rows);
          return res.status(201).json({ newUser: rows[0] });
        } else{

          return res.status(500).json({message:"not created!"})
        }
      } catch(e){
        return res.status(500).json({message:"Not successfully Registered!"})
        console.log(e);
      }
    } else {
      return res.status(400).json({message:"Please enter the required information"})
    }
  }

  static async signIn (req, res){
    if(req.body.uname && req.body.password){
      const qry = 'SELECT * FROM users WHERE uname = $1 AND password=$2';
      const login = [
        req.body.uname,
        req.body.password
      ];
      try {
        const {rows} = await db.query(qry, login);
        if(rows.length > 0) {
          return res.status(202).json({
             user: {
              names: rows[0].names,
              uname: rows[0].uname,
              phone: rows[0].phone,
              email: rows[0].email,
              location: rows[0].location,
             }
           });

        } else{

          return res.status(500).json({message:"User not found!"})
        }
      } catch (e) {
        
      }
    } else {
      return res.status(400).json({message:"Please enter the required information"})
    } 
}
}
export default User;