const normalizeText = require("./normalizeText.js");

const mix_movie = function (data_uauFlix, redeCanais_list) {
	if(redeCanais_list === undefined) {
		return data_uauFlix
	}
	console.log("mix : ",data_uauFlix.length, redeCanais_list.length)
	const result =[ ...data_uauFlix, ...redeCanais_list];

	return result;
};
module.exports = mix_movie;
