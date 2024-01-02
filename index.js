const express = require('express');
const database = require('./config/database');
require('dotenv').config();
const app = express();
const port = process.env.PORT;

database.connect();

const Task = require('./model/task.model');

app.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find({
			deleted: false,
		});
		res.json(tasks);
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
});

app.get('/tasks/detail/:id', async (req, res) => {
	const id = req.params.id;

	const task = await Task.findOne({
		_id: id,
		deleted: false,
	});

	res.json(task);
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
