const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const get = async function ( item ) {
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
					backdrop_path,
					genres,
					imdb_id,
					original_title,
					overview,
					poster_path,
					title,
					vote_average,
					url: item.url
				};			
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

const imdb_movie = async (list) => {
	const arrayInfos = [];
	for (let i = 0; i < list.length; i += 1) {
		console.log('id_imdb_movie',i,'/',list.length)
		const item = list[i];
		const getFetch = get( item );
		arrayInfos.push(getFetch);
	}
	const result = await Promise.all(arrayInfos);
	const filter = result.filter((x) => x !== null);
	return filter;
};

module.exports = imdb_movie;
