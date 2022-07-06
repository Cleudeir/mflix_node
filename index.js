const express = require('express');
const bodyParser = require('body-parser');
const RequestInfo = require('./RequestInfo.js');
const app = express()
const port = 3333
const Crawler = require('crawler');
const HtmlTableToJson = require('html-table-to-json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.post('/crawling', (req, res) => {
  const {type} = req.body;
  console.log(type)
  const arrayIdSort = [];
  const resultIds = [];
  let resultFilter = [];
  const c = new Crawler({
    maxConnections: 5,
    // This will be called for each crawled page
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
            .filter((x) => x.date >= 2021)
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
            .filter((x) => x.date >= 2021)
            .filter((x) => x !== false);
          resultFilter.map((x) => resultIds.push(x.id));
        }
        res.status(200).json(resultIds.slice(0, 5));
      }
    },
  });
  if (type === 'movie') {
    c.queue('https://embed.uauflix.online/admin/todos-filmes');
  }
  if (type === 'tv') {
    c.queue('https://embed.uauflix.online/admin/todas-series');
  }


})
app.post('/themoviedb', async(req, res) => {
  console.log('themoviedb ',req.body)
 
  const { library, type } = req.body;
  const get = async () => {
    const arrayInfos = [];
    for (let i = 0; i < library.length; i += 1) {
      const getFetch = RequestInfo({ id: library[i], type }).then(
        (data) => data,
      );
      arrayInfos.push(getFetch);
    }
    return Promise.all(arrayInfos).then((x) => x);
  };
  const pull = await get();
  const result = pull.filter((x) => x !== false);
  res.status(200).json(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}/`)
})