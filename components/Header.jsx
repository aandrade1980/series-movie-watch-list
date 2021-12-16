import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Avatar, Button, Flex } from '@chakra-ui/react';

import HeaderOption from './HeaderOption';

import { HomeIcon, WatchedListIcon, Favorites } from './Icons';

export default function Header() {
  const [session] = useSession();
  const router = useRouter();
  const { asPath } = router;

  const handleClick = () => (session ? signOut() : signIn('google'));

  return (
    <Flex
      h="4rem"
      alignItems="center"
      justifyContent="space-between"
      px="2rem"
      position="sticky"
      top="0"
      backgroundColor="rgba(255,255,255,0.5)"
      zIndex="1"
      style={{ backdropFilter: 'blur(5px)' }}
    >
      <Flex
        alignItems="flex-end"
        justifyContent="flex-start"
        gridGap={6}
        h="100%"
        fontSize="sm"
      >
        <HeaderOption asPath={asPath} path="/" text="Home">
          <HomeIcon h={7} w={7} />
        </HeaderOption>
        {session && (
          <HeaderOption asPath={asPath} path="/watched" text="Watched">
            <WatchedListIcon h={7} w={7} />
          </HeaderOption>
        )}
        <HeaderOption asPath={asPath} path="/favorites" text="Favorites">
          <Favorites h={7} w={7} />
        </HeaderOption>
      </Flex>
      <Flex alignItems="center">
        <Button variant="ghost" mr={2} onClick={handleClick}>
          {session ? 'Log Out' : 'Log In'}
        </Button>
        <Avatar size="sm" src={session?.user?.image} />
      </Flex>
    </Flex>
  );
}
