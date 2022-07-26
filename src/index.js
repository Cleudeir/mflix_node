const express = require("express");
const bodyParser = require("body-parser");
const data_movie = require("./main/data_movie");
const data_tv = require("./main/data_tv");
const Revalidate  = require("./Revalidate");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3333;

app.get("/", (req, res) => {
	res.status(200).json("online");
});

const movieValidate = new Revalidate(24*60)
app.get("/movie", (req, res) => {
	const { range, baseUrl } = req.query;
	console.log(range, baseUrl);
	// list movie
	const params = { range, baseUrl }
	movieValidate.check(data_movie,params)
	// data_movie({ baseUrl, range });
	const movie = require("../data_movie.json");
	res.status(200).json(movie);
});

const tvValidate = new Revalidate(24*60)
app.get("/tv", (req, res) => {
	const { range, baseUrl } = req.query;
	// list tv
	const params = { range, baseUrl }
	tvValidate.check(data_tv,params)
	const tv = require("../data_tv.json");
	res.status(200).json(tv);
});
app.listen(port, () => {
	console.log(`Example app listening on port: ${port}`);
}); // list movie
