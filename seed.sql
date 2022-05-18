TRUNCATE pets RESTART IDENTITY;

INSERT INTO pets (name, age, kind) VALUES ('Mushu', 5, 'lizard');
INSERT INTO pets (name, age, kind) VALUES ('Aspen', 8, 'dog');
INSERT INTO pets (name, age, kind) VALUES ('Cookie', 1 , 'rat');

SELECT * FROM pets;