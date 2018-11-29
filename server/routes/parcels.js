import express from 'express';
import authentication from '../helper/authentication'
import Parcel from '../controllers/parcels';

const router = express.Router();

router.post('/', authentication(), Parcel.createParcel);
router.get('/',authentication('admin'), Parcel.getAll);
router.get('/:parcelId',authentication(), Parcel.getById);
router.put('/:parcelId/destinaton',authentication('user'), Parcel.updatePropertyById);
router.put('/:parcelId/status', authentication('admin'), Parcel.updatePropertyById);
router.put('/:parcelId/currentLocation',authentication('admin'), Parcel.updatePropertyById);
export default router;