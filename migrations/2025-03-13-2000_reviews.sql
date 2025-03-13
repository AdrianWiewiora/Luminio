ALTER TABLE public.albums
    ADD COLUMN is_public BOOLEAN DEFAULT FALSE;

DROP TABLE IF EXISTS public.reviews;

CREATE TABLE IF NOT EXISTS public.photo_reviews
(
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER NOT NULL,
    photo_id   INTEGER NOT NULL,
    body       TEXT COLLATE pg_catalog."default",
    value      INTEGER,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    CONSTRAINT photo_reviews_photo_id_fkey FOREIGN KEY (photo_id)
        REFERENCES public.photos (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT photo_reviews_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.album_reviews
(
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER NOT NULL,
    album_id   INTEGER NOT NULL,
    body       TEXT COLLATE pg_catalog."default",
    value      INTEGER,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    CONSTRAINT album_reviews_album_id_fkey FOREIGN KEY (album_id)
        REFERENCES public.albums (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT album_reviews_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);
