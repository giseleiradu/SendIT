'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _orders = require('../models/orders');

var _orders2 = _interopRequireDefault(_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import users from '../models/users';


var router = _express2.default.Router();

router.get('/:uId/parcels', function (req, res) {
  var parcels = [];
  var uId = req.params.uId;


  _orders2.default.forEach(function (order) {
    if (order.client_id === uId) {
      parcels.push(order);
    }
  });

  res.status(200).json({
    parcels: parcels
  });
});

exports.default = router;