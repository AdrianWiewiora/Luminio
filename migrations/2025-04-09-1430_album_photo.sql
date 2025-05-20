ALTER TABLE IF EXISTS public.albums
    ADD COLUMN cover_id integer NOT NULL;

ALTER TABLE IF EXISTS public.albums
    ADD CONSTRAINT albums_cover_id_fkey FOREIGN KEY (cover_id)
        REFERENCES public.photos (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;