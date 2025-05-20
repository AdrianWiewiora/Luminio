CREATE TABLE files (
    id serial NOT NULL,
    filename character varying NOT NULL,
    content_type  character varying NOT NULL,
    data BYTEA NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);

DELETE FROM photos;
ALTER TABLE photos DROP COLUMN file_path;
ALTER TABLE photos ADD COLUMN file_id INTEGER NOT NULL;
