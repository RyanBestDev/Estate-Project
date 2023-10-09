import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
	try {
		const { username, password, email } = req.body;
		const hashedPassword = bcrypt.hashSync(password, 10);
		const newUser = new User({ username, password: hashedPassword, email });
		await newUser.save();

		res.status(201).json({ message: 'User created successfully' });
	} catch (err) {
		res.status(500).json(err.message);
	}
};
