const Crawler = require("crawler");
const HtmlTableToJson = require("html-table-to-json");
const asyncCrawlerSingle = require("../../components/asyncCrawlerSingle");

const list_movie = async function (range) {
	const arrayIdSort = [];
	const resultIds = [];
	let resultFilter = [];
	const resp = await asyncCrawlerSingle("https://embed.uauflix.online/admin/todos-filmes")
	const { $ } = resp;
	const table = $("table").html();
	const mount = `<table>${table}</table>`;
	const json = HtmlTableToJson.parse(mount);
	const result = json._results[0].reverse();
	result.map((x) => {
		arrayIdSort.push({
			id: x.IMDB,
			date: +x["Data de publicação"].slice(0, 4),
		});
	});
	resultFilter = arrayIdSort
		.filter((x) => x.date >= 1900)
		.filter((x) => x !== false);
	 resultFilter.map((x) => resultIds.push({imdb_id: x.id}));
	 const filter = resultIds.slice(0, range)
	 return filter
};

module.exports = list_movie;
