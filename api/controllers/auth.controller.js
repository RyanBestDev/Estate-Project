import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
	const { username, password, email } = req.body;

	try {
		const hashedPassword = bcrypt.hashSync(password, 10);
		const newUser = new User({ username, password: hashedPassword, email });
		await newUser.save();

		res.status(201).json({ message: 'User created successfully' });
	} catch (err) {
		next(err);
	}
};

export const signIn = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const validUser = await User.findOne({ email });
		if (!validUser) {
			return next(errorHandler(404, 'User not found'));
		}

		const validPassword = bcrypt.compareSync(password, validUser.password);
		if (!validPassword) {
			return next(errorHandler(401, 'Wrong credentials'));
		}

		const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
		const { password: pass, ...rest } = validUser._doc;
		res.cookie('acess_token', token, { httpOnly: true }).status(200).json(rest);
	} catch (err) {
		next(err);
	}
};
