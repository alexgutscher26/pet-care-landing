-- Create the health_records table if it doesn't exist
create table if not exists public.health_records (
  id uuid default uuid_generate_v4() primary key,
  pet_id uuid references pets(id) not null,
  user_id uuid references auth.users(id) not null,
  type text not null,
  date timestamp with time zone not null,
  next_due timestamp with time zone,
  notes text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Add RLS policies
alter table public.health_records enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view their own health records" on public.health_records;
drop policy if exists "Users can insert their own health records" on public.health_records;
drop policy if exists "Users can update their own health records" on public.health_records;
drop policy if exists "Users can delete their own health records" on public.health_records;

-- Create RLS policies
create policy "Users can view their own health records"
  on public.health_records for select
  using (auth.uid() = user_id);

create policy "Users can insert their own health records"
  on public.health_records for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own health records"
  on public.health_records for update
  using (auth.uid() = user_id);

create policy "Users can delete their own health records"
  on public.health_records for delete
  using (auth.uid() = user_id);

-- Add indexes for performance
create index if not exists health_records_user_id_idx on public.health_records(user_id);
create index if not exists health_records_pet_id_idx on public.health_records(pet_id);

-- Add trigger for updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists health_records_updated_at on public.health_records;

create trigger health_records_updated_at
  before update on public.health_records
  for each row
  execute function public.handle_updated_at();
