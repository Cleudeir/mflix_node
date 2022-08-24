async function category(data) {
  //--
  // Criar Array com gêneros
  const genresSingle = new Set();
  data.map((item) => genresSingle.add(item.genres));
  const genres = Array.from(genresSingle).sort();
  //--
  // Criar Array categorizado por gênero
  const result = [];

  const vote = data.filter((x) => +x.vote_average > 7);
  for (let i = 0; i < genres.length; i += 1) {
    const genre = vote.filter((x) => x.genres === genres[i]);
    if(genre.length > 0){
      result.push(genre.slice(0,100));
    }
  }
  return result;
}
module.exports = category;
