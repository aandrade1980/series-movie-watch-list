export const fetchMoviesAndSeries = async searchValue => {
  if (searchValue) {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
    );
    const data = await response.json();

    return data.Search;
  }
};

export const fetchMediaById = async mediaId => {
  if (mediaId) {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${mediaId}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
    );

    return await response.json();
  }
};
