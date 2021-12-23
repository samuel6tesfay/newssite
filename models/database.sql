CREATE TABLE users (
        id  bigserial   primary key not null,
        name    varchar(255) not null,
        email    varchar(255) not null,
        password  varchar(255) not null,
        isAdmin BOOLEAN not null default 'false',
        Unique (email)
);
CREATE TABLE threads(
     id serial primary key,
     username varchar(255),
     body varchar,
     link varchar(255),
     avatar varchar(255),
     cloudinary_id varchar(255),
     date DATE NOT NULL DEFAULT CURRENT_DATE,
     user_id   INT  references users(id)
 );

CREATE TABLE trends(
     id serial primary key,
     body varchar(255),
     link varchar(255),
     user_id   INT  references users(id)
 
 );

CREATE TABLE relevant_people(
     id serial primary key,
     name varchar(255),
     body varchar,
     link varchar(255),
     user_id   INT  references users(id)
);

CREATE TABLE scolarships(
     id serial primary key,
     body varchar,
     deadline varchar(255),
     link varchar(255),
     avatar varchar(255),
     cloudinary_id varchar(255),
     user_id   INT  references users(id)
);



CREATE TABLE header(
     id serial primary key,
     logo varchar(255),
     logolink varchar(255),
     menu1 varchar(255),
     menu1link varchar(255),
     menu2 varchar(255),
     menu2link varchar(255),
     menu3 varchar(255),
     menu3link varchar(255),
     user_id   INT  references users(id)
);



CREATE TABLE contact(
     id serial PRIMARY KEY,
     title varchar(255),
     user_id   INT  references users(id)
);

CREATE TABLE about_scolarship(
     id serial primary key,
     title varchar(255),
     discription varchar,
     button varchar(255),
     avatar varchar(255),
     cloudinary_id varchar(255),
     user_id INT references users(id)

);

CREATE TABLE footer(
     id serial PRIMARY KEY,
     about_us varchar,
     city varchar(255),
     country varchar(255),
     email varchar(255),
     phone varchar(255),
     icon1 varchar(255),
     icon1link varchar(255),
     icon2 varchar(255),
     icon2link varchar(255),
     icon3 varchar(255),
     icon3link varchar(255),
     icon4 varchar(255),
     icon4link varchar(255),
     icon5 varchar(255),
     icon5link varchar(255),
     user_id INT references users(id)
);

