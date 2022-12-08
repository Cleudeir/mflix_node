const Save = require("../../components/Save");

const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const get = async function (item) {
	const api = {
		url: "https://api.themoviedb.org/3",
		key: "5417af578f487448df0d4932bc0cc1a5",
	};
	try {
		const pullInfo = await fetch(
			`${api.url}/movie/${item.imdb_id}?api_key=${api.key}&language=pt-BR`
		);
		const jsonInfo = await pullInfo.json();

		if (jsonInfo && jsonInfo.genres && jsonInfo.poster_path) {
			if (jsonInfo.backdrop_path) {
				jsonInfo.backdrop_path = `https://image.tmdb.org/t/p/original${jsonInfo.backdrop_path}`;
			} else {
				jsonInfo.backdrop_path = `https://sportbuzz.uol.com.br/media/_versions/douglascosta_82934045_116411013185365_8270789263511275541_n_widelg.jpg`;
			}

			jsonInfo.poster_path = `https://image.tmdb.org/t/p/w342${jsonInfo.poster_path}`;

			if (jsonInfo.genres[0]) {
				jsonInfo.genres = await jsonInfo.genres[0].name;
			} else if (jsonInfo.genres[1]) {
				jsonInfo.genres = await jsonInfo.genres[1].name;
			} else if (jsonInfo.genres[2]) {
				jsonInfo.genres = await jsonInfo.genres[2].name;
			} else {
				jsonInfo.genres = "Others";
			}
			const {
				backdrop_path,
				genres,
				original_title,
				overview,
				poster_path,
				title,
				imdb_id,
				vote_average,
			} = jsonInfo;

			return {
				uuid: item.uuid,
				redeCanaisNamed: item.redeCanaisNamed,
				backdrop_path,
				genres,
				imdb_id,
				original_title,
				overview,
				poster_path,
				title,
				vote_average,
				url: item.url,
				error: false
			};
		} else {
			return { ...item, error: true };
		}
	} catch (error) {
		return { ...item, error: true };
	}
};

const imdb_movie = async (list) => {
	const save = new Save("imdb_movie")
	const remenber = await save.verify(list)
	for (let i = 0; i < remenber.length; i += 1) {
		console.log('id_imdb_movie', i, '/', remenber.length)
		const item = remenber[i];
		if (item.error === true) {
			await save.insert(item)
			continue
		}
		const getFetch = await get(item);
		await save.insert(getFetch)
	}
	const result = await save.read()
	const filter = result.filter((x) => x !== null);
	return filter;
};

module.exports = imdb_movie;
