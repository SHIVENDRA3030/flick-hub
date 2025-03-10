export interface Movie {
  id: string;
  title: string;
  poster_url: string | null;
  content_type: string | null;
  release_date: string;
  size: string;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface DownloadLink {
  id: string;
  movie_id: string | null;
  url: string;
  label?: string | null;
  quality?: string | null;
  source?: string | null;
  audio?: string | null;
  status?: string | null;
  codec?: string | null;
  created_at?: string | null;
  season?: number | null;
  episode?: number | null;
  type?: string | null;
  size?: string | null;
}

// Keep this interface for future use, but it's not currently used in the database
export interface StreamingLink {
  id: string;
  movie_id: string | null;
  url: string;
  label?: string | null;
  provider?: string | null;
  quality?: string | null;
  status?: string | null;
  created_at?: string | null;
}

export interface XenineLink {
  id: string;
  title: string;
  description?: string | null;
  url: string;
  quality?: string | null;
  size?: string | null;
  status?: string | null;
  movie_id?: string | null;
  created_at?: string | null;
}
