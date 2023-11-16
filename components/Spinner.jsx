import { Flex, Spinner as ChakraSpinner } from "@chakra-ui/react";

export default function Spinner() {
  return (
    <Flex
      h="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#485553"
    >
      <ChakraSpinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
}
