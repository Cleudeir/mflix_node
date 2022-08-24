const Crawler = require("crawler");

const asyncCrawlerSingle = async  function (url) {

      const a = await  new Promise(
       function (resolve, reject){
        const c = new Crawler({
            maxConnections: 1,
            callback(error, res, done) {             
              if (error) {
                reject(null)
              }   
              resolve(res);                              
            },
          });

          c.queue(url);    
        });
        return a
}
module.exports = asyncCrawlerSingle;