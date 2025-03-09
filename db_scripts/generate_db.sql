CREATE TABLE IF NOT EXISTS public.albums
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    name character varying COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    tag integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT albums_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.links
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    portfolio_url character varying COLLATE pg_catalog."default",
    linkedin_url character varying COLLATE pg_catalog."default",
    instagram_url character varying COLLATE pg_catalog."default",
    dribbble_url character varying COLLATE pg_catalog."default",
    other_url character varying COLLATE pg_catalog."default",
    CONSTRAINT links_pkey PRIMARY KEY (id),
    CONSTRAINT links_dribbble_url_key UNIQUE (dribbble_url),
    CONSTRAINT links_instagram_url_key UNIQUE (instagram_url),
    CONSTRAINT links_linkedin_url_key UNIQUE (linkedin_url),
    CONSTRAINT links_other_url_key UNIQUE (other_url),
    CONSTRAINT links_portfolio_url_key UNIQUE (portfolio_url)
);

CREATE TABLE IF NOT EXISTS public.photos
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    album_id integer,
    file_path character varying COLLATE pg_catalog."default" NOT NULL,
    category_id integer,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT photos_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.reviews
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    photographer_id integer NOT NULL,
    body text COLLATE pg_catalog."default",
    value integer,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT reviews_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.services
(
    id serial NOT NULL,
    name character varying COLLATE pg_catalog."default",
    CONSTRAINT services_pkey PRIMARY KEY (id),
    CONSTRAINT services_name_key UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS public.user_services
(
    user_id serial NOT NULL,
    service_id integer NOT NULL
);

CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    first_name character varying COLLATE pg_catalog."default",
    last_name character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    phone_number character varying COLLATE pg_catalog."default",
    city character varying COLLATE pg_catalog."default",
    password_hash character varying COLLATE pg_catalog."default",
    user_description text COLLATE pg_catalog."default",
    role integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
);


ALTER TABLE IF EXISTS public.albums
    ADD CONSTRAINT albums_tag_fkey FOREIGN KEY (tag)
        REFERENCES public.services (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.albums
    ADD CONSTRAINT albums_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.links
    ADD CONSTRAINT links_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.photos
    ADD CONSTRAINT photos_album_id_fkey FOREIGN KEY (album_id)
        REFERENCES public.albums (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.photos
    ADD CONSTRAINT photos_category_id_fkey FOREIGN KEY (category_id)
        REFERENCES public.services (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.photos
    ADD CONSTRAINT photos_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.reviews
    ADD CONSTRAINT reviews_photographer_id_fkey FOREIGN KEY (photographer_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.user_services
    ADD CONSTRAINT user_services_service_id_fkey FOREIGN KEY (service_id)
        REFERENCES public.services (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.user_services
    ADD CONSTRAINT user_services_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;


INSERT INTO public.services (name) VALUES
                                       ('Weselne'),
                                       ('Artystyczne'),
                                       ('Sesja zdjęciowa'),
                                       ('Dziecięce'),
                                       ('Rodzinne');
