import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";
import {
  Avatar,
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import HeaderOption from "./HeaderOption";

import { DarkModeIcon, HomeIcon, WatchedListIcon } from "./Icons";

export default function Header() {
  const [session] = useSession();
  const router = useRouter();
  const { asPath } = router;
  const { toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("white", "gray.600");

  const handleClick = () =>
    session ? signOut({ callbackUrl: "/" }) : signIn("google");

  return (
    <Flex
      h="4rem"
      alignItems="center"
      justifyContent="space-between"
      px="2rem"
      position="sticky"
      top="0"
      backgroundColor={bgColor}
      zIndex="1"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <Flex
        alignItems="flex-end"
        justifyContent="space-between"
        width="115px"
        h="100%"
        fontSize="sm"
      >
        <HeaderOption asPath={asPath} path="/" text="home">
          <HomeIcon h={7} w={7} />
        </HeaderOption>
        {session && (
          <HeaderOption asPath={asPath} path="/watched" text="watched">
            <WatchedListIcon h={7} w={7} />
          </HeaderOption>
        )}
      </Flex>
      <Flex alignItems="center">
        <Button onClick={toggleColorMode} mr={1}>
          <DarkModeIcon h={6} w={6} />
        </Button>
        <Button variant="ghost" mr={2} onClick={handleClick}>
          {session ? "Log Out" : "Log In"}
        </Button>
        <Avatar size="sm" src={session?.user?.image} />
      </Flex>
    </Flex>
  );
}
