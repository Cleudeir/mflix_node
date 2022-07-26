const Crawler = require("crawler");
const HtmlTableToJson = require("html-table-to-json");

const list_movie = function ({ range, send }) {
	const arrayIdSort = [];
	const resultIds = [];
	let resultFilter = [];
	const c = new Crawler({
		maxConnections: 5,
		callback(error, resp, done) {
			if (error) {
				console.log(error);
			} else {
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
					.filter((x) => x.date >= 2020)
					.filter((x) => x !== false);
				resultFilter.map((x) => resultIds.push(x.id));

				send(resultIds.slice(0, range));
			}
		},
	});
	c.queue("https://embed.uauflix.online/admin/todos-filmes");
};

module.exports = list_movie;
