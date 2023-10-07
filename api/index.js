import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.listen(3000, () => {
	console.log('server listening on port 3000!');
});
