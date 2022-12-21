
const asyncCrawlerSingle = require("../../components/asyncCrawlerSingle");
var hash = require('object-hash');
const mapFilmes = async function (baseUrl) {
    const res = await asyncCrawlerSingle(`${baseUrl}/mapafilmes.html`)
    if(!res){
        mapFilmes(baseUrl)
    }
    const { $ } = res;
    const response = $('a:contains("Assistir")');
    const data = [];
    for (let i = 0; i < response.length; i++) {
        const url = response[i].attribs.href;
        if (
            url.includes("dublado") &&
            (url.includes("1080p") || url.includes("720p"))
        ) {
            const [one, two] = url.split("-dublado-");
            const [year] = two.split("-");
            const title = one.replace("/", "").split("-").join(" ");
            data.push({ uuid: hash({ title, url, year }, { algorithm: 'sha1' }), title, url, year, redeCanaisNamed: title });
        }
    }
    console.log('mapFilmes: ', data.length)
    return data
}
module.exports = mapFilmes;