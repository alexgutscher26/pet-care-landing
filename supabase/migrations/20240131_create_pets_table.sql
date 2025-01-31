create table public.pets (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  breed text not null,
  age integer not null,
  weight numeric(5,2) not null,
  photo_url text,
  user_id uuid not null references auth.users(id) on delete cascade,
  description text
);

-- Enable RLS
alter table public.pets enable row level security;

-- Create policies
create policy "Users can view their own pets" on pets
  for select using (auth.uid() = user_id);

create policy "Users can insert their own pets" on pets
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own pets" on pets
  for update using (auth.uid() = user_id);

create policy "Users can delete their own pets" on pets
  for delete using (auth.uid() = user_id);
