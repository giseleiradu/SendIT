'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _orders = require('../models/orders');

var _orders2 = _interopRequireDefault(_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  res.send({
    orders: _orders2.default
  });
});

router.get('/:id', function (req, res) {
  var id = parseInt(req.params.id, 10);
  var parcel = [];

  _orders2.default.forEach(function (order) {
    if (order.id === id) {
      parcel.push(order);
    }
  });

  res.status(200).json({
    parcel: parcel
  });
  req.setTimeout(500);
});

router.put('/:id/cancel', function (req, res) {
  var id = parseInt(req.params.id, 10);
  var parcel = [];
  _orders2.default.forEach(function (order) {
    if (order.id === id) {
      parcel.push(order);
      parcel[0].status = 'canceled';
    }
  });

  res.status(200).json({
    parcel: parcel
  });
  req.setTimeout(500);
});

function validateOrder(order) {
  var schema = {
    id: _joi2.default.number().required(),
    client_id: _joi2.default.string(),
    title: _joi2.default.string().min(3).max(60).required(),
    destination: _joi2.default.string().required(),
    comment: _joi2.default.string().min(10).max(1000),
    date: _joi2.default.date(),
    state: _joi2.default.string().required()
  };
  return _joi2.default.validate(order, schema);
}

router.post('/', function (req, res) {
  var _validateOrder = validateOrder(req.body),
      err = _validateOrder.err;

  if (err) {
    res.status(400).send(err.details[0].message);
    return;
  }
  var order = {
    id: _orders2.default.length + 1,
    client_id: req.body.client_id,
    type: req.body.type,
    destination: req.body.destination,
    comment: req.body.comment,
    date: req.body.date,
    status: req.body.status
  };
  _orders2.default.push(order);
  res.send(_orders2.default);
});

exports.default = router;