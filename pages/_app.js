import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";

import Header from "@/components/Header";

function MyApp({ Component, pageProps }) {
  const queryClientRef = React.useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider>
            <Header />
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
