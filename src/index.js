const express = require("express");
const bodyParser = require("body-parser");
const data_movie = require("./main/movie/_index");
const data_tv = require("./main/tv");
const Revalidate  = require("./components/Revalidate");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3333;

app.get("/", (req, res) => {
	res.status(200).json("online");
});

const movieValidate = new Revalidate("movie",24)
app.get("/movie",async (req, res) => {
	const { range, baseUrl } = req.query;
	console.log(range, baseUrl);
	// list movie
	const params = { range, baseUrl }
	await movieValidate.check(data_movie,params);
	console.log ('movie',movieValidate.data.length)
	res.status(200).json(movieValidate.data);
});

const tvValidate = new Revalidate("tv",24)
app.get("/tv", async (req, res) => {
	const { range, baseUrl } = req.query;
	// list tv
	const params = { range, baseUrl }
	await tvValidate.check(data_tv,params)
	console.log ('tv',tvValidate.data.length)
	res.status(200).json(tvValidate.data);
});
app.listen(port, () => {
	console.log(`Example app listening on port: ${port}`);
}); // list movie



