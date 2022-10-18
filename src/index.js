const express = require("express");
const bodyParser = require("body-parser");
const data_tv = require("./main/tv");
const Revalidate = require("./components/Save");
const Category = require("./components/Category");
const redeCanais_list_movie = require("./main/movie/redeCanais_list_movie.js");
const imdb_movie_trending = require("./main/movie/imdb_movie_trending.js");
const uau_list_movie = require("./main/movie/uauFlix_list_movie.js");
const imdb_id_movie = require("./main/movie/imdb_Id_movie.js");
const imdb_title_movie = require("./main/movie/imdb_title_movie.js");
const mapFilmes = require("./main/movie/mapFilmes");
const fsSync = require('fs').promises;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3333;

app.get("/", (req, res) => {
	res.status(200).json("online");
});

let count = 0
app.get("/movie", async (req, res) => {
	const { range, baseUrl } = req.query;
	console.log(range, baseUrl);
	// list movie
	const type = "movie";
	if (!type || !range) {
		res.status(200).json("Falta parameros");
		return null;
	}

	// listar uauflix
	// const uau_list = await uau_list_movie(range);
	// const data_uauFlix = await imdb_id_movie(uau_list)

	const data = await mapFilmes(baseUrl)

	try {
		const resp = await fsSync.readFile(`./temp/imdb_movie.json`)
		const respJson = await JSON.parse(resp)
		count = respJson.length
		console.log("count ", count)
		const movieListCategoria = await Category(respJson)
		res.status(200).json(movieListCategoria);

	} catch (error) {
		res.status(200).json([]);
	}
	if (port === 3333) {
		start()
		const interval = setInterval(start, 5 * 60 * 1000)
		const result = []
		async function start() {
			const time = Date.now()
			const add = 200
			console.log(count, count + add)
			const movieListTitle = await redeCanais_list_movie(baseUrl, data.slice(count, count + add));
			count += add
			const movieListImdbId = await imdb_title_movie(movieListTitle);
			const movieListInfoComplete = await imdb_id_movie(movieListImdbId)
			result.push(...movieListInfoComplete)
			console.log('>>>>>', (Date.now() - time) / 1000, 's <<<<<')
			if (count > data.length) {
				clearInterval(interval)
				console.log(`Atualizada lista ${result.length} ${type}`);
			}
		}
	}
});

app.get("/tv", async (req, res) => {
	const { range, baseUrl } = req.query;
	// list tv
	const params = { range, baseUrl }
	const tvValidate = await data_tv(params)
	res.status(200).json(tvValidate);
});
app.listen(port, () => {
	console.log(`Example app listening on port: ${port}`);
}); // list movie



