const express = require("express");
const bodyParser = require("body-parser");
const data_tv = require("./main/tv");
const Revalidate = require("./components/Save");
const Category = require("./components/Category");
const redeCanais_list_movie = require("./main/movie/2_redeCanais_list_movie.js");
const imdb_movie_trending = require("./main/movie/imdb_movie_trending.js");
const uau_list_movie = require("./main/movie/uauFlix_list_movie.js");
const imdb_id_movie = require("./main/movie/4_imdb_Id_movie.js");
const imdb_title_movie = require("./main/movie/3_imdb_title_movie.js");
const mapFilmes = require("./main/movie/1_mapFilmes");
const fsSync = require('fs').promises;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3333;

app.get("/", (req, res) => {
	res.status(200).json("online");
});

app.get("/movie", async (req, res) => {
	const resp = await fsSync.readFile(`./temp/imdb_movie.json`)
	const respJson = await JSON.parse(resp)
	let count = respJson.length | 0
	const time = Date.now()
	const { baseUrl } = req.query;

	// list movie
	const type = "movie";
	const data = await mapFilmes(baseUrl)

	console.log({ count, baseUrl });

	//resultado imediato
	const sliceData1 = data.slice(0, 100)
	console.log('sliceData1', sliceData1.length)
	const response = await getInfosMovies(baseUrl, sliceData1)
	res.status(200).json(response);
	console.log('>>>>>', (Date.now() - time) / 1000, 's <<<<<')
	//Aumentar biblioteca
	const sliceData2 = data.slice(0, 100)
	getInfosMovies(baseUrl, sliceData2)
});

async function getInfosMovies(baseUrl, data) {
	const movieListTitle = await redeCanais_list_movie(baseUrl, data);
	const movieListImdbId = await imdb_title_movie(movieListTitle);
	const movieListInfoComplete = await imdb_id_movie(movieListImdbId)

	console.log(">>>>>",{movieListTitle, movieListImdbId, movieListInfoComplete},"<<<<<")
	const movieListCategoria = await Category(movieListInfoComplete)
	return movieListCategoria
}

app.get("/tv", async (req, res) => {
	const { baseUrl } = req.query;
	// list tv
	const params = { baseUrl }
	const resp = await fsSync.readFile(`./temp/imdb_tv.json`)
	const respJson = await JSON.parse(resp)
	const tvListCategoria = await Category(respJson)
	res.status(200).json(tvListCategoria);

	let count = respJson.length | 0
	const result = await data_tv(params)
});
app.listen(port, () => {
	console.log(`Example app listening on port: ${port}`);
}); // list movie



