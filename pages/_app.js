import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import Header from "@/components/Header";

function MyApp({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}) {
  const queryClientRef = React.useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={dehydratedState}>
          <ChakraProvider>
            <Header />
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
