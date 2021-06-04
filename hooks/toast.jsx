import { useToast as useChakraToast } from '@chakra-ui/react';

const useToast = () => {
  const chakraToast = useChakraToast();

  const toastImplementation = config =>
    chakraToast({
      duration: 4500,
      isClosable: true,
      position: 'top',
      ...config,
    });

  return toastImplementation;
};

export default useToast;
