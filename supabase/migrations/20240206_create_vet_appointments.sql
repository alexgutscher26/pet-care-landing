-- Create the vet_appointments table if it doesn't exist
create table if not exists public.vet_appointments (
  id uuid default uuid_generate_v4() primary key,
  pet_id uuid references pets(id) not null,
  user_id uuid references auth.users(id) not null,
  vet_name text not null,
  purpose text not null,
  appointment_date timestamp with time zone not null,
  status text not null default 'scheduled', -- scheduled, completed, cancelled
  notes text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Add RLS policies
alter table public.vet_appointments enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view their own vet appointments" on public.vet_appointments;
drop policy if exists "Users can insert their own vet appointments" on public.vet_appointments;
drop policy if exists "Users can update their own vet appointments" on public.vet_appointments;
drop policy if exists "Users can delete their own vet appointments" on public.vet_appointments;

-- Create RLS policies
create policy "Users can view their own vet appointments"
  on public.vet_appointments for select
  using (auth.uid() = user_id);

create policy "Users can insert their own vet appointments"
  on public.vet_appointments for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own vet appointments"
  on public.vet_appointments for update
  using (auth.uid() = user_id);

create policy "Users can delete their own vet appointments"
  on public.vet_appointments for delete
  using (auth.uid() = user_id);

-- Add indexes for performance
create index if not exists vet_appointments_user_id_idx on public.vet_appointments(user_id);
create index if not exists vet_appointments_pet_id_idx on public.vet_appointments(pet_id);
create index if not exists vet_appointments_date_idx on public.vet_appointments(appointment_date);

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

drop trigger if exists vet_appointments_updated_at on public.vet_appointments;

create trigger vet_appointments_updated_at
  before update on public.vet_appointments
  for each row
  execute function public.handle_updated_at();
