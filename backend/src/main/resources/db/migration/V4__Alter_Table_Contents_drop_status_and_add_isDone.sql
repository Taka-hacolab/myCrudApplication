ALTER TABLE contents
    DROP COLUMN status;

ALTER TABLE contents
    ADD COLUMN id_done boolean DEFAULT false NOT NULL;