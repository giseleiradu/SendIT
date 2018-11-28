import joi from 'joi';
import Database from '../db/'; 

    const schema = joi.object().keys({
      names: joi.string().min(3).max(60).required(),
      uname: joi.string().required(),
      password: joi.string().min(10).max(10),
      email: joi.string(),
      phone: joi.number().max(10).required(),
     location: joi.string().max(10).required(),
    });

  export default new Database(schema, 'users');