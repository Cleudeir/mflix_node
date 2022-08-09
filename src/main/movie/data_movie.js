
const list_movie = require("./uauFlix_list_movie.js");
const mix_movie = require("./mix_movie.js");
const imdb_movie = require("./imdb_movie.js");
const fs = require("fs");

const data_movie = function ({ baseUrl, range }) {
	const type = "movie";
	console.log({ baseUrl, type, range });

	if (!type || !range) {
		res.status(200).json("Falta parameros");
		return null;
	}
	list_movie({ range, send });

	async function send(list) {
		const getImdbInfo = async () => {
			const arrayInfos = [];
			for (let i = 0; i < list.length; i += 1) {
				const imdb_id = list[i];
				const getFetch = imdb_movie({ imdb_id });
				arrayInfos.push(getFetch);
			}
			const result = await Promise.all(arrayInfos);
			return result;
		};

		const pull = await getImdbInfo();
		const data_uauFlix = pull.filter((x) => x !== null);

		mix_movie({ baseUrl, data_uauFlix, saveSend });
	}

	function saveSend(data) {
		fs.writeFileSync(`data_${type}.json`, JSON.stringify(data));
		console.log(`Atualizada lista ${data.length} ${type}`);
	}
};
module.exports = data_movie;
