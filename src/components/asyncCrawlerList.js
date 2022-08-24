const Crawler = require("crawler");

const get = async  function (url) {
      const promise = await  new Promise(
       function (resolve, reject){
        const c = new Crawler({
            maxConnections: 1,
            retries: 0,
            callback(error, res, done) {             
              if (error) {
                resolve(null)
              }   
              resolve(res);                              
            },
          });
          c.queue(url);    
        });
        return promise
}

const asyncCrawlerList = async  function (baseUrl, list) {
  if(!list) return;
  const result = []
  for(let i= 0; i< list.length; i++){
    const LinkUrl = get(baseUrl+list[i].url);
    result.push(LinkUrl);
  }
  const promise = await Promise.all(result);
  return promise
}
module.exports = asyncCrawlerList;