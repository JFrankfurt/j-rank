CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE Gender AS ENUM ('Male', 'Female');

CREATE TABLE competitors (
  uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NULL,
  last_name VARCHAR(255) NULL,
  weight_class VARCHAR(50) NULL,
  team VARCHAR(255) NULL,
  delta INT NULL,
  rating INT NULL,
  gender Gender NULL,
  instagram VARCHAR(255) NULL,
  email VARCHAR(255) NULL
);

CREATE INDEX competitors_gender_idx ON competitors (gender);
CREATE INDEX competitors_weight_class_idx ON competitors (weight_class);

CREATE TABLE events (
  uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE,
  location VARCHAR(255)
);

CREATE TABLE matches (
  uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  competitor1_uuid UUID REFERENCES competitors(uuid),
  competitor2_uuid UUID REFERENCES competitors(uuid),
  winner_uuid UUID REFERENCES competitors(uuid),
  event_uuid UUID REFERENCES events(uuid),
  match_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rating_history (
    history_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    competitor_uuid UUID REFERENCES competitors(uuid),
    old_rating INT,
    new_rating INT,
    change_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX rating_history_competitor_uuid_idx ON rating_history (competitor_uuid);
