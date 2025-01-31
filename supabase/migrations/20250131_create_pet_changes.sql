-- Create pet_changes table
CREATE TABLE IF NOT EXISTS pet_changes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    pet_id UUID NOT NULL,
    pet_name TEXT NOT NULL,
    change_type TEXT NOT NULL CHECK (change_type IN ('created', 'updated', 'deleted')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_pet_changes_user_id ON pet_changes(user_id);
CREATE INDEX IF NOT EXISTS idx_pet_changes_created_at ON pet_changes(created_at DESC);

-- Add RLS policies
ALTER TABLE pet_changes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own pet changes"
    ON pet_changes FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pet changes"
    ON pet_changes FOR INSERT
    WITH CHECK (auth.uid() = user_id);
