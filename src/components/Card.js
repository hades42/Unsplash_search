import {
  Image,
  Box,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
const Card = ({ imageDetail, innerRef }) => {
  return (
    <LinkBox
      ref={innerRef}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderColor={useColorModeValue('gray.200', 'whiteAlpha.500')}
    >
      <Image src={imageDetail.urls.regular} alt={imageDetail.alt_description} />
      <Box p="6">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          <LinkOverlay href={imageDetail.links.html} isExternal>
            {imageDetail.description}
          </LinkOverlay>
        </Box>
        <Box>Published by: {imageDetail.user.username}</Box>
        <Box
          as="span"
          color={useColorModeValue('gray.600', 'whiteAlpha.800')}
          fontSize="sm"
        >
          {imageDetail.likes} Likes
        </Box>
      </Box>
    </LinkBox>
  );
};

export default Card;
