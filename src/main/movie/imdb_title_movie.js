const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const get = async function ( item ) {
	const api = {
		url: "https://api.themoviedb.org/3",
		key: "5417af578f487448df0d4932bc0cc1a5",
	};
	try {
		const title = item.title.toLowerCase().split(" ").join("+")
		const year = item.year
		console.log(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=pt-BR&api_key=${api.key}&query=${title}&year=${year}`)
		const pullInfo = await fetch(			
		url = `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=pt-BR&api_key=${api.key}&query=${title}&year=${year}` 
		);
		const jsonInfo = await pullInfo.json();
		if(jsonInfo.results && jsonInfo.results[0] && jsonInfo.results[0].id){
			return {imdb_id: jsonInfo.results[0].id, url: item.url, year}
		}else{
			return null;
		}
	} catch (error) {
		return null;
	}
};

const imdb_title_movie = async (list) => {
	const arrayInfos = [];
	for (let i = 0; i < list.length; i += 1) {
		console.log('title_imdb_movie',i,'/',list.length)
		const item = list[i];
		const getFetch = get( item );
		arrayInfos.push(getFetch);
	}
	const result = await Promise.all(arrayInfos);
	const filter = result.filter((x) => x !== null);
	console.log('fim_title_imdb_movie',list.length)
	return filter;
};

module.exports = imdb_title_movie;
