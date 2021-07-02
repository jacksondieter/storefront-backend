CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE,
  first_name VARCHAR,
  last_name VARCHAR,
  password VARCHAR
);