import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Flex, Heading, Text, Spinner, HStack } from '@chakra-ui/react';
import { useQuery } from 'react-query';

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

  if (isError) {
    return console.error('Error getting media info: ', error);
  }

  return (
    <Box
      minH="100vh"
      background="radial-gradient(circle, rgba(72,85,83,1) 0%, rgba(55,50,55,1) 100%);"
      pt={10}
      color="#eeeeee"
      pt={4}
    >
      <Box ml={4}>
        <Link href="/">
          <svg
            className={styles.arrow_back_icons}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
        </Link>
      </Box>
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
          <HStack>
            <Text fontSize="sm" color="#919293" fontWeight="bold">
              {data.Runtime}
            </Text>
            <Text fontSize="sm" color="#919293" fontWeight="bold">
              {data.Rated}
            </Text>
            {data.Type === 'movie' && data.Ratings[1] && (
              <HStack spacing="2.5px">
                <Box
                  backgroundImage="url('/img/rotten.svg')"
                  backgroundPosition="100%"
                  backgroundSize="contain"
                  backgroundRepeat="no-repeat"
                  width="1.2em"
                  height="24px"
                />
                <Text
                  fontSize="sm"
                  color="#919293"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  ml={0}
                >
                  {data.Ratings[1].Value}
                </Text>
              </HStack>
            )}
            {data.Type === 'movie' && data.Ratings[2] && (
              <HStack spacing="2.5px">
                <Box
                  backgroundImage="url('/img/metacritic.svg')"
                  backgroundPosition="100%"
                  backgroundSize="contain"
                  backgroundRepeat="no-repeat"
                  width="1.2em"
                  height="24px"
                />
                <Text
                  fontSize="sm"
                  color="#919293"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  ml={0}
                >
                  {data.Ratings[2].Value}
                </Text>
              </HStack>
            )}
          </HStack>
          <Box maxWidth="550px" mt={6}>
            <Text>{data.Plot}</Text>
          </Box>
          <Flex mt={6} alignItems="center">
            <Text
              fontSize="sm"
              textTransform="uppercase"
              color="hsl(330,5%,60%)"
              mr={6}
              fontWeight="semibold"
            >
              Released
            </Text>
            <Text fontSize="sm">{data.Released}</Text>
          </Flex>
          <Flex alignItems="center">
            <Text
              fontSize="sm"
              textTransform="uppercase"
              color="hsl(330,5%,60%)"
              mr={12}
              fontWeight="semibold"
            >
              Genre
            </Text>
            <Text fontSize="sm">{data.Genre}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default MediaPage;
