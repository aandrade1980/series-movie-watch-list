import Image from 'next/image';
import Link from 'next/link';
import { Box, Text, Tooltip } from '@chakra-ui/react';

import styles from '@/styles/Home.module.css';

const MovieList = ({ movies = [] }) => {
  return (
    <ul
      style={{
        display: 'flex',
        listStyleType: 'none',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        width: '80%',
        margin: '0 auto',
      }}
    >
      {movies.map(movie => (
        <Link href="/[id]" as={`/${movie.imdbID}`} key={movie.imdbID}>
          <li
            style={{
              width: 200,
              margin: 15,
              cursor: 'pointer',
            }}
          >
            <Box className={styles.poster_container}>
              <Image
                src={movie.Poster === 'N/A' ? '/no-poster.png' : movie.Poster}
                alt={movie.title}
                layout="responsive"
                height={444}
                width={300}
                className={styles.poster}
              />
            </Box>
            <Tooltip label={movie.Title} hasArrow bg="gray.300" color="black">
              <Text fontSize="sm" fontWeight="semibold" isTruncated mt={2}>
                {movie.Title}
              </Text>
            </Tooltip>
            <Text fontSize="xs" color="hsla(0,0%,100%,.45);">
              {movie.Year}
            </Text>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default MovieList;
