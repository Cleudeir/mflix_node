const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const movie = require("./movie.js");
const list_movie = require("./crawler/uauFLix/movie/list_movie.js");
const list_tv = require("./crawler/uauFLix/tv/list_tv.js");
const imdb_movie = require("./tmdb/movie/imdb_movie.js");
const imdb_tv = require("./tmdb/tv/imdb_tv.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3333;

app.get("/", (req, res) => {
	res.status(200).json("online");
});

app.post("/list", (req, res) => {
	const { baseUrl, type, range } = req.body;

	console.log({ baseUrl, type, range });

	if (!type || !range) {
		res.status(200).json("Falta parameros");
		return null;
	}

	if (type === "movie") {
		list_movie({ range, send });
	} else if (type === "tv") {
		list_tv({ range, send });
	}

	async function send(list) {
		const getImdbInfo = async () => {
			const arrayInfos = [];
			for (let i = 0; i < list.length; i += 1) {
				const imdb_id = list[i];
				let getFetch;
				if (type === "movie") {
					getFetch = imdb_movie({ imdb_id });
				} else if (type === "tv") {
					getFetch = imdb_tv({ imdb_id });
				}
				arrayInfos.push(getFetch);
			}
			const result = await Promise.all(arrayInfos);
			return result;
		};

		const pull = await getImdbInfo();
		const data_uauFlix = pull.filter((x) => x !== null);

		if (type === "movie") {
			movie({ baseUrl, data_uauFlix, saveSend });
		} else if (type === "tv") {
			saveSend(data_uauFlix);
		}
	}

	function saveSend(data) {
		fs.writeFileSync(`data_${type}.json`, JSON.stringify(data));
		res.status(200).json(data);
	}
});

app.get("/movie", (req, res) => {
	const movie = require("../data_movie.json");
	res.status(200).json(movie);
});
app.get("/tv", (req, res) => {
	const tv = require("../data_tv.json");
	res.status(200).json(tv);
});
app.listen(port, () => {
	console.log(`Example app listening on port: ${port}`);
});
