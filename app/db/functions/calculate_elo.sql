CREATE OR REPLACE FUNCTION calculate_elo(
    rating1 INT, 
    rating2 INT, 
    winner_uuid UUID
)
RETURNS TABLE (
    new_rating1 INT,
    new_rating2 INT
) 
LANGUAGE plpgsql
AS $$
DECLARE
    expected_score1 FLOAT;
    expected_score2 FLOAT;
    k_factor INT := 60;
BEGIN
    expected_score1 := 1.0 / (1.0 + pow(10, (rating2 - rating1) / 400.0));
    expected_score2 := 1.0 / (1.0 + pow(10, (rating1 - rating2) / 400.0));

    IF winner_uuid = competitor1_uuid THEN
        new_rating1 := round(rating1 + k_factor * (1 - expected_score1));
        new_rating2 := round(rating2 + k_factor * (0 - expected_score2));
    ELSE
        new_rating1 := round(rating1 + k_factor * (0 - expected_score1));
        new_rating2 := round(rating2 + k_factor * (1 - expected_score2));
    END IF;

    RETURN QUERY SELECT new_rating1, new_rating2;
END;
$$;
