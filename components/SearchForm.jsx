import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { CloseIcon, SearchIcon } from './Icons';

export default function SearchForm({ isLoading, searchValue, setSearchValue }) {
  const { register, handleSubmit, reset, watch } = useForm();

  const searchInputValue = watch('inputValue');

  const onSubmit = ({ inputValue }) => {
    setSearchValue(inputValue);
    localStorage.setItem('searchValue', inputValue);
  };

  const handleClearInput = () => {
    reset({ inputValue: '' });
    setSearchValue(null);
    localStorage.setItem('searchValue', '');
  };

  return (
    <Box mb={6}>
      <Flex as="form" onSubmit={handleSubmit(onSubmit)}>
        <Flex mr={2} flexDir="column">
          <InputGroup>
            <Input
              placeholder="Star Wars"
              type="text"
              defaultValue={searchValue}
              autoComplete="off"
              {...register('inputValue', { required: true })}
            />
            <InputRightElement
              children={
                searchInputValue ? (
                  <CloseIcon
                    color="red.600"
                    h="1.4em"
                    w="1.4em"
                    _active={{ transform: 'scale(0.95)', color: 'red.400' }}
                  />
                ) : null
              }
              onClick={handleClearInput}
              cursor="pointer"
            />
          </InputGroup>
        </Flex>
        <Button
          colorScheme="blue"
          type="submit"
          disabled={isLoading}
          rightIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Flex>
    </Box>
  );
}
