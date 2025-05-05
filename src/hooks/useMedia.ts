import { useEffect, useState } from 'react';
import type { Media } from '../types/media.type';
import { fetchMedia } from '../services/media.service';

const useMedia = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchMedia();

        if (response) {
          if ('collection' in response) {
            const { collection } = response;
            if (collection.length) {
              setMedia(collection);
            } else {
              setError('No items to show');
            }
          } else if ('error' in response && response.error) {
            setError(response.error);
          }
        } else {
          setError('No response received');
        }
      } catch (error) {
        console.log(error);
        setError('Failed to fetch media');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { media, loading, error };
};

export default useMedia;
