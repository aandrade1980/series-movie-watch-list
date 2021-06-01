import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { Spinner } from '@chakra-ui/spinner';

import { fetchMediaById } from '@/utils/fetch';

import styles from '@/styles/Home.module.css';

const MediaPage = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log('ID => ', id);

  const { isLoading, isError, data, error } = useQuery(
    ['movieOrSerie', id],
    () => fetchMediaById(id)
  );

  console.log('Data => ', data);

  if (isLoading || !data) {
    return (
      <Flex
        h="100vh"
        justifyContent="center"
        alignItems="center"
        backgroundColor="#485553"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <Box minH="100vh" backgroundColor="#485553" pt={10} color="#eeeeee">
      <Flex mt={8} mx={24}>
        <Box
          height="375px"
          width="250px"
          mr={8}
          style={{
            boxShadow: '0 -2px 10px rgba(0, 0, 0, 1)',
            borderRadius: '2%',
          }}
        >
          <Image
            src={data.Poster === 'N/A' ? '/no-poster.png' : data.Poster}
            alt={data.title}
            layout="responsive"
            height={375}
            width={250}
            className={styles.poster}
          />
        </Box>
        <Box>
          <Heading as="h3" size="lg" my={2}>
            {data.Title}
          </Heading>
          <Text fontWeight="semibold" mb={2}>
            {data.Year}
          </Text>
          <Text fontSize="sm" color="#919293" fontWeight="semibold">
            {data.Runtime} {data.Rated}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default MediaPage;
