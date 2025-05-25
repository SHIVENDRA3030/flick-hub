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
      netflix_content: {
        Row: {
          actors: string[] | null
          awards: string[] | null
          content_type: string | null
          created_at: string | null
          description: string | null
          duration: string | null
          embed_code: string | null
          embed_type: string | null
          embed_url: string | null
          episode: number | null
          episode_count: number | null
          episode_title: string | null
          genre: string[] | null
          id: string
          is_featured: boolean | null
          maturity_rating: string | null
          mood: string[] | null
          poster_url: string | null
          release_year: number | null
          resolution: string | null
          runtime: string | null
          season: number | null
          season_count: number | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          actors?: string[] | null
          awards?: string[] | null
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          embed_code?: string | null
          embed_type?: string | null
          embed_url?: string | null
          episode?: number | null
          episode_count?: number | null
          episode_title?: string | null
          genre?: string[] | null
          id?: string
          is_featured?: boolean | null
          maturity_rating?: string | null
          mood?: string[] | null
          poster_url?: string | null
          release_year?: number | null
          resolution?: string | null
          runtime?: string | null
          season?: number | null
          season_count?: number | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          actors?: string[] | null
          awards?: string[] | null
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          embed_code?: string | null
          embed_type?: string | null
          embed_url?: string | null
          episode?: number | null
          episode_count?: number | null
          episode_title?: string | null
          genre?: string[] | null
          id?: string
          is_featured?: boolean | null
          maturity_rating?: string | null
          mood?: string[] | null
          poster_url?: string | null
          release_year?: number | null
          resolution?: string | null
          runtime?: string | null
          season?: number | null
          season_count?: number | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      watchlist: {
        Row: {
          added_at: string | null
          id: string
          netflix_content_id: string
          user_id: string
        }
        Insert: {
          added_at?: string | null
          id?: string
          netflix_content_id: string
          user_id: string
        }
        Update: {
          added_at?: string | null
          id?: string
          netflix_content_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "watchlist_netflix_content_id_fkey"
            columns: ["netflix_content_id"]
            isOneToOne: false
            referencedRelation: "netflix_content"
            referencedColumns: ["id"]
          },
        ]
      }
      web_series_episodes: {
        Row: {
          created_at: string | null
          embed_code: string
          episode_name: string | null
          episode_number: string | null
          id: string
          netflix_content_id: string
        }
        Insert: {
          created_at?: string | null
          embed_code: string
          episode_name?: string | null
          episode_number?: string | null
          id?: string
          netflix_content_id: string
        }
        Update: {
          created_at?: string | null
          embed_code?: string
          episode_name?: string | null
          episode_number?: string | null
          id?: string
          netflix_content_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "web_series_episodes_netflix_content_id_fkey"
            columns: ["netflix_content_id"]
            isOneToOne: false
            referencedRelation: "netflix_content"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
