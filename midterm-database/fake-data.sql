INSERT INTO users (name, email)
VALUES ('Devin Sanders', 'tristanjacobs@gmail.com'),
  ('Iva Harrison', 'allisonjackson@mail.com'),
  ('Lloyd Jefferson', 'asherpoole@gmx.com'),
  ('Dale Coleman', 'michaelgray@mail.com'),
  ('Alejandro Osborne', 'ariaatkinson@outlook.com'),
  ('Nell Medina', 'juliansantos@aol.com'),
  ('Estelle Walsh', 'elistanton@yahoo.com'),
  ('Herbert Graves', 'emilyowen@live.com'),
  ('John Stevens', 'charliebattle@yahoo.com'),
  ('Isabelle Robbins', 'miasutton@aol.com');
  
INSERT INTO polls (
    user_id,
    title,
    description,
    poll_link,
    results_link
  )
VALUES (
    4,
    'Movies',
    'Movies to watch',
    'www.google.com/links',
    'www.google.com/results'
  ),
  (
    1,
    'sports',
    'sports to play',
    'www.google.com/links',
    'www.google.com/results'
  ),
  (
    3,
    'places',
    'Movies to watch',
    'www.google.com/links',
    'www.google.com/results'
  ),
  (
    5,
    'things',
    'Movies to watch',
    'www.google.com/links',
    'www.google.com/results'
  ),
  (
    7,
    'vacation',
    'Movies to watch',
    'www.google.com/links',
    'www.google.com/results'
  ),
  (
    6,
    'homework',
    'Movies to watch',
    'www.google.com/links',
    'www.google.com/results'
  ),
  (
    2,
    'food',
    'Movies to watch',
    'www.google.com/links',
    'www.google.com/results'
  ),
  (
    8,
    'genre',
    'Movies to watch',
    'www.google.com/links',
    'www.google.com/results'
  ),
  (
    10,
    'song',
    'Movies to watch',
    'www.google.com/links',
    'www.google.com/results'
  );


INSERT INTO submission (poll_id, activity, rating, name)
VALUES (1, 'Superman', 2, 'a'),
  (1, 'Superman', 1, 'b'),
  (1, 'Superman', 0, 'c'),
  (1, 'Superman', 0, 'c'),
  (1, 'Spiderman', 1, 'a'),
  (1, 'Spiderman', 2, 'b'),
  (1, 'Spiderman', 1, 'c'),
  (1, 'Spiderman', 2, 'd'),
  (1, 'Batman', 0, 'a'),
  (1, 'Batman', 0, 'b'),
  (1, 'Batman', 2, 'c'),
  (1, 'Batman', 1, 'd');

