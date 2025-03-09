ALTER TABLE IF EXISTS public.albums DROP CONSTRAINT IF EXISTS albums_tag_fkey;
ALTER TABLE IF EXISTS public.albums DROP CONSTRAINT IF EXISTS albums_user_id_fkey;
ALTER TABLE IF EXISTS public.links DROP CONSTRAINT IF EXISTS links_user_id_fkey;
ALTER TABLE IF EXISTS public.photos DROP CONSTRAINT IF EXISTS photos_album_id_fkey;
ALTER TABLE IF EXISTS public.photos DROP CONSTRAINT IF EXISTS photos_category_id_fkey;
ALTER TABLE IF EXISTS public.photos DROP CONSTRAINT IF EXISTS photos_user_id_fkey;
ALTER TABLE IF EXISTS public.reviews DROP CONSTRAINT IF EXISTS reviews_photographer_id_fkey;
ALTER TABLE IF EXISTS public.reviews DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;
ALTER TABLE IF EXISTS public.user_services DROP CONSTRAINT IF EXISTS user_services_service_id_fkey;
ALTER TABLE IF EXISTS public.user_services DROP CONSTRAINT IF EXISTS user_services_user_id_fkey;

DROP TABLE IF EXISTS public.albums CASCADE;
DROP TABLE IF EXISTS public.links CASCADE;
DROP TABLE IF EXISTS public.photos CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.user_services CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

