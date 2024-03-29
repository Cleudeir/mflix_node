const imdb_tv = require("./02_imdb_tv.js");
const list_tv = require("./01_uauFlix_list_tv.js");
const category = require("../../components/Category.js");

const data_tv = async function ({ baseUrl }) {
	const type = "tv";
	console.log({ baseUrl, type });

	const uau_list = await list_tv();
	const data_uauFlix = await imdb_tv(uau_list)
	const dataCategory = category(data_uauFlix)
	console.log(`Atualizada lista ${data_uauFlix.length} ${type}`);
	return dataCategory

};
module.exports = data_tv;
