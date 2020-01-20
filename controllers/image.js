const Clarifai = require('clarifai');

// Define Clarifai key
const app = new Clarifai.App({
 apiKey: '761da5cda14947569ce02c0f86c00796'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('Entry count failed to update'))
}

module.exports = {
	handleImage,
	handleApiCall
};