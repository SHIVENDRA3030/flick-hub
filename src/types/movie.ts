
export interface Movie {
  id: number;
  title: string;
  poster: string;
  genre: string[];
  rating: number;
  year: number;
  size?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DownloadLink {
  id: string;
  movie_id: number;
  url: string;
  label?: string;
  created_at?: string;
}

export interface StreamingLink {
  id: string;
  movie_id: number;
  url: string;
  label?: string;
  created_at?: string;
}
