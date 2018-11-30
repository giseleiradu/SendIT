import express from 'express';
import User from '../controllers/users';
import authentication from '../helper/authentication';

const router = express.Router();


router.get('/:id/parcels', authentication('user'), User.getUserParcels);
router.get('/:id/users', authentication('admin'), User.getAll);

export default router;