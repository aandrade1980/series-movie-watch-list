import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Avatar, Button, Flex, Text } from '@chakra-ui/react';

import styles from '@/styles/Home.module.css';

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.header_icons}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.header_icons}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
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
