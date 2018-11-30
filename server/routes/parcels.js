import express from 'express';
import authentication from '../helper/authentication'
import Parcel from '../controllers/parcels';

const router = express.Router();

router.post('/', authentication(), Parcel.createParcel);
router.get('/', authentication('admin'), Parcel.getAll);
router.get('/:id/:parcelId', authentication('user'), Parcel.getById);
router.put('/:parcelId/destination', Parcel.updatePropertyById);

// router.put('/:id/:parcelId/destinaton', authentication('user'), Parcel.updateDestination);
router.put('/:parcelId/status', authentication('user'), Parcel.updatePropertyById);
router.put('/:parcelId/currentLocation',  Parcel.updatePropertyById);
export default router;

