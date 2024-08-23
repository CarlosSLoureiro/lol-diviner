CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;

CREATE TABLE public.champions
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    title text NOT NULL,
    lore text NOT NULL,
    vector halfvec NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE public.champions
    OWNER to postgres;
