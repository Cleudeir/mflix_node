const list_movie = require("./crawler/redeCanais/movie/list_movie.js");
const link_movie = require("./crawler/redeCanais/movie/link_movie.js");
const normalizeText = require("./components/normalizeText.js");

const movie = function ({ baseUrl, data_uauFlix, saveSend }) {
	list_movie({ baseUrl, _result });
	function _result(data) {
		const result = [];

		for (let f = 0; f < data_uauFlix.length; f++) {
			const x = data_uauFlix[f];
			const text1 = normalizeText(x.title);
			const filterData = data.filter((y) => {
				const text2 = normalizeText(y.title);
				return text2.includes(text1);
			});

			if (filterData.length === 1) {
				link_movie({ baseUrl, url: filterData[0].url, _push });
				function _push(props) {
					const url = props;
					result.push({ ...x, url });
					if (data_uauFlix.length - 1 === f) {
						saveSend(result);
					}
				}
			} else {
				result.push(x);
				if (data_uauFlix.length - 1 === f) {
					saveSend(result);
				}
			}
		}
	}
};
module.exports = movie;
