import express from 'express';

import User from '../controllers/users';

const router = express.Router();


router.post('/signup', User.signUp);

export default router;