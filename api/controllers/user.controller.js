import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import Listing from '../models/listing.model.js';

export const updateUser = async (req, res, next) => {
	if (req.user.id !== req.params.id) {
		return next(errorHandler(401, 'You can only update your own account.'));
	}

	try {
		if (req.body.password) {
			req.body.password = bcryptjs.hashSync(req.body.password, 10);
		}

		const updateUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					email: req.body.email,
					password: req.body.password,
					username: req.body.username,
					avatar: req.body.avatar,
				},
			},
			{ new: true }
		);

		const { password, ...rest } = updateUser._doc;

		res.status(200).json(rest);
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req, res, next) => {
	if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account! '));
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).clearCookie('acess_token').json('User deleted successfully');
	} catch (error) {
		next(error);
	}
};

export const getUserListings = async (req, res, next) => {
	if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only view your own listings!'));
	try {
		const listings = await Listing.find({ userRef: req.params.id });
		res.status(200).json(listings);
	} catch (error) {
		next(error);
	}
};
