import { useQuery } from 'react-query';

import { fetchAllMediaWatched, fetchMediaById } from '@/utils/fetch';

export const useMediaById = mediaId => {
  const { isLoading, isError, data, error } = useQuery(
    ['movieOrSerie', mediaId],
    () => fetchMediaById(mediaId)
  );

  return { isLoading, isError, media: data, error };
};

export const useAllWatchedMedia = () => {
  const { isLoading, isError, data, error } = useQuery(
    'allMediaWatched',
    fetchAllMediaWatched
  );

  return {
    isLoadingWatchedMedia: isLoading,
    isErrorWatchedMedia: isError,
    allWatchedMedia: data,
    errorWatchedMedia: error,
  };
};
