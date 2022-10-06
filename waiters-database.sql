
CREATE TABLE waiters (
    id serial primary key,
    name varchar(255) not null
);
CREATE TABLE working_days (
    id serial primary key,
    name varchar(255) not null
);

create table shifts (
    id serial primary key,
    waiter_id INTEGER NOT NULL,
    day_id INTEGER NOT NULL,
    FOREIGN KEY (waiter_id) REFERENCES waiters(id) ON DELETE CASCADE,
    FOREIGN KEY (day_id) REFERENCES  working_days(id) ON DELETE CASCADE
);

INSERT INTO working_days (name) VALUES ('monday');
INSERT INTO working_days (name) VALUES ('tuesday');
INSERT INTO working_days (name) VALUES ('wednesday');
INSERT INTO working_days (name) VALUES ('thursday');
INSERT INTO working_days (name) VALUES ('friday');
INSERT INTO working_days (name) VALUES ('saturday');
INSERT INTO working_days (name) VALUES ('sunday');