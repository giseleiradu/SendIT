import express from 'express';
import orders from '../models/orders';
// import users from '../models/users';


const router = express.Router();

router.get('/:uId/parcels', (req, res) => {
  const parcels = [];
  const { uId } = req.params;

  orders.forEach((order) => {
    if (order.client_id === uId) {
      parcels.push(order);
    }
  });

  res.status(200).json({
    parcels,
  });
});

export default router;
