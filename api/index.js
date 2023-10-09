import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

const app = express();

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

mongoose
	.connect(String(process.env.MONGO_STRING))
	.then(() => console.log('connected to database'))
	.catch((err) => console.log(err));

app.listen(3000, () => {
	console.log('server listening on port 3000!');
});
