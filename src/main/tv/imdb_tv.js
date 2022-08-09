const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const imdb_tv = async function ({ imdb_id }) {
	const api = {
		url: "https://api.themoviedb.org/3",
		key: "5417af578f487448df0d4932bc0cc1a5",
	};
	try {
		const pullInfo = await fetch(
			`${api.url}/tv/${imdb_id}?api_key=${api.key}&language=pt-BR`
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
				overview,
				poster_path,
				original_name,
				name,
				vote_average,
				seasons,
			} = jsonInfo;

			const seasonsEpisodes = [];
			for (let n = 0; n < seasons.length; n++) {
				const { episode_count } = seasons[n];
				seasonsEpisodes.push(episode_count);
			}
			return {
				seasons: seasonsEpisodes,
				backdrop_path,
				genres,
				imdb_id,
				original_title: original_name,
				title: name,
				overview,
				poster_path,
				vote_average,
			};
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

module.exports = imdb_tv;
