CREATE TYPE Gender AS ENUM ('Male', 'Female');

CREATE TABLE competitors (
  uuid UUID PRIMARY KEY,
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

CREATE TABLE matches (
  match_uuid UUID PRIMARY KEY,
  competitor1_uuid UUID REFERENCES competitors(uuid),
  competitor2_uuid UUID REFERENCES competitors(uuid),
  winner_uuid UUID REFERENCES competitors(uuid),
  event_uuid UUID REFERENCES events(uuid),
  match_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  uuid UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE,
  location VARCHAR(255)
);
