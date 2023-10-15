import express from 'express';
import { updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello World');
});
router.post('/update/:id', verifyToken, updateUser);

export default router;
