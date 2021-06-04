import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { SearchIcon } from './Icons';

export default function SearchForm({ isLoading, searchValue, setSearchValue }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ inputValue }) => {
    setSearchValue(inputValue);
    localStorage.setItem('searchValue', inputValue);
  };

  return (
    <Box mb={6}>
      <Flex as="form" onSubmit={handleSubmit(onSubmit)}>
        <Flex mr={2} flexDir="column">
          <Input
            placeholder="Star Wars"
            type="text"
            defaultValue={searchValue}
            {...register('inputValue', { required: true })}
          />
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
