import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { useMemo } from 'react';
import { useQueryClient } from 'react-query';

import { useAllWatchedMedia, useMediaById } from 'hooks/hooks';

import { setMediaAsWatched } from '@/utils/fetch';

import styles from '@/styles/Home.module.css';

const MediaPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, isError, media, error } = useMediaById(id);
  const {
    isLoadingWatchedMedia,
    isErrorWatchedMedia,
    allWatchedMedia,
    errorWatchedMedia,
  } = useAllWatchedMedia();
  const queryClient = useQueryClient();
  const watched = useMemo(
    () => allWatchedMedia && allWatchedMedia.find(media => media.imdbID === id),
    [allWatchedMedia]
  );

  const toast = useToast();

  const { mutate } = useMutation(setMediaAsWatched, {
    onMutate: async media => {
      await queryClient.cancelQueries('allMediaWatched');
      const previousMedia = queryClient.getQueryData('allMediaWatched');

      queryClient.setQueryData('allMediaWatched', old => [...old, media]);

      return { previousMedia };
    },
    onSuccess: media =>
      toast({
        title: `${media.type} set as watched.`,
        status: 'success',
        duration: 4500,
        isClosable: true,
        position: 'top',
      }),
    onError: () =>
      toast({
        title: 'Please try again later',
        status: 'error',
        isClosable: true,
        duration: 4500,
        position: 'top',
      }),
  });

  if (isLoading || isLoadingWatchedMedia || !media) {
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

  if (isErrorWatchedMedia) {
    return console.error(
      'Error getting all media watched: ',
      errorWatchedMedia
    );
  }

  const handleButtonClick = () => {
    const { Title, Poster, Type, Year, imdbID } = media;
    mutate({ title: Title, poster: Poster, type: Type, year: Year, imdbID });
  };

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
            className={styles.arrow_back_icon}
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
            src={media.Poster === 'N/A' ? '/no-poster.png' : media.Poster}
            alt={media.title}
            layout="responsive"
            height={375}
            width={250}
            className={styles.poster}
          />
        </Box>
        <Box>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="h3" size="lg" my={2} maxW="85%">
              {media.Title}
            </Heading>
            <Button
              variant="outline"
              className={styles.watched_button}
              onClick={handleButtonClick}
              disabled={watched}
            >
              <svg
                className={styles.check_icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </Button>
          </Flex>
          <Text fontWeight="semibold" mb={2}>
            {media.Year}
          </Text>
          <HStack>
            <Text fontSize="sm" color="#919293" fontWeight="bold">
              {media.Runtime}
            </Text>
            <Text fontSize="sm" color="#919293" fontWeight="bold">
              {media.Rated}
            </Text>
            {media.Type === 'movie' && media.Ratings[1] && (
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
                  {media.Ratings[1].Value}
                </Text>
              </HStack>
            )}
            {media.Type === 'movie' && media.Ratings[2] && (
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
                  {media.Ratings[2].Value}
                </Text>
              </HStack>
            )}
          </HStack>
          <Box maxWidth="550px" mt={6}>
            <Text>{media.Plot}</Text>
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
            <Text fontSize="sm">{media.Released}</Text>
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
            <Text fontSize="sm">{media.Genre}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default MediaPage;
