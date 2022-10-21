const Crawler = require("crawler");
const Save = require("./Save");

const get = async function (url) {
  try {
    let promise = await new Promise((resolve, reject) => {
      const c = new Crawler({
        retries: 0,
        callback(error, res, done) {
          if (error) {
            reject()
          }
          resolve(res);
          done()
        }
      })
      c.queue(url);
    });
    return promise
  } catch (error) {
    console.log(error)
  }

}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const asyncCrawlerList = async function (baseUrl, list) {
  if (!list) return;
  const result = []
  for (let i = 0; i < list.length; i++) {
    
    if (Number.isInteger(i / 100)) {
      await sleep(1000)
      console.log(i, list.length)
    }
    if (list[i].url[0] !== "/") {
      console.log(list[i].url)
      continue
    }

    const LinkUrl = get(baseUrl + list[i].url)
    result.push(LinkUrl);

  }
  const promise = await Promise.all(result);
  return promise
}
module.exports = asyncCrawlerList;