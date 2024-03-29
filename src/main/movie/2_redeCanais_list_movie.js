const asyncCrawlerList = require("../../components/asyncCrawlerList");
const Save = require("../../components/Save");


const redeCanais = async function (baseUrl, data) {
  const save = new Save("redeCanais_list_movie")
  const remenber = await save.verify(data)
  const resList = await asyncCrawlerList(baseUrl, remenber)

  for (let i = 0; i < resList.length; i++) {
    if (Number.isInteger(i / 10)) {
      console.log('redeCanais_list ', (i + 1), '/', resList.length)
    }

    const res = resList[i]
    let url = null;
    const { title, year, uuid, redeCanaisNamed } = remenber[i]
    if (!res) {
      await save.insert({
        uuid,
        title,
        url,
        year,
        redeCanaisNamed,
        error: true
      })
      continue;
    }
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
      await save.insert({ uuid, title, url, year, redeCanaisNamed, error: false })
    } else {
      await save.insert({ uuid, title, url, year, redeCanaisNamed, error: true })
    }
  }
  const result = await save.read()
  return result
};

module.exports = redeCanais;
