import { Input, HStack, Center } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const InputSearch = ({ value, handlerSearch }) => {
  return (
    <HStack maxW="100%" marginX="auto">
      <Input
        type="text"
        placeholder="Enter image you want to find?"
        value={value}
        onChange={handlerSearch}
        size="md"
        color="white"
        marginY="5"
        width="300px"
        zIndex="100"
        colorScheme="whiteAlpha"
        _placeholder={{
          color: '--chakra-gray-800',
        }}
      />
      <ColorModeSwitcher />
    </HStack>
  );
};

export default InputSearch;
