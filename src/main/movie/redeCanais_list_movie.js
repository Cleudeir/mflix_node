const asyncCrawlerList = require("../../components/asyncCrawlerList");
const asyncCrawlerSingle = require("../../components/asyncCrawlerSingle");
const shuffle = require("../../components/shuffle");

const redeCanais = async function ({baseUrl,range}) {
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
      const [one] = url.split("-dublado-");
      const title = one.replace("/", "").split("-").join(" ");
      data.push({ title, url });
    }
  }

  const resList = await asyncCrawlerList(baseUrl, shuffle(data).slice(0,range))
  const result = []
  for(let j=0; j< resList.length; j++) {
    const res = resList[j]
    if(!res){
      continue;
    }
    const title = data[j].title
    let url = null;
    const { $ } = res;
    if (!$) {
      url =  null
    }
    const response = $("iframe");
    if (response && response[0] &&response[0].attribs && response[0].attribs.src  ) 
    {
      const [one, two] = response[0].attribs.src.split(".php");
      const url1 = one + "hlb" + ".php" + two;
      url = url1;
    
    } else {url =  null};    
    if(url){
      result.push({ title, url });
    }
  } 
  console.log('redeCanais ',result.length)
  return result
};


module.exports = redeCanais;
