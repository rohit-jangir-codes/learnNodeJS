-- Users table
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(255)        NOT NULL,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT                NOT NULL,
  created_at    TIMESTAMP           DEFAULT NOW(),
  updated_at    TIMESTAMP           DEFAULT NOW()
);

-- Homes table
CREATE TABLE homes (
  id              SERIAL PRIMARY KEY,
  house_name      VARCHAR(255)   NOT NULL,
  location        VARCHAR(255)   NOT NULL,
  price_per_night NUMERIC(10, 2) NOT NULL,
  rating          NUMERIC(2, 1)  DEFAULT 0,
  photo_url       TEXT,
  owner_id        INTEGER        REFERENCES users(id) ON DELETE CASCADE,
  created_at      TIMESTAMP      DEFAULT NOW(),
  updated_at      TIMESTAMP      DEFAULT NOW()
);
