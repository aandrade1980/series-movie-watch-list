import Image from 'next/image';

const MovieList = ({ movies = [] }) => {
  const handleMovieClick = imdbID => {
    console.log('CLICK EN LA IMG!!! => ', imdbID);
  };

  return (
    <ul
      style={{
        display: 'flex',
        listStyleType: 'none',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
      }}
    >
      {movies.map(movie => (
        <li
          key={movie.imdbID}
          style={{
            width: 180,
            margin: 15,
            cursor: 'pointer',
          }}
        >
          {movie.Title}

          <Image
            src={movie.Poster === 'N/A' ? '/no-poster.png' : movie.Poster}
            alt={movie.title}
            layout="responsive"
            height={300}
            width={250}
            onClick={() => handleMovieClick(movie.imdbID)}
          />
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
