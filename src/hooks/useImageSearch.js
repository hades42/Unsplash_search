import { useState, useEffect } from 'react';
import axios from 'axios';

const secretKey = process.env.REACT_APP_UNSPLASH_SECRET;

export const useDebounce = () => {
  const [typingTimeout, setTypingTimeout] = useState('');

  function debounced(func, wait = 500) {
    clearTimeout(typingTimeout);
    const timeout = setTimeout(() => func(), wait);
    setTypingTimeout(timeout);
  }
  return debounced;
};

export const useImageSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const debounced = useDebounce();

  const fetchImage = () => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: 'https://api.unsplash.com/search/photos',
      params: { page: pageNumber, query: query },
      cancelToken: new axios.CancelToken(c => (cancel = c)),
      headers: {
        Authorization: `Client-ID ${secretKey}`,
      },
    })
      .then(res => {
        setImages(prevImage => [...prevImage, ...res.data.results]);
        setLoading(false);
        if (pageNumber > res.data.total_pages) {
          setHasMore(false);
        } else setHasMore(true);
      })
      .catch(err => {
        if (axios.isCancel(err)) return;
        setError(true);
        setLoading(false);
      });
    return () => cancel();
  };

  useEffect(() => {
    setImages([]);
  }, [query]);

  useEffect(() => {
    debounced(() => fetchImage());
  }, [query, pageNumber]);

  return { loading, error, images, hasMore };
};
