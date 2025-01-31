-- Create users table
create table if not exists public.users (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    full_name text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;

-- Create policies
create policy "Users can view their own profile" 
    on public.users 
    for select 
    using (auth.uid() = id);

create policy "Users can update their own profile" 
    on public.users 
    for update 
    using (auth.uid() = id);

-- Function to automatically create user profile
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.users (id, email)
    values (new.id, new.email);
    return new;
end;
$$;

-- Trigger after auth.users insert
create or replace trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();
