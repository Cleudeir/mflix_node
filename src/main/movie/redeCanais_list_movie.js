const asyncCrawlerList = require("../../components/asyncCrawlerList");
const asyncCrawlerSingle = require("../../components/asyncCrawlerSingle");

const redeCanais = async function (baseUrl) {
  const res = await asyncCrawlerSingle(`${baseUrl}/mapafilmes.html`)
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
      data.push({ title, url, year });
    }
  }

  const resList = await asyncCrawlerList(baseUrl, data)
  const result = []
  for (let i = 0; i < resList.length; i++) {
    console.log('redeCanais_list ', i, '/', resList.length)
    const res = resList[i]
    if (!res) {
      continue;
    }
    const { title, year } = data[i]
    let url = null;
    const { $ } = res;
    if (!$) {
      url = null
    }
    const response = $("iframe");
    if (response && response[0] && response[0].attribs && response[0].attribs.src) {
      const [one, two] = response[0].attribs.src.split(".php");
      const url1 = one + "hlb" + ".php" + two;
      url = url1;

    } else { url = null };
    if (url) {
      result.push({ title, url, year });
    }
  }
  console.log('redeCanais ', result.length)
  return result
};


module.exports = redeCanais;
