-- AlluviaMaps Database Schema
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'premium')),
    profile JSONB DEFAULT '{}'::jsonb
);

-- Tracks table for user-generated routes
CREATE TABLE IF NOT EXISTS public.tracks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    coordinates JSONB NOT NULL, -- Array of [lat, lng] coordinates
    created_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_public BOOLEAN DEFAULT true,
    tags TEXT[] DEFAULT '{}',
    difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    distance_km DECIMAL(8,2),
    start_point JSONB, -- [lat, lng] of start
    end_point JSONB, -- [lat, lng] of end
    elevation_gain_m INTEGER,
    estimated_time_hours DECIMAL(4,2)
);

-- Gold sites table for historical mining locations
CREATE TABLE IF NOT EXISTS public.gold_sites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    coordinates JSONB NOT NULL, -- [lat, lng]
    created_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_public BOOLEAN DEFAULT true,
    historical_context TEXT,
    current_status TEXT DEFAULT 'abandoned' CHECK (current_status IN ('active', 'abandoned', 'restricted')),
    gold_found BOOLEAN DEFAULT false,
    last_activity_date DATE,
    site_type TEXT CHECK (site_type IN ('alluvial', 'hard_rock', 'reef', 'placer', 'other')),
    access_notes TEXT,
    safety_warnings TEXT[]
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tracks_created_by ON public.tracks(created_by);
CREATE INDEX IF NOT EXISTS idx_tracks_is_public ON public.tracks(is_public);
CREATE INDEX IF NOT EXISTS idx_tracks_coordinates ON public.tracks USING GIN(coordinates);
CREATE INDEX IF NOT EXISTS idx_gold_sites_created_by ON public.gold_sites(created_by);
CREATE INDEX IF NOT EXISTS idx_gold_sites_is_public ON public.gold_sites(is_public);
CREATE INDEX IF NOT EXISTS idx_gold_sites_coordinates ON public.gold_sites USING GIN(coordinates);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gold_sites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for tracks table
CREATE POLICY "Anyone can view public tracks" ON public.tracks
    FOR SELECT USING (is_public = true OR auth.uid() = created_by);

CREATE POLICY "Users can create tracks" ON public.tracks
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own tracks" ON public.tracks
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own tracks" ON public.tracks
    FOR DELETE USING (auth.uid() = created_by);

-- RLS Policies for gold_sites table
CREATE POLICY "Anyone can view public gold sites" ON public.gold_sites
    FOR SELECT USING (is_public = true OR auth.uid() = created_by);

CREATE POLICY "Users can create gold sites" ON public.gold_sites
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own gold sites" ON public.gold_sites
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own gold sites" ON public.gold_sites
    FOR DELETE USING (auth.uid() = created_by);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tracks_updated_at BEFORE UPDATE ON public.tracks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gold_sites_updated_at BEFORE UPDATE ON public.gold_sites
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on auth.users insert
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample data for testing
INSERT INTO public.tracks (title, description, coordinates, created_by, is_public, difficulty, distance_km, tags)
VALUES 
    ('Bendigo Goldfields Walk', 'Historic gold mining trail through Bendigo', 
     '[[-36.7589, 144.2802], [-36.7590, 144.2803], [-36.7591, 144.2804]]'::jsonb,
     (SELECT id FROM public.users LIMIT 1), true, 'easy', 2.5, ARRAY['historic', 'gold', 'walking']),
    ('Ballarat Sovereign Hill Trail', 'Walking trail through historic gold mining area',
     '[[-37.5622, 143.8503], [-37.5623, 143.8504], [-37.5624, 143.8505]]'::jsonb,
     (SELECT id FROM public.users LIMIT 1), true, 'medium', 4.2, ARRAY['historic', 'gold', 'family']);

INSERT INTO public.gold_sites (name, description, coordinates, created_by, is_public, historical_context, current_status, gold_found, site_type)
VALUES 
    ('Bendigo Central Deborah Mine', 'Historic gold mine from the 1850s gold rush', 
     '[-36.7589, 144.2802]'::jsonb,
     (SELECT id FROM public.users LIMIT 1), true, 
     'One of the richest gold mines in Victoria during the 1850s gold rush', 'abandoned', true, 'hard_rock'),
    ('Ballarat Sovereign Hill', 'Recreated gold mining town and museum',
     '[-37.5622, 143.8503]'::jsonb,
     (SELECT id FROM public.users LIMIT 1), true,
     'Historic gold mining area now preserved as a living museum', 'restricted', false, 'alluvial'); 