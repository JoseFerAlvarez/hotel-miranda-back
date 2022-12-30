/* Create database */
CREATE USER "hotel"@"localhost" IDENTIFIED BY "hotelmiranda";
CREATE DATABASE hotelmiranda;
SHOW DATABASES;
USE hotelmiranda;
SHOW TABLES;


/* Create tables*/
CREATE OR REPLACE TABLE rooms (
idroom INT NOT NULL AUTO_INCREMENT,
numroom SMALLINT,
photo VARCHAR(500),
type TINYINT,
amenities VARCHAR(500),
price INT,
offer INT,
status TINYINT,
PRIMARY KEY (idroom));

CREATE OR REPLACE TABLE users (
iduser INT NOT NULL AUTO_INCREMENT,
name VARCHAR(255),
photo VARCHAR(500),
position VARCHAR(255),
email VARCHAR(255),
phone VARCHAR(50),
date VARCHAR(100),
description VARCHAR(500),
state TINYINT,
pass VARCHAR(255),
PRIMARY KEY (iduser));

CREATE OR REPLACE TABLE bookings (
idbooking INT NOT NULL AUTO_INCREMENT,
name VARCHAR(255),
bookingorder VARCHAR(100),
checkin VARCHAR(100),
checkout VARCHAR(100),
type TINYINT,
numroom SMALLINT,
price INT,
request VARCHAR(255),
amenities VARCHAR(500),
photos VARCHAR(500),
description VARCHAR(500),
state TINYINT,
PRIMARY KEY (idbooking));

CREATE OR REPLACE TABLE contacts (
idcontact INT NOT NULL AUTO_INCREMENT,
date VARCHAR(255),
customer VARCHAR(255),
email VARCHAR(255),
phone VARCHAR(50),
header VARCHAR(255),
comment VARCHAR(500),
PRIMARY KEY (idcontact));

/* Drop table */
DROP TABLE IF EXISTS table_name;

/* Insert rows */
INSERT INTO rooms SET ?;
INSERT INTO users SET ?;
INSERT INTO bookings SET ?;
INSERT INTO contacts SET ?;

/* Querys rooms controller */
SELECT * FROM rooms;
SELECT * FROM rooms WHERE idroom = ?;
INSERT INTO rooms SET ?;
UPDATE rooms SET ? WHERE idroom = ?;
DELETE FROM rooms WHERE idroom = ?;

/* Querys users controller */
SELECT * FROM users;
SELECT * FROM users WHERE iduser = ?;
INSERT INTO users SET ?;
UPDATE users SET ? WHERE iduser = ?;
DELETE FROM users WHERE iduser = ?;

/* Querys bookings controller */
SELECT * FROM bookings;
SELECT * FROM bookings WHERE idbooking = ?;
INSERT INTO bookings SET ?;
UPDATE bookings SET ? WHERE idbooking = ?;
DELETE FROM bookings WHERE idbooking = ?;

/* Querys contacts controller */
SELECT * FROM contacts;
SELECT * FROM contacts WHERE idcontact = ?;
INSERT INTO contacts SET ?;
UPDATE contacts SET ? WHERE idcontact = ?;
DELETE FROM contacts WHERE idcontact = ?;




