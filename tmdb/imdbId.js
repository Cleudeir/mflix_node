const api  = require("./api");
const fetch = (...args) => import('node-fetch')
	.then(({default: fetch}) => fetch(...args));

const imdbId = async function ({imdb_id,type}) {

  const pullInfo = await fetch(`${api.url}/${type}/${imdb_id}?api_key=${api.key}&language=pt-BR`)
  const jsonInfo = await pullInfo.json()

  if (jsonInfo && jsonInfo.genres && jsonInfo.poster_path) {
    if (jsonInfo.backdrop_path) {
      jsonInfo.backdrop_path = `https://image.tmdb.org/t/p/original${jsonInfo.backdrop_path}`;
    } else {
      jsonInfo.backdrop_path = `https://sportbuzz.uol.com.br/media/_versions/douglascosta_82934045_116411013185365_8270789263511275541_n_widelg.jpg`;
    }

    jsonInfo.poster_path = `https://image.tmdb.org/t/p/w342${jsonInfo.poster_path}`;

    if (jsonInfo.genres[0]) {
      jsonInfo.genres = await jsonInfo.genres[0].name;
    } else if (jsonInfo.genres[1]) {
      jsonInfo.genres = await jsonInfo.genres[1].name;
    } else if (jsonInfo.genres[2]) {
      jsonInfo.genres = await jsonInfo.genres[2].name;
    } else {
      jsonInfo.genres = 'Others';
    }
    if (type === 'movie') {
      const {
        backdrop_path,
        genres,
        original_title,
        overview,
        poster_path,
        title,
        vote_average,
      } = jsonInfo;

      return {
        backdrop_path,
        genres,
        imdb_id,
        original_title,
        overview,
        poster_path,
        title,
        vote_average,
      };
    }
    if (type === 'tv') {
      const {
        backdrop_path,
        genres,
        overview,
        poster_path,
        original_name,
        name,
        vote_average,
        seasons      
      } = jsonInfo;

      const seasonsEpisodes = []
      for (let n = 0; n < seasons.length; n++) {
        const {episode_count} = seasons[n];
        seasonsEpisodes.push(episode_count)
      }
      return {
        seasons: seasonsEpisodes,
        backdrop_path,
        genres,
        imdb_id,
        original_title: original_name,
        title: name,
        overview,
        poster_path,
        vote_average,
      };
    }
  } else {
    return null;
  }
}

module.exports = imdbId;