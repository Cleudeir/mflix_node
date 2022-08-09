const imdb_tv = require("./imdb_tv.js");
const list_tv = require("./uauFlix_list_tv.js");
const fs = require("fs");

const data_tv = function ({ baseUrl, range }) {
	const type = "tv";
	console.log({ baseUrl, type, range });

	if (!type || !range) {
		res.status(200).json("Falta parameros");
		return null;
	}

	list_tv({ range, send });

	async function send(list) {
		const getImdbInfo = async () => {
			const arrayInfos = [];
			for (let i = 0; i < list.length; i += 1) {
				const imdb_id = list[i];
				const getFetch = imdb_tv({ imdb_id });
				arrayInfos.push(getFetch);
			}
			const result = await Promise.all(arrayInfos);
			return result;
		};

		const pull = await getImdbInfo();
		const data_uauFlix = pull.filter((x) => x !== null);

		saveSend(data_uauFlix);
	}

	function saveSend(data) {
		fs.writeFileSync(`data_${type}.json`, JSON.stringify(data));
		console.log(`Atualizada lista ${data.length} ${type}`);
	}
};
module.exports = data_tv;
