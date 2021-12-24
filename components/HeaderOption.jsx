import Link from "next/link";
import { Flex, Text } from "@chakra-ui/react";

export default function HeaderOption({ asPath, children, path, text }) {
  return (
    <Link href={path} passHref>
      <Flex
        flexDir="column"
        alignItems="center"
        cursor="pointer"
        _hover={{ textDecor: "underline" }}
        borderBottom={asPath === path ? "3px solid #2B6CB0" : ""}
      >
        {children}
        <Text fontSize="xs">{text}</Text>
      </Flex>
    </Link>
  );
}
