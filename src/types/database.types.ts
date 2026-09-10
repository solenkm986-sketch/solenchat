/**
 * Эти типы описывают структуру базы данных Supabase на этапе 1 (профили).
 * После применения миграций вы можете сгенерировать актуальные типы
 * автоматически командой:
 *
 *   npm run supabase:types
 *
 * (требует Supabase CLI и локально запущенный `supabase start`,
 * либо `supabase link` к вашему проекту — см. README.md).
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string;
          avatar_url: string | null;
          status_text: string | null;
          is_online: boolean;
          last_seen_at: string;
          hide_online_status: boolean;
          role: 'owner' | 'admin' | 'member';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name: string;
          avatar_url?: string | null;
          status_text?: string | null;
          is_online?: boolean;
          last_seen_at?: string;
          hide_online_status?: boolean;
          role?: 'owner' | 'admin' | 'member';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          display_name?: string;
          avatar_url?: string | null;
          status_text?: string | null;
          is_online?: boolean;
          last_seen_at?: string;
          hide_online_status?: boolean;
          role?: 'owner' | 'admin' | 'member';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      family_role: 'owner' | 'admin' | 'member';
    };
  };
}
