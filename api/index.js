import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import userRouter from './routes/user.route.js';

const app = express();

app.use('/api/users', userRouter);

mongoose
	.connect(String(process.env.MONGO_STRING))
	.then(() => console.log('connected to database'))
	.catch((err) => console.log(err));

app.listen(3000, () => {
	console.log('server listening on port 3000!');
});
