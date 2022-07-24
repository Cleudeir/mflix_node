const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const uauFlix = require('./src/crawler/uauFlix.js');
const imdbId = require('./src/tmdb/imdbId.js');
const list_movie = require('./src/crawler/redeCanais/movie/list_movie.js');
const link_movie = require('./src/crawler/redeCanais/movie/link_movie.js');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

const port = process.env.PORT || 3333

app.get('/',(req, res)=>{
  res.status(200).json("online")
})

app.post('/list',  (req, res) => {
  const {baseUrl,type,range} = req.body;
  if(!type || !range){
    res.status(200).json("Falta parameros")
    return null
  }
  uauFlix({type,range,send})
  async function send(props){
    const list  = props;
    console.log('list',list.length)
    if(!list || !type){
      res.status(200).json("Falta parameros")
      return null
    }
    const get = async () => {
      const arrayInfos = [];
      for (let i = 0; i < list.length; i += 1) {
        const imdb_id = list[i]
        const getFetch = imdbId({ imdb_id, type })
        arrayInfos.push(getFetch);
      }
      const result = await Promise.all(arrayInfos)
      return result
    };
    const pull = await get();

    const data_uauFlix = pull.filter((x) => x !== null);

    if(type==="movie"){
      list_movie({baseUrl,_result})
    }
    if(type==="tv"){
      res.status(200).json(data_uauFlix);
    }
    function _result(data_redecanis){   
      const data = []
      data_uauFlix.forEach((x,f)=>{
        const text1 = x.title
          .toUpperCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, "")

        const filter = data_redecanis.filter(y=>{
          const text2 = y.title
          .toUpperCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, "");

          return text2.includes(text1)}
        )
        
        if(filter[0] && filter.length === 1){
          link_movie({baseUrl, url: filter[0].url,_push})
        }
        else{
          data.push({...x, url: null})
          if(data_uauFlix.length-1 === f){
            console.log(f,data_uauFlix.length)
            // fs.writeFileSync(`data_${type}.json`, JSON.stringify(data))
            res.status(200).json(data);
          }
        }

        function _push(props){
          const url = props
          data.push({...x, url})
          if(data_uauFlix.length-1 === f){
            console.log(f,data_uauFlix.length)
            // fs.writeFileSync(`data_${type}.json`, JSON.stringify(data))
            res.status(200).json(data);
          }
        }        
      })
    }
    }
})


app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`)
})