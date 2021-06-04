import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Avatar, Button, Flex, Text } from '@chakra-ui/react';

import { HomeIcon, WatchedListIcon } from './Icons';

export default function Header() {
  const [session] = useSession();
  const router = useRouter();
  const { asPath } = router;

  const handleClick = () => (session ? signOut() : signIn('google'));

  return (
    <Flex h="4rem" alignItems="center" justifyContent="space-between" px="2rem">
      <Flex
        alignItems="flex-end"
        justifyContent="space-between"
        width="115px"
        h="100%"
        fontSize="sm"
      >
        <Link href="/">
          <Flex
            flexDir="column"
            alignItems="center"
            cursor="pointer"
            _hover={{ textDecor: 'underline' }}
            borderBottom={asPath === '/' ? '3px solid #2B6CB0' : ''}
          >
            <HomeIcon h={8} w={8} />
            <Text fontSize="xs" _hover={{ textDecor: 'underline' }}>
              home
            </Text>
          </Flex>
        </Link>
        <Link href="/watched">
          <Flex
            flexDir="column"
            alignItems="center"
            cursor="pointer"
            _hover={{ textDecor: 'underline' }}
            borderBottom={asPath === '/watched' ? '2px solid #2B6CB0' : ''}
          >
            <WatchedListIcon h={8} w={8} />
            <Text fontSize="xs">watched</Text>
          </Flex>
        </Link>
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
