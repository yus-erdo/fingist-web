-- Email subscriptions table for FinGist newsletter
-- Run this SQL in your Supabase SQL editor to create the table

CREATE TABLE email_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  source VARCHAR(10) DEFAULT 'main' CHECK (source IN ('main', 'bottom')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_email_subscriptions_email ON email_subscriptions(email);
CREATE INDEX idx_email_subscriptions_active ON email_subscriptions(is_active);
CREATE INDEX idx_email_subscriptions_created_at ON email_subscriptions(created_at);

-- Add RLS (Row Level Security) policies
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserting new subscriptions (public access for newsletter signup)
CREATE POLICY "Allow public email subscription inserts" ON email_subscriptions
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Policy to allow reading active subscriptions
CREATE POLICY "Allow public read for active subscriptions" ON email_subscriptions
  FOR SELECT 
  TO public
  USING (is_active = true);

-- Trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_email_subscriptions_updated_at 
    BEFORE UPDATE ON email_subscriptions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 