import { useQuery } from "react-query";

import { fetchAllMediaWatchedByUser, fetchMediaById } from "@/utils/fetch";

export const useMediaById = (mediaId) => {
  const { isLoading, isError, data, error } = useQuery(
    ["movieOrSerie", mediaId],
    () => fetchMediaById(mediaId)
  );

  return { isLoading, isError, media: data, error };
};

export const useAllWatchedMediaByUser = (user) => {
  const { isLoading, isError, data, error } = useQuery("allMediaWatched", () =>
    fetchAllMediaWatchedByUser(user)
  );

  return {
    isLoadingWatchedMedia: isLoading,
    isErrorWatchedMedia: isError,
    allWatchedMedia: data,
    errorWatchedMedia: error,
  };
};
