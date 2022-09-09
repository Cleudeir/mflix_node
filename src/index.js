const express = require("express");
const bodyParser = require("body-parser");
const data_tv = require("./main/tv");
const Revalidate = require("./components/Revalidate");
const Category = require("./components/Category");
const redeCanais_list_movie = require("./main/movie/redeCanais_list_movie.js");
const imdb_movie_trending = require("./main/movie/imdb_movie_trending.js");
const uau_list_movie = require("./main/movie/uauFlix_list_movie.js");
const imdb_id_movie = require("./main/movie/imdb_Id_movie.js");
const imdb_title_movie = require("./main/movie/imdb_title_movie.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3333;

app.get("/", (req, res) => {
	res.status(200).json("online");
});

const movie_list_title = new Revalidate("movieListTitle", 11)
const movie_list_imdb_id = new Revalidate("movieListImdbId", 12)
const movie_list_info_complete = new Revalidate('movieListInfoComplete', 13)
const movie_list_categoria = new Revalidate('movieListCategoria', 14)

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

	const movieListTitle = await movie_list_title.check(redeCanais_list_movie, baseUrl);

	const movieListImdbId = await movie_list_imdb_id.check(imdb_title_movie, movieListTitle);

	const movieListInfoComplete = await movie_list_info_complete.check(imdb_id_movie, movieListImdbId)

	const movieListCategoria = await movie_list_categoria.check(Category, movieListInfoComplete)

	console.log(`Atualizada lista ${movieListInfoComplete.length} ${type}`);

	res.status(200).json(movieListCategoria);
});

const tvValidate = new Revalidate("tv", 24)
app.get("/tv", async (req, res) => {
	const { range, baseUrl } = req.query;
	// list tv
	const params = { range, baseUrl }
	await tvValidate.check(data_tv, params)
	res.status(200).json(tvValidate.data);
});
app.listen(port, () => {
	console.log(`Example app listening on port: ${port}`);
}); // list movie



