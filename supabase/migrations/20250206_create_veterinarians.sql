-- Create veterinarians table
CREATE TABLE IF NOT EXISTS veterinarians (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    specialty TEXT,
    clinic_name TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS veterinarians_user_id_idx ON veterinarians(user_id);
CREATE INDEX IF NOT EXISTS veterinarians_name_idx ON veterinarians(name);

-- Enable Row Level Security
ALTER TABLE veterinarians ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own veterinarians"
    ON veterinarians
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own veterinarians"
    ON veterinarians
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own veterinarians"
    ON veterinarians
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own veterinarians"
    ON veterinarians
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_veterinarians_updated_at
    BEFORE UPDATE
    ON veterinarians
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Update vet_appointments table to reference veterinarians
ALTER TABLE vet_appointments
ADD COLUMN veterinarian_id UUID REFERENCES veterinarians(id) ON DELETE SET NULL;
