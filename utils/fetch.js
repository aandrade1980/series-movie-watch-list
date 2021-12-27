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

export const fetchAllMediaWatchedByUser = async user => {
  const response = await fetch(`api/media/?user=${user}`);

  const result = await response.json();

  if (!result.success) {
    throw new Error('Error getting all media Watched');
  }

  return result.data;
};

export const fetchFavoritesMovies = async () => {
  const response = await fetch(
    'https://imdb-api.com/en/API/MostPopularMovies/k_vfdxkroo'
  );

  const jsonResponse = await response.json();

  if (jsonResponse.errorMessage) {
    throw new Error(
      `Error getting favorites movies: ${jsonResponse.errorMessage}`
    );
  }

  return jsonResponse.items;
};

export const setMediaAsWatched = async media => {
  const response = await fetch('api/media', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(media),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data;
};

export const removeMediaFromWatched = async mediaId => {
  const response = await fetch('api/media', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mediaId),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data;
};
