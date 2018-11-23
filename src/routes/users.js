import express from "express";
import orders from "../models/orders";
import users from "../models/users";
import User from "../controllers/User";
import joi from 'joi';

const router = express.Router();

router.get("/", (req, res) => {
  const userObj = new User(users);
  // const { uId } = req.params;

  res.status(200).json({
    allUsers: userObj.getAll()
  });
});

function validateUser(newUser) {
  const schema = {
    client_id: joi.number(),
    names: joi.string().min(3).max(60).required(),
    uname: joi.string().required(),
    password: joi.string().min(10).max(1000),
    email: joi.date(),
    phone: joi.string().required(),
    email: joi.string().required(),
  };
  return joi.validate(newUser, schema);
}

router.post("/sign-up", (req, res) => {
  const { err } = validateUser(req.body);
  if (err) {
    res.status(400).send(err.details[0].message);
    return;
  }

  const userObj = new User(users);
  const newUser = {
    names: req.body.name,
    uname: req.body.uname,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    location: req.body.location
  };
  const message = userObj.signUp(newUser);
  res.status(200).json({
    message
  });
});

router.post("/sign-in", (req, res) => {
  const userObj = new User(users);
  const user = {
    uname: "BaFitz",
    password: "bafitz"
  };

  const message = userObj.signIn(user);

  res.status(200).json({
    message
  });
});

router.get("/:uId/parcels", (req, res) => {
  const parcels = [];
  const { uId } = req.params;

  orders.forEach(order => {
    if (order.client_id === uId) {
      parcels.push(order);
    }
  });

  res.status(200).json({
    parcels
  });
});

export default router;
