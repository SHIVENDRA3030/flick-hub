
export interface NetflixContent {
  id: string;
  title: string;
  description: string | null;
  poster_url: string | null;
  content_type: string;
  release_year: number | null;
  genre: string[] | null;
  is_featured: boolean;
  embed_code: string | null;
  embed_type: string;
  embed_url: string | null;
  thumbnail_url: string | null;
  duration: string | null;
  resolution: string | null;
  runtime: string | null;
  actors: string[] | null;
  mood: string[] | null;
  maturity_rating: string | null;
  awards: string[] | null;
  episode_count: number | null;
  season_count: number | null;
  season: number | null;
  episode: number | null;
  episode_title: string | null;
  created_at: string | null;
  updated_at: string | null;
}
