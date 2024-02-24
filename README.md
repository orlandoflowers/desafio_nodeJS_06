## Desafio Soft Jobs
- Author: Orlando Flores

--

### env data:
// DB_DATABASE=softjobs
// DB_HOST=localhost
// DB_USER=postgres
// DB_PASSWORD=123456
// JWT_SECRET=secret

--

### db:

CREATE DATABASE softjobs;

\c softjobs;

CREATE TABLE usuarios ( 
  id SERIAL, 
  email VARCHAR(50) NOT NULL, 
  password VARCHAR(60) NOT NULL, 
  rol VARCHAR(25), 
  lenguage VARCHAR(20) 
);
