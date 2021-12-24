import { Box, HStack, Text } from "@chakra-ui/react";

export default function Rating({ value, img }) {
  return (
    <HStack spacing="2.5px">
      <Box
        backgroundImage={`url(/img/${img})`}
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
        {value}
      </Text>
    </HStack>
  );
}
