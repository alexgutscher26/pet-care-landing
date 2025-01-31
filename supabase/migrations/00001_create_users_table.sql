-- Create a custom users table that extends Supabase's auth.users
create table if not exists public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  role text default 'user'::text not null,
  constraint users_email_key unique (email)
);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;

-- Create policies for Row Level Security
create policy "Users can view their own profile" 
  on public.users 
  for select 
  using (auth.uid() = id);

create policy "Users can update their own profile" 
  on public.users 
  for update 
  using (auth.uid() = id);

-- Create a trigger to automatically insert a new user record when a user signs up
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create the trigger
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create indexes for better query performance
create index if not exists users_email_idx on public.users (email);
create index if not exists users_created_at_idx on public.users (created_at);

-- Set up realtime subscriptions for the users table
alter publication supabase_realtime add table public.users;
