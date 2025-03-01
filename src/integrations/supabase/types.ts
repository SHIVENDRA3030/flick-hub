export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      download_links: {
        Row: {
          audio: string | null
          codec: string | null
          created_at: string | null
          episode: number | null
          id: string
          label: string | null
          movie_id: string | null
          quality: string | null
          season: number | null
          size: string | null
          source: string | null
          status: string | null
          type: string | null
          url: string
        }
        Insert: {
          audio?: string | null
          codec?: string | null
          created_at?: string | null
          episode?: number | null
          id?: string
          label?: string | null
          movie_id?: string | null
          quality?: string | null
          season?: number | null
          size?: string | null
          source?: string | null
          status?: string | null
          type?: string | null
          url: string
        }
        Update: {
          audio?: string | null
          codec?: string | null
          created_at?: string | null
          episode?: number | null
          id?: string
          label?: string | null
          movie_id?: string | null
          quality?: string | null
          season?: number | null
          size?: string | null
          source?: string | null
          status?: string | null
          type?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "download_links_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
        ]
      }
      movies: {
        Row: {
          content_type: string | null
          created_at: string | null
          description: string | null
          id: string
          poster_url: string | null
          release_date: string
          size: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          poster_url?: string | null
          release_date: string
          size: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          poster_url?: string | null
          release_date?: string
          size?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      netflix_content: {
        Row: {
          content_type: string
          created_at: string | null
          description: string | null
          embed_code: string
          episode: number | null
          episode_title: string | null
          genre: string[] | null
          id: string
          is_featured: boolean | null
          poster_url: string | null
          release_year: number | null
          season: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content_type?: string
          created_at?: string | null
          description?: string | null
          embed_code: string
          episode?: number | null
          episode_title?: string | null
          genre?: string[] | null
          id?: string
          is_featured?: boolean | null
          poster_url?: string | null
          release_year?: number | null
          season?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content_type?: string
          created_at?: string | null
          description?: string | null
          embed_code?: string
          episode?: number | null
          episode_title?: string | null
          genre?: string[] | null
          id?: string
          is_featured?: boolean | null
          poster_url?: string | null
          release_year?: number | null
          season?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      netflix_embed_codes: {
        Row: {
          created_at: string | null
          embed_code: string
          episode: number | null
          episode_title: string | null
          id: string
          movie_id: string
          season: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          embed_code: string
          episode?: number | null
          episode_title?: string | null
          id?: string
          movie_id: string
          season?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          embed_code?: string
          episode?: number | null
          episode_title?: string | null
          id?: string
          movie_id?: string
          season?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "netflix_embed_codes_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "netflix_movies"
            referencedColumns: ["id"]
          },
        ]
      }
      netflix_movies: {
        Row: {
          content_type: string
          created_at: string | null
          description: string | null
          episode: number | null
          episode_title: string | null
          genre: string[] | null
          id: string
          is_featured: boolean | null
          poster_url: string | null
          release_year: number | null
          season: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content_type?: string
          created_at?: string | null
          description?: string | null
          episode?: number | null
          episode_title?: string | null
          genre?: string[] | null
          id?: string
          is_featured?: boolean | null
          poster_url?: string | null
          release_year?: number | null
          season?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content_type?: string
          created_at?: string | null
          description?: string | null
          episode?: number | null
          episode_title?: string | null
          genre?: string[] | null
          id?: string
          is_featured?: boolean | null
          poster_url?: string | null
          release_year?: number | null
          season?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      streaming_links: {
        Row: {
          created_at: string | null
          id: string
          label: string | null
          movie_id: string | null
          provider: string | null
          quality: string | null
          status: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          label?: string | null
          movie_id?: string | null
          provider?: string | null
          quality?: string | null
          status?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string | null
          movie_id?: string | null
          provider?: string | null
          quality?: string | null
          status?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "streaming_links_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
        ]
      }
      xenine_links: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          movie_id: string | null
          quality: string | null
          size: string | null
          status: string | null
          title: string
          url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          movie_id?: string | null
          quality?: string | null
          size?: string | null
          status?: string | null
          title: string
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          movie_id?: string | null
          quality?: string | null
          size?: string | null
          status?: string | null
          title?: string
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
