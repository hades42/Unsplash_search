import React, { useState, useCallback, useRef } from 'react';
import {
  Container,
  ChakraProvider,
  HStack,
  theme,
  Spinner,
  Box,
  Alert,
  AlertTitle,
  SimpleGrid,
} from '@chakra-ui/react';
import { useImageSearch } from './hooks/useImageSearch';
import InputSearch from './components/InputSearch';
import Card from './components/Card';

function App() {
  localStorage.clear();
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, images, hasMore } = useImageSearch(query, pageNumber);

  const observer = useRef();
  const lastImageRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  return (
    <ChakraProvider theme={theme}>
      <div>
        <HStack
          overflow="auto"
          maxH="100vh"
          position="sticky"
          width="100%"
          backgroundColor={'gray.500'}
          top="0px"
          zIndex="99"
        >
          <InputSearch value={query} handlerSearch={handleSearch} />
        </HStack>
        <Container maxW="container.xl" position="relative" marginBottom="5">
          <SimpleGrid
            columns={[1, 2, 2, 3]}
            style={{ marginTop: '50px' }}
            columnGap="2"
            rowGap="8"
          >
            {images.map((image, index) => {
              if (images.length === index + 1) {
                return (
                  <Card
                    key={image.id}
                    innerRef={lastImageRef}
                    imageDetail={image}
                  ></Card>
                );
              } else {
                return <Card key={image.id} imageDetail={image}></Card>;
              }
            })}
            <Box align="center">{loading && <Spinner size="xl" />}</Box>
            <div>
              {error && (
                <Alert status="error">
                  <AlertTitle>
                    Error Happens! (You could exceed the limit of request from
                    Unsplash)
                  </AlertTitle>
                </Alert>
              )}
            </div>
          </SimpleGrid>
        </Container>
      </div>
    </ChakraProvider>
  );
}

export default App;
