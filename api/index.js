import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	return res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
});

mongoose
	.connect(String(process.env.MONGO_STRING))
	.then(() => console.log('connected to database'))
	.catch((err) => console.log(err));

app.listen(3000, () => {
	console.log('server listening on port 3000!');
});
