// Supabase database types — matches schema from PRD section 8.3

export type OutingStage = 'plan' | 'commit' | 'happen' | 'settle' | 'remember'
export type OutingType = 'movie' | 'food' | 'sport' | 'hangout' | 'other'
export type VibeTag = 'legendary' | 'chaotic' | 'wholesome' | 'mid' | 'unhinged'
export type RsvpStatus = 'yes' | 'no' | 'maybe' | 'pending'
export type SplitType = 'equal' | 'custom'
export type CardType = 'roast' | 'fomo' | 'moment'
export type ReminderType = 'debt' | 'borrowed_item' | 'poll_nudge' | 'personal'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          phone: string
          name: string
          avatar_url: string | null
          active_title: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      outings: {
        Row: {
          id: string
          organiser_id: string
          name: string
          type: OutingType
          date: string
          location_text: string | null
          stage: OutingStage
          vibe_tag: VibeTag | null
          photo_url: string | null
          share_token: string
          poll_closes_at: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['outings']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['outings']['Insert']>
      }
      outing_members: {
        Row: {
          id: string
          outing_id: string
          user_id: string | null
          guest_name: string | null
          guest_phone: string | null
          rsvp_status: RsvpStatus
          checked_in: boolean
          bailed: boolean
          excuse: string | null
          jinx_count: number
          invited_at: string
          responded_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['outing_members']['Row'], 'id' | 'invited_at'>
        Update: Partial<Database['public']['Tables']['outing_members']['Insert']>
      }
      bills: {
        Row: {
          id: string
          outing_id: string
          paid_by: string
          total_amount: number
          split_type: SplitType
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['bills']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['bills']['Insert']>
      }
      bill_splits: {
        Row: {
          id: string
          bill_id: string
          user_id: string
          amount_owed: number
          settled: boolean
          settled_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['bill_splits']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['bill_splits']['Insert']>
      }
      borrowed_items: {
        Row: {
          id: string
          outing_id: string
          item_name: string
          borrowed_by: string
          lent_by: string
          returned: boolean
          returned_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['borrowed_items']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['borrowed_items']['Insert']>
      }
      reminders: {
        Row: {
          id: string
          outing_id: string
          created_by: string
          target_user_id: string
          type: ReminderType
          message: string
          send_at: string
          sent: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['reminders']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['reminders']['Insert']>
      }
      cards: {
        Row: {
          id: string
          outing_id: string
          created_by: string
          type: CardType
          target_user_id: string | null
          custom_text: string | null
          template_id: string
          image_url: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['cards']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['cards']['Insert']>
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          achievement_key: string
          earned_at: string
        }
        Insert: Omit<Database['public']['Tables']['achievements']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['achievements']['Insert']>
      }
      shop_purchases: {
        Row: {
          id: string
          user_id: string
          pack_id: string
          payment_reference: string
          purchased_at: string
        }
        Insert: Omit<Database['public']['Tables']['shop_purchases']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['shop_purchases']['Insert']>
      }
    }
  }
}
