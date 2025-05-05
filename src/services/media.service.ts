import { ApiResponse } from '../types/api.type';
import { Media } from '../types/media.type';

interface FetchError {
  error: string;
}

const fetchMedia = async (): Promise<
  ApiResponse<Media> | FetchError | undefined
> => {
  const url =
    // 'https://acc01.titanos.tv/v1/genres/14/contents?market=es&device=tv&locale=es&page=1&per_page=50'; // no items
    // 'https://acc01.titanos.tv/v1/genres/14/contents?market=es&device=tv'; // error from server
    // 'https://acc01.titanos.tv/v1/youtube/contents?market=gb&device=tv&locale=en&firmware=unset&page=1&per_page=14';
    'https://acc01.titanos.tv/v1/genres/12/contents?market=gb&device=tv&locale=en&page=1&per_page=10';

  try {
    const response = await fetch(url);
    const json = await response.json();

    if (json.errors) throw new Error(`can't fetch items from ${url}`);

    return json;
  } catch (error) {
    console.log(error);
    return {
      error: 'Error fetching items. Please try again.',
    };
  }
};

export { fetchMedia };
