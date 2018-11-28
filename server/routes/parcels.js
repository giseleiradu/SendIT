import express from 'express';

import User from '../controllers/parcels';
import Parcel from '../controllers/parcels';

const router = express.Router();


router.get('/', Parcel.getAll);
router.get('/:parcelId', Parcel.getById);
router.post('/', Parcel.createParcel);

export default router;