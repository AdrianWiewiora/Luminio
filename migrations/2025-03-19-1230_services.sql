DROP TABLE IF EXISTS public.user_services;
DELETE FROM public.services WHERE name = 'Sesja zdjęciowa';
INSERT INTO public.services (name) VALUES ('Inne');