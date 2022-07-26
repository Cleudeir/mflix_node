const express = require("express");
const bodyParser = require("body-parser");
const data_movie = require("./main/data_movie");
const data_tv = require("./main/data_tv");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3333;
const baseUrl = "https://redecanais.to";
const range = 600;

app.get("/", (req, res) => {
	res.status(200).json("online");
});

app.get("/movie", async (req, res) => {
	// list movie
	console.log("refresh");
	data_movie({ baseUrl, range });
	const movie = require("../data_movie.json");
	console.log("movie", movie.length);

	res.status(200).json(movie);
});
app.get("/tv", async (req, res) => {
	// list tv
	data_tv({ baseUrl, range });
	console.log("refresh");
	const tv = require("../data_tv.json");
	console.log("tv", tv.length);

	res.status(200).json(tv);
});
app.listen(port, () => {
	console.log(`Example app listening on port: ${port}`);
});	// list movie
