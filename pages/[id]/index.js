import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useQueryClient, useMutation } from 'react-query';
import { useMemo } from 'react';

import { CheckIcon, CheckedIcon } from '@/components/Icons';
import Rating from '@/components/Rating';
import Spinner from '@/components/Spinner';

import { useAllWatchedMedia, useMediaById } from '@/hooks/media';
import useToast from '@/hooks/toast';

import { removeMediaFromWatched, setMediaAsWatched } from '@/utils/fetch';

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

  const { mutate } = useMutation(
    watched ? removeMediaFromWatched : setMediaAsWatched,
    {
      onMutate: async media => {
        await queryClient.cancelQueries('allMediaWatched');
        const previousMedia = queryClient.getQueryData('allMediaWatched');
        const updatedMedia = [...previousMedia];

        watched
          ? queryClient.setQueryData(
              'allMediaWatched',
              updatedMedia.filter(
                eachValue => eachValue.imdbID !== media.imdbID
              )
            )
          : queryClient.setQueryData('allMediaWatched', old => [...old, media]);

        return { previousMedia };
      },
      onSuccess: () =>
        toast({
          title: `${media.Type} successfully set as ${
            watched ? 'not watched' : 'watched'
          }`,
          status: 'success',
        }),
      onError: () =>
        toast({
          title: 'Please try again later',
          status: 'error',
        }),
    }
  );

  if (isLoading || isLoadingWatchedMedia || !media) {
    return <Spinner />;
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
    const data = watched
      ? { imdbID }
      : { title: Title, poster: Poster, type: Type, year: Year, imdbID };
    mutate(data);
  };

  return (
    <Box
      minH="100vh"
      background="radial-gradient(circle, rgba(72,85,83,1) 0%, rgba(55,50,55,1) 100%);"
      pt={10}
      color="#eeeeee"
      pt={4}
    >
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
        <Box minW="450px">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="h3" size="lg" my={2} maxW="85%">
              {media.Title}
            </Heading>
            <Tooltip
              hasArrow
              label={`Set as ${watched ? 'not watched' : 'watched'}`}
              bg="gray.300"
              color="black"
              fontSize="sm"
            >
              <Button
                variant="outline"
                className={styles.watched_button}
                onClick={handleButtonClick}
              >
                {watched ? (
                  <CheckedIcon h={6} w={6} />
                ) : (
                  <CheckIcon h={6} w={6} />
                )}
              </Button>
            </Tooltip>
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
              <Rating value={media.Ratings[1].Value} img="rotten.svg" />
            )}
            {media.Type === 'movie' && media.Ratings[2] && (
              <Rating value={media.Ratings[2].Value} img="metacritic.svg" />
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
