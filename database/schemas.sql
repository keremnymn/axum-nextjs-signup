create table if not exists "user" (
    id serial primary key,
    firstname varchar (30) not null,
    lastname varchar (30) not null,
    password varchar (120),
    email varchar (50) unique not null,
    email_subscription boolean default false,
    image_file varchar(150),
    is_confirmed boolean default false,
    is_admin boolean default false,
    is_banned boolean default false,
    created_on timestamp default now()::timestamp,
    last_login timestamp,
);