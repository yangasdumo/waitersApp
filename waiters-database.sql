
CREATE TABLE myWaiters (
    id serial primary key,
    name varchar(255) not null
);
CREATE TABLE workingDays (
    id serial primary key,
    name varchar(255) not null
);
INSERT INTO workingDays (name) VALUES ('monday');
INSERT INTO workingDays (name) VALUES ('tuesday');
INSERT INTO workingDays (name) VALUES ('wednesday');
INSERT INTO workingDays (name) VALUES ('thursday');
INSERT INTO workingDays (name) VALUES ('friday');
INSERT INTO workingDays (name) VALUES ('saturday');
INSERT INTO workingDays (name) VALUES ('sunday');

create table theShifts (
    id serial primary key,
    thewaiter_id INTEGER NOT NULL,
    theday_id INTEGER NOT NULL,
    FOREIGN KEY (thewaiter_id) REFERENCES myWaiters (id),
    FOREIGN KEY (theday_id) REFERENCES  workingDays (id)
);
