const Crawler = require('crawler');
const HtmlTableToJson = require('html-table-to-json');

const uauFlix = function ({type,range,send}){
    console.log(type)
    const arrayIdSort = [];
    const resultIds = [];
    let resultFilter = [];
    const c = new Crawler({
      maxConnections: 5,
      callback(error, resp, done) {
        if (error) {
          console.log(error);
        } else {
          const { $ } = resp;
          const table = $('table').html();
          const mount = `<table>${table}</table>`;
          // html to json
          const json = HtmlTableToJson.parse(mount);
          const result = json._results[0].reverse();
          // --
          if (type === 'movie') {
            result.map((x) => {
              arrayIdSort.push({
                id: x.IMDB,
                date: +x['Data de publicação'].slice(0, 4),
              });
            });
            resultFilter = arrayIdSort
              .filter((x) => x.date >= 2020)
              .filter((x) => x !== false);
            resultFilter.map((x) => resultIds.push(x.id));
          }
          //--
          if (type === 'tv') {
            result.map((x) => {
              arrayIdSort.push({
                id: x['ID - THEMOVIEDB'],
                date: +x['Última atualização'].slice(0, 4),
              });
            });
            resultFilter = arrayIdSort
              .filter((x) => x.date >= 2020)
              .filter((x) => x !== false);
            resultFilter.map((x) => resultIds.push(x.id));
          }
          send(resultIds.slice(0, range))          
        }
      },
    });
    if (type === 'movie') {
      c.queue('https://embed.uauflix.online/admin/todos-filmes');
    }
    if (type === 'tv') {
      c.queue('https://embed.uauflix.online/admin/todas-series');
    }
}

module.exports = uauFlix;