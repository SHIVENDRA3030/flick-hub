
export interface NetflixContent {
  id: string;
  title: string;
  description: string | null;
  poster_url: string | null;
  content_type: string;
  release_year: number | null;
  genre: string[] | null;
  embed_code: string;
  is_featured: boolean;
  season: number | null;
  episode: number | null;
  episode_title: string | null;
  created_at: string | null;
  updated_at: string | null;
}
