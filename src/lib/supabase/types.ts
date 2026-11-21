/**
 * Supabase Database TypeScript Schema Definitions for BuddyStudy
 * Maps to BuddyStudy data model (Master Specification Sections 6 & 7).
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
      learner_profiles: {
        Row: {
          id: string;
          user_id: string;
          target_domain: string;
          target_specialization: string;
          current_level: string;
          weekly_study_minutes: number;
          streak_days: number;
          xp: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          target_domain: string;
          target_specialization: string;
          current_level?: string;
          weekly_study_minutes?: number;
          streak_days?: number;
          xp?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          target_domain?: string;
          target_specialization?: string;
          current_level?: string;
          weekly_study_minutes?: number;
          streak_days?: number;
          xp?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      learner_skills: {
        Row: {
          id: string;
          user_id: string;
          skill_id: string;
          status: string;
          mastery_score: number;
          last_assessed_at: string | null;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          skill_id: string;
          status: string;
          mastery_score?: number;
          last_assessed_at?: string | null;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          skill_id?: string;
          status?: string;
          mastery_score?: number;
          last_assessed_at?: string | null;
          completed_at?: string | null;
        };
      };
      assessment_attempts: {
        Row: {
          id: string;
          user_id: string;
          assessment_id: string;
          score_percentage: number;
          passed: boolean;
          answers: Json;
          feedback: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          assessment_id: string;
          score_percentage: number;
          passed: boolean;
          answers: Json;
          feedback?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          assessment_id?: string;
          score_percentage?: number;
          passed?: boolean;
          answers?: Json;
          feedback?: Json | null;
          created_at?: string;
        };
      };
      notes: {
        Row: {
          id: string;
          user_id: string;
          skill_id: string;
          title: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          skill_id: string;
          title: string;
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          skill_id?: string;
          title?: string;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
