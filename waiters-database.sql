
CREATE TABLE waiters (
    id serial primary key,
    waiter varchar(255) not null
);
CREATE TABLE working_days (
    id serial primary key,
    day varchar(255) not null
);

create table shifts (
    id serial primary key,
    waiter_id INTEGER NOT NULL,
    day_id INTEGER NOT NULL,
    FOREIGN KEY (waiter_id) REFERENCES waiters(id) ON DELETE CASCADE,
    FOREIGN KEY (day_id) REFERENCES  working_days(id) ON DELETE CASCADE
);

INSERT INTO working_days (day) VALUES ('monday');
INSERT INTO working_days (day) VALUES ('tuesday');
INSERT INTO working_days (day) VALUES ('wednesday');
INSERT INTO working_days (day) VALUES ('thursday');
INSERT INTO working_days (day) VALUES ('friday');
INSERT INTO working_days (day) VALUES ('saturday');
INSERT INTO working_days (day) VALUES ('sunday');