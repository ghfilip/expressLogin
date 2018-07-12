# expressLogin
Node.js and express for a simple login

requirements:

- postgres DB
run:
CREATE TABLE users (
  id uuid primary key,
  email varchar NOT NULL,
  pass varchar NOT NULL,
  firstname varchar NOT NULL,
  lastname varchar NOT NULL,
  level int NOT NULL
);

install:

- run npm i

run server:

- ts-node app.ts



browser:

initial db setup:
- http://localhost:3000/populate

normal run:

- http://localhost:3000

sessions will expire in 1 minute.

- users:
- gh_filip@yahoo.com with pass test
- pop_ion@yahoo.com with pass test
