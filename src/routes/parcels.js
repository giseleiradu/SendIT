import express from 'express';
import joi from 'joi';
import orders from '../models/orders';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    orders,
  });
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const parcel = [];

  orders.forEach((order) => {
    if (order.id === id) {
      parcel.push(order);
    }
  });

  res.status(200).json({
    parcel,
  });
  req.setTimeout(500);
});


router.put('/:id/cancel', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const parcel = [];
  orders.forEach((order) => {
    if (order.id === id) {
      parcel.push(order);
      parcel[0].status = 'canceled';
    }
  });

  res.status(200).json({
    parcel,
  });
  req.setTimeout(500);
});


function validateOrder(order) {
  const schema = {
    id: joi.number().required(),
    client_id: joi.string(),
    title: joi.string().min(3).max(60).required(),
    destination: joi.string().required(),
    comment: joi.string().min(10).max(1000),
    date: joi.date(),
    state: joi.string().required(),
  };
  return joi.validate(order, schema);
}

router.post('/', (req, res) => {
  const { err } = validateOrder(req.body);
  if (err) {
    res.status(400).send(err.details[0].message);
    return;
  }
  const order = {
    id: orders.length + 1,
    client_id: req.body.client_id,
    type: req.body.type,
    destination: req.body.destination,
    comment: req.body.comment,
    date: req.body.date,
    status: req.body.status,
  };
  orders.push(order);
  res.send(orders);
});


export default router;
