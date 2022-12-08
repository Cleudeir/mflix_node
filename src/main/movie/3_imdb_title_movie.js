const Save = require("../../components/Save");

const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const get = async function (item) {
	const api = {
		url: "https://api.themoviedb.org/3",
		key: "5417af578f487448df0d4932bc0cc1a5",
	};
	try {
		const title = item.title.toLowerCase().split(" ").join("+")
		const { uuid, redeCanaisNamed, year } = item
		const pullInfo = await fetch(
			url = `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=pt-BR&api_key=${api.key}&query=${title}&year=${year}`
		);
		const jsonInfo = await pullInfo.json();
		if (jsonInfo.results && jsonInfo.results[0] && jsonInfo.results[0].id) {
			return {
				uuid,
				imdb_id: jsonInfo.results[0].id,
				url: item.url,
				redeCanaisNamed,
				year,
				error: false
			}
		} else {
			return { ...item, error: true };
		}
	} catch (error) {
		return { ...item, error: true };
	}
};

const imdb_title_movie = async (list) => {

	const save = new Save("imdb_title_movie")
	const remenber = await save.verify(list)
	for (let i = 0; i < remenber.length; i += 1) {
		console.log('title_imdb_movie', i, '/', remenber.length)
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
	console.log('fim_title_imdb_movie', remenber.length)
	return filter;
};

module.exports = imdb_title_movie;
