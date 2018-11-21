import express from "express";
import orders from "../models/orders";
import users from "../models/users";
import User from "../controllers/User";

const router = express.Router();

router.post("/sign-up", (req, res) => {
  const userObj = new User(users);
  const newUser = {
    names: "ada adaoe",
    uname: "BaFitz",
    password: "bafitz",
    email: "placerat@eunulla.org",
    phone: "(078) 603-1393",
    location: "Mozambique"
  };
  const message = userObj.signUp(newUser);
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
