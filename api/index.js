import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

mongoose
	.connect(String(process.env.MONGO_STRING))
	.then(() => console.log('connected to database'))
	.catch((err) => console.log(err));

app.listen(3000, () => {
	console.log('server listening on port 3000!');
});
