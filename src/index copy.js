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

let ocupadoMovie = false
app.get("/movie", async (req, res) => {
	let count = 0
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
	if (port === 3333 && ocupadoMovie === false) {
		console.log("Start")
		const interval = setInterval(start, 12 * 60 * 1000)
		const result = []
		start()
		async function start() {
			ocupadoMovie = true
			const data = await mapFilmes(baseUrl)
			const time = Date.now()
			const add = 500
			console.log(count, count + add)
			const slice = data.slice(count, count + add)
			const movieListTitle = await redeCanais_list_movie(baseUrl, slice);
			count += add
			const movieListImdbId = await imdb_title_movie(movieListTitle);
			const movieListInfoComplete = await imdb_id_movie(movieListImdbId)
			result.push(...movieListInfoComplete)
			console.log('>>>>>', (Date.now() - time) / 1000, 's <<<<<')
			if (count > data.length) {
				clearInterval(interval)
				console.log(`Atualizada lista ${result.length} ${type}`);
				ocupadoMovie = false
			}
		}
	}
});

let ocupadoTv = false
app.get("/tv", async (req, res) => {
	const { range, baseUrl } = req.query;
	// list tv
	const params = { range, baseUrl }
	try {
		const resp = await fsSync.readFile(`./temp/imdb_tv.json`)
		const respJson = await JSON.parse(resp)
		const tvListCategoria = await Category(respJson)
		res.status(200).json(tvListCategoria);
	} catch (error) {
		res.status(200).json([]);
	}

	if (port === 3333 && ocupadoTv === false) {
		ocupadoTv = true
		await data_tv(params)
		ocupadoTv = false
	}
});
app.listen(port, () => {
	console.log(`Example app listening on port: ${port}`);
}); // list movie



