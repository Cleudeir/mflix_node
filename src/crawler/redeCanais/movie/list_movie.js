const Crawler = require('crawler')

const redeCanais = function ({baseUrl,_result}){
    const c = new Crawler({
        maxConnections: 5,
        callback (error, res, done) {    
            if(error){
              return null
            } 
            const $ = res['$']
            const response = $('a:contains("Assistir")');            
            const result = []
              for (let i = 0; i < response.length; i++) {
                const url = response[i].attribs.href;          
                if(url.includes('dublado') && (url.includes('1080p') || url.includes('720p'))){
                  const [one] = url.split('-dublado-')
                  const title = one.replace('/','').split("-").join(' ')
                  result.push({title, url})        
                }
              }
              _result(result)
              done();
          }
        })
        c.queue(`${baseUrl}/mapafilmes.html`)
}
module.exports = redeCanais