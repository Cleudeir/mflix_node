const RequestInfo =  async function({ id, type }) {
  const API_KEY = '5417af578f487448df0d4932bc0cc1a5';
  const API_BASE = 'https://api.themoviedb.org/3';
  const search = await fetch(`${API_BASE}/${type}/${id}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => null);
  if (search && search.genres && search.poster_path) {
    if (search.backdrop_path) {
      search.backdrop_path = `https://image.tmdb.org/t/p/original${search.backdrop_path}`;
    } else {
      search.backdrop_path = `https://image.tmdb.org/t/p/original${search.poster_path}`;
    }

    search.poster_path = `https://image.tmdb.org/t/p/w342${search.poster_path}`;

    if (search.genres[0]) {
      search.genres = await search.genres[0].name;
    } else if (search.genres[1]) {
      search.genres = await search.genres[1].name;
    } else if (search.genres[2]) {
      search.genres = await search.genres[2].name;
    } else {
      search.genres = 'Others';
    }
    if (type === 'movie') {
      const {
        backdrop_path,
        genres,
        original_title,
        overview,
        poster_path,
        runtime,
        title,
        vote_average,
      } = search;

      return {
        backdrop_path,
        genres,
        imdb_id: id,
        original_title,
        overview,
        poster_path,
        runtime,
        title,
        vote_average,
      };
    }
    if (type === 'tv') {
      const {
        backdrop_path,
        genres,
        original_title,
        overview,
        poster_path,
        runtime,
        original_name,
        vote_average,
        number_of_seasons,
      } = search;
      // buscar informação detalhada das temporadas
      const promisse_seasons_details = [];
      for (let i = 1; i <= number_of_seasons; i += 1) {
        const search_details = await fetch(
          `${API_BASE}/tv/${id}/season/${i}?api_key=${API_KEY}`,
        )
          .then((response) => response.json())
          .then((data) => data)
          .catch(() => null);
        if (search_details) {
          promisse_seasons_details.push(search_details);
        }
      }
      const info_seasons = promisse_seasons_details;
      const seasons = [];
      for (let j = 0; j < info_seasons.length; j += 1) {
        seasons.push(info_seasons[j].episodes.length);
      }
      return {
        seasons,
        backdrop_path,
        genres,
        imdb_id: id,
        original_title,
        overview,
        poster_path,
        runtime,
        title: original_name,
        vote_average,
      };
    }
  } else {
    return false;
  }
}
module.exports = RequestInfo