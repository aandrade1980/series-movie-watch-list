import { Box, Flex } from '@chakra-ui/react';
import { useQuery } from 'react-query';

// Components
import MediaPoster from '@/components/MediaPoster';

import { fetchFavoritesMovies } from '@/utils/fetch';

import styles from '@/styles/Home.module.scss';

export default function Favorites() {
  const { isLoading, error, data } = useQuery(
    'favoritesMovies',
    fetchFavoritesMovies
  );

  if (error) return 'An error has occurred: ' + error.message;

  console.log('DATA => ', data);

  return (
    <Box
      minH="calc(100vh - 4rem)"
      backgroundImage="linear-gradient(to top, #09203f 0%, #537895 100%)"
      pt={10}
      color="#eeeeee"
    >
      {/* TODO: add a spinner */}
      {isLoading && <div>Loading...</div>}

      <Flex wrap="wrap" justify="center" align="center" gridGap={4}>
        {data &&
          data.map(({ id, image, title }) => (
            <Box key={id} w={200} className={styles.poster_container}>
              <MediaPoster
                poster={image}
                title={title}
                height={444}
                width={300}
              />
            </Box>
          ))}
      </Flex>
    </Box>
  );
}
