-- Script to generate SQL commands to drop tables and related objects

DO $$
DECLARE
    row RECORD;
BEGIN
    -- Loop over each table
    FOR row IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    LOOP
        -- Generate DROP TABLE command
        RAISE NOTICE 'DROP TABLE IF EXISTS % CASCADE;', row.tablename;
    END LOOP;

    -- Loop over each view
    FOR row IN SELECT table_name FROM information_schema.views WHERE table_schema = 'public'
    LOOP
        -- Generate DROP VIEW command
        RAISE NOTICE 'DROP VIEW IF EXISTS % CASCADE;', row.table_name;
    END LOOP;

    -- Loop over each sequence
    FOR row IN SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = 'public'
    LOOP
        -- Generate DROP SEQUENCE command
        RAISE NOTICE 'DROP SEQUENCE IF EXISTS % CASCADE;', row.sequence_name;
    END LOOP;

    -- Loop over each type
    FOR row IN SELECT typname FROM pg_type 
    JOIN pg_namespace ON pg_namespace.oid = pg_type.typnamespace
    WHERE pg_namespace.nspname = 'public' AND pg_type.typtype = 'c'
    LOOP
        -- Generate DROP TYPE command
        RAISE NOTICE 'DROP TYPE IF EXISTS % CASCADE;', row.typname;
    END LOOP;
    
END $$;
