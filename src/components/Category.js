async function Category(data) {
  //--
  // Criar Array com gêneros
  const genresSingle = new Set();
  data.map((item) => genresSingle.add(item.genres));
  const genres = Array.from(genresSingle).sort();
  //--
  // Criar Array categorizado por gênero
  const result = [];
  const filterVote = data.filter((x) => +x.vote_average > 5 && x.error === false);
  for (let i = 0; i < genres.length; i += 1) {
    const genre = filterVote.filter((x) => x.genres === genres[i]);
    if (genre.length > 0) {
      result.push(genre.slice(0, 300));
    }
  }
  return result;
}
module.exports = Category;
