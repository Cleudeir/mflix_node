const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const imdb_movie_trending = async function () {
	const api = {
		url: "https://api.themoviedb.org/3",
		key: "5417af578f487448df0d4932bc0cc1a5",
	};
	try {
		const pullInfo = await fetch(			
		url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${api.key}` 
		);
		const jsonInfo = await pullInfo.json();
		if(jsonInfo.results){
			return jsonInfo.results
		}else{
			return null;
		}
	} catch (error) {
		return null;
	}
};

module.exports = imdb_movie_trending;
