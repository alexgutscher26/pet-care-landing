-- Create the set_updated_at function
create or replace function set_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create type record_type as enum ('vaccination', 'medication', 'vet_visit');

create table health_records (
    id uuid primary key default uuid_generate_v4(),
    pet_id uuid references pets(id) on delete cascade not null,
    record_type record_type not null,
    title text not null,
    date date not null,
    next_due_date date,
    notes text,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

-- Create RLS policies
alter table health_records enable row level security;

create policy "Users can view their own pets' health records"
    on health_records for select
    using (
        pet_id in (
            select id from pets
            where user_id = auth.uid()
        )
    );

create policy "Users can insert health records for their own pets"
    on health_records for insert
    with check (
        pet_id in (
            select id from pets
            where user_id = auth.uid()
        )
    );

create policy "Users can update their own pets' health records"
    on health_records for update
    using (
        pet_id in (
            select id from pets
            where user_id = auth.uid()
        )
    );

create policy "Users can delete their own pets' health records"
    on health_records for delete
    using (
        pet_id in (
            select id from pets
            where user_id = auth.uid()
        )
    );

-- Add updated_at trigger
create trigger set_updated_at
    before update on health_records
    for each row
    execute function set_updated_at();
