
export interface NetflixMovie {
  id: string;
  title: string;
  description: string | null;
  poster_url: string | null;
  content_type: string;
  release_year: number | null;
  genre: string[] | null;
  is_featured: boolean;
  season: number | null;
  episode: number | null;
  episode_title: string | null;
  created_at: string | null;
  updated_at: string | null;
  cast?: string[];
  awards?: string[];
  mood?: string[];
  duration?: string;
  maturity_rating?: string;
  episode_count?: number;
  season_count?: number;
  resolution?: string;
  runtime?: string;
}

export interface NetflixEmbedCode {
  id: string;
  movie_id: string;
  embed_code: string;
  embed_type?: 'iframe' | 'forum' | 'html' | 'default';
  embed_url?: string;
  thumbnail_url?: string;
  season: number | null;
  episode: number | null;
  episode_title: string | null;
  created_at: string | null;
  updated_at: string | null;
  duration?: string;
  resolution?: string;
  runtime?: string;
}

export interface NetflixContent {
  id: string;
  title: string;
  description: string | null;
  poster_url: string | null;
  content_type: string;
  release_year: number | null;
  genre: string[] | null;
  embed_code: string;
  embed_type?: 'iframe' | 'forum' | 'html' | 'default';
  embed_url?: string;
  thumbnail_url?: string;
  is_featured: boolean;
  season: number | null;
  episode: number | null;
  episode_title: string | null;
  created_at: string | null;
  updated_at: string | null;
  cast?: string[];
  awards?: string[];
  mood?: string[];
  duration?: string;
  maturity_rating?: string;
  episode_count?: number;
  season_count?: number;
  resolution?: string;
  runtime?: string;
}
