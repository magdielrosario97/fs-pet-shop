DROP TABLE IF EXISTS pets;


CREATE TABLE pets (
  id serial PRIMARY KEY,
  name varchar(50),
  age integer,
  kind varchar(50)
);