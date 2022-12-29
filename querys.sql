CREATE USER "hotel"@"localhost" IDENTIFIED BY "hotelmiranda";

CREATE DATABASE hotelmiranda;

SHOW DATABASES;

USE hotelmiranda;

SHOW TABLES;


CREATE OR REPLACE TABLE rooms ( idroom VARCHAR(255), number SMALLINT, photo VARCHAR(500), type VARCHAR(255), amenities VARCHAR(500), price INT, offer INT, status VARCHAR(5), PRIMARY KEY(idroom));
CREATE OR REPLACE TABLE users (iduser VARCHAR(255), name VARCHAR(255), photo VARCHAR(500), position VARCHAR(255), email VARCHAR(255), phone VARCHAR(12), date VARCHAR(15), description VARCHAR(255), state VARCHAR(5), pass VARCHAR(255), PRIMARY KEY(iduser));
CREATE OR REPLACE TABLE bookings (idbooking VARCHAR(255), name VARCHAR(255), bookingorder VARCHAR(15), checkin VARCHAR(15), checkout VARCHAR(15), typeroom VARCHAR(255), numroom INT, price INT, request VARCHAR(255), amenities VARCHAR(255), photos VARCHAR(500), type VARCHAR(255), description VARCHAR(255), state VARCHAR(10), PRIMARY KEY(idbooking));
CREATE OR REPLACE TABLE contacts (idcontact VARCHAR(255), date VARCHAR(255), customer VARCHAR(255), email VARCHAR(255), phone VARCHAR(12), header VARCHAR(255), comment VARCHAR(255), PRIMARY KEY(idcontact));

DROP TABLE IF EXISTS table_name;




