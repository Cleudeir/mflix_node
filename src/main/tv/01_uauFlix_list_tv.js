const Crawler = require("crawler");
const HtmlTableToJson = require("html-table-to-json");
const asyncCrawlerSingle = require("../../components/asyncCrawlerSingle");
var hash = require('object-hash');

const list_tv = async function () {

	const arrayIdSort = [];
	const resultIds = [];
	let resultFilter = [];

	const resp = await asyncCrawlerSingle("https://embed.uauflix.online/admin/todas-series")
	const { $ } = resp;
	const table = $("table").html();
	const mount = `<table>${table}</table>`;
	// html to json
	const json = HtmlTableToJson.parse(mount);
	const result = json._results[0].reverse();
	//--
	result.map((x) => {
		arrayIdSort.push({
			id: x["ID - THEMOVIEDB"],
			date: +x["Última atualização"].slice(0, 4),
		});
	});
	resultFilter = arrayIdSort
		.filter((x) => x.date >= 1900)
		.filter((x) => x !== false);
	resultFilter.map((x) => resultIds.push(
		{
			imdb_id: x.id,
			uuid: hash({ imdb_id: x.id }, { algorithm: 'sha1' })
		}
	));
	return resultIds
};

module.exports = list_tv;
