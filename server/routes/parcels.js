import express from 'express';

import Parcel from '../controllers/parcels';

const router = express.Router();


router.post('/', Parcel.createParcel);
router.get('/', Parcel.getAll);
router.get('/:parcelId', Parcel.getById);
router.put('/:parcelId/destinaton', Parcel.updatePropertyById);
router.put('/:parcelId/status', Parcel.updatePropertyById);
router.put('/:parcelId/currentLocation', Parcel.updatePropertyById);
export default router;