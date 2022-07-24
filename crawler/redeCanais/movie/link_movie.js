const Crawler = require('crawler');

const link_movie = async function ({baseUrl, url,_push}){
      const c =  new Crawler({
        maxConnections: 5,
        callback(error, resp, done) {
            if(error){
                return null
            }         
            const { $ } = resp;
            const response = $('iframe')
            if(response && response[0] && response[0].attribs && response[0].attribs.src){                      
                const [one,two] = response[0].attribs.src.split(".php")                 
                const url = one+"hlb"+".php"+two
                _push(url)
            }
            else(_push(null))
        }
        })
   c.queue(`${baseUrl}${url}`)
}
module.exports = link_movie