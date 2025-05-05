interface Media {
  id: number;
  type: string;
  original_title: string;
  year: number;
  duration_in_seconds: number | null;
  number: number | null;
  parent_id: number | null;
  title: string;
  synopsis: string;
  classification: Classification;
  stream_info: string | null;
  genres: Genre[];
  deeplinkings: Deeplinking[];
  images: MediaImages;
}

interface Classification {
  id: number;
  name: string;
  description: string;
}

interface Genre {
  id: number;
  code: string;
  name: string;
  image: GenreImage;
}

interface GenreImage {
  id: number;
  locale: string;
  dominant_color: {
    image: string;
  };
  image: string;
}

interface Deeplinking {
  app: App;
  url: string;
}

interface App {
  id: number;
  name: string;
  code: string;
  content_list_app_type: string;
  dominant_color: {
    icon: string;
    background_image: string | null;
    icon_landscape: string | null;
  };
  kind: string;
  provider: string | null;
  icon: string;
  type: string;
  url: string;
  app_type: string;
  resolution: string;
  content_list_app_name: string;
  description: string;
  background_image: string;
  logo: string | null;
  icon_landscape: string;
  app_category_ids: number[];
  category_ids: number[];
  classification: Classification;
}

interface MediaImages {
  id: number;
  locale: string;
  dominant_color: {
    artwork_portrait: string | null;
    artwork_landscape: string | null;
    screenshot_portrait: string | null;
    screenshot_landscape: string | null;
  };
  artwork_portrait: string | null;
  artwork_landscape: string | null;
  screenshot_portrait: string | null;
  screenshot_landscape: string | null;
  transparent_logo: string | null;
}

export type { Media };
