import { useSession } from "next-auth/react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

import { useAllWatchedMediaByUser } from "@/hooks/media";

import Spinner from "@/components/Spinner";
import MovieList from "@/components/MovieList";

export default function Watched() {
  const { data: session } = useSession();

  const {
    isLoadingWatchedMedia,
    isErrorWatchedMedia,
    allWatchedMedia,
    errorWatchedMedia,
  } = useAllWatchedMediaByUser(session?.user?.email);

  if (isLoadingWatchedMedia || !allWatchedMedia) {
    return <Spinner />;
  }

  if (isErrorWatchedMedia) {
    return console.error("Error getting media watched: ", errorWatchedMedia);
  }

  return (
    <>
      <Head>
        <title>Watched movies</title>
        <meta name="description" content="Watched movies" />
      </Head>
      <Box
        minH="calc(100vh - 4rem)"
        backgroundImage="linear-gradient(to top, #09203f 0%, #537895 100%)"
        pt={10}
        color="#eeeeee"
      >
        {allWatchedMedia && (
          <div>
            <MovieList movies={allWatchedMedia} />
          </div>
        )}
      </Box>
    </>
  );
}
