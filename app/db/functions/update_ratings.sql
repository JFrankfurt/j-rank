CREATE OR REPLACE FUNCTION update_elo_ratings()
RETURNS TRIGGER 
LANGUAGE plpgsql
AS $$
DECLARE
    competitor1_old_rating INT;
    competitor2_old_rating INT;
    new_ratings RECORD;
BEGIN
    SELECT rating INTO competitor1_old_rating FROM competitors WHERE uuid = NEW.competitor1_uuid;
    SELECT rating INTO competitor2_old_rating FROM competitors WHERE uuid = NEW.competitor2_uuid;

    new_ratings := calculate_elo(competitor1_old_rating, competitor2_old_rating, NEW.winner_uuid);

    BEGIN
        UPDATE competitors SET rating = new_ratings.new_rating1 WHERE uuid = NEW.competitor1_uuid;
        UPDATE competitors SET rating = new_ratings.new_rating2 WHERE uuid = NEW.competitor2_uuid;

        INSERT INTO rating_history (competitor_uuid, old_rating, new_rating)
        VALUES (NEW.competitor1_uuid, competitor1_old_rating, new_ratings.new_rating1);

        INSERT INTO rating_history (competitor_uuid, old_rating, new_rating)
        VALUES (NEW.competitor2_uuid, competitor2_old_rating, new_ratings.new_rating2);
    EXCEPTION WHEN OTHERS THEN
        RAISE;
    END;

    RETURN NEW;
END;
$$;
