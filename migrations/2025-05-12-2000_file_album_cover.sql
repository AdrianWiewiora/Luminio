ALTER TABLE albums DROP CONSTRAINT albums_cover_id_fkey;
-- whatever
-- ALTER TABLE albums ADD CONSTRAINT albums_cover_id_fkey FOREIGN KEY (cover_id) REFERENCES files(id) ON DELETE CASCADE;

