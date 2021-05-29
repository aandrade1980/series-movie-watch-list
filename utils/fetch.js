export const fetchMoviesAndSeries = async searchValue => {
  if (searchValue) {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
    );
    const data = await response.json();

    return data.Search;
  }
};
