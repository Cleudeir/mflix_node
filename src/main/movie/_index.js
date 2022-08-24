
const uau_list_movie = require("./uauFlix_list_movie.js");
const imdb_id_movie = require("./imdb_Id_movie.js");
const imdb_title_movie = require("./imdb_title_movie.js");
const mix_movie = require("../../components/mix.js");
const redeCanais_list_movie = require("./redeCanais_list_movie.js");


const Revalidate = require("../../components/Revalidate.js");
const category = require("../../components/category.js");

const redeCanais_list = new Revalidate("redeCanais_list",24*60)

const data_movie = async function ({ baseUrl, range }) {
	const type = "movie";
	console.log({ baseUrl, type, range });

	if (!type || !range) {
		res.status(200).json("Falta parameros");
		return null;
	}
	const uau_list = await uau_list_movie(range);
	const data_uauFlix = await imdb_id_movie(uau_list)

	await redeCanais_list.check(redeCanais_list_movie, { baseUrl, range } );
	const data_redeCanais_ids = await imdb_title_movie(redeCanais_list.data)
	const data_redeCanais = await imdb_id_movie(data_redeCanais_ids)

	const mix =  mix_movie(data_uauFlix, data_redeCanais);

	const dataCategory = category(mix)

	console.log(`Atualizada lista ${mix.length} ${type}`);

	return dataCategory;
};
module.exports = data_movie;
