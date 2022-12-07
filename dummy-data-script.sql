-- Delete everything in case of re-running script
DELETE FROM Rating;
DELETE FROM Favorite;
DELETE FROM Decision;
DELETE FROM Choice;
DELETE FROM List;
DELETE FROM User;

ALTER TABLE List   AUTO_INCREMENT = 0;
ALTER TABLE Choice AUTO_INCREMENT = 0;

-- Users
INSERT INTO User (username) VALUES ('Josh'), ('John'), ('jjimbothy'), ('Pedro'), ('etan');

-- Lists
INSERT INTO List (username, l_name, public) VALUES 
    ('Josh', 'Bikes', 0),         -- 1
    ('Josh', 'Restaurants', 1),   -- 2
    ('John', 'Sons', 0),          -- 3
    ('jjimbothy', 'books', 1),    -- 4
    ('John', 'Cars', 1),          -- 5
    ('Pedro', 'Mushrooms', 1),    -- 6
    ('etan', 'Games to buy', 1),  -- 7
    ('John', 'Bikes', 0);         -- 8

-- choices in lists
INSERT INTO Choice (list_id, c_name) VALUES
    (1, 'Stumpjumper'), (1, 'Rock Lobster'), (1, 'Epic'), (1, 'Ripmo'),
    (2, 'Manito Tap House'), (2, 'NoLi'), (2, 'Nudo Ramen'), (2, 'Republic Pi'), 
    (2, 'Our Thai House'), (2, 'Pita Pit'), (3, 'Josh'), (3, 'Pete'), 
    (3, 'Nate'), (4, 'The Two Towers'), (4, 'The Hobbit'), 
    (4, 'Treasure Island'), (4, 'The Heart of Darkness'), (4, 'Moby Dick'),
    (5, 'Jeep'), (5, 'Suburban'), (5, 'Subaru'), (5, 'Porche'), (5, 'Mustang'),
    (6, 'Agaricus'), (6, 'Porcini'), (6, 'Chantarelle'), (6, 'Lions Mane'), 
    (6, 'Oyster'), (7, 'Returnal'), (7, 'Sekiro'), (7, 'Demons Souls'), 
    (7, 'Dark Souls 2'), (7, 'Dead Cells'), (8, 'Cannondale'), 
    (8, 'Rock Lobster'), (8, 'Stumpy'), (8, 'Commuter'), (8, 'Hardtail');

-- decisions made on which list
INSERT INTO Decision (list_id, timestamp) VALUES
    (1, '2022-11-22 03:59:20.123'), (1, '2022-11-21 04:30:20.193'), 
    (1, '2022-11-21 12:59:20.120'), (2, '2022-11-22 03:59:20.123'), 
    (2, '2022-11-23 04:30:20.193'), (2, '2022-11-21 12:59:20.120'),
    (3, '2018-11-22 03:59:20.123'), (3, '2021-11-23 04:30:20.193'), 
    (3, '2022-11-21 12:59:20.120'), (4, '2022-10-22 03:59:20.123'), 
    (4, '2022-11-23 04:30:20.193'), (4, '2022-11-21 12:59:20.120'),
    (5, '2022-11-22 03:59:20.123'), (6, '2022-11-23 04:30:20.193'), 
    (7, '2022-11-21 12:59:20.120'), (7, '2022-11-22 03:59:20.123'), 
    (5, '2022-11-23 04:30:20.193'), (8, '2022-11-21 12:59:20.120');

INSERT INTO Favorite (username, list_id) VALUES
    ('jjimbothy', 2), ('jjimbothy', 5), ('jjimbothy', 6),
    ('Pedro', 7), ('Pedro', 4), ('Pedro', 5),
    ('etan', 6), ('etan', 4),
    ('John', 1), ('John', 7);

INSERT INTO Rating (username, list_id, rating) VALUES
    ('Josh', 7, 5), ('Josh', 6, 1), ('Josh', 4, 4), ('Josh', 5, 5),
    ('John', 7, 4), ('John', 6, 4), ('John', 2, 4), ('John', 4, 4),
    ('Pedro', 7, 4), ('Pedro', 5, 4), ('Pedro', 2, 4), ('Pedro', 4, 4),
    ('etan', 6, 4), ('etan', 5, 4), ('etan', 2, 4), ('etan', 4, 4),
    ('jjimbothy', 6, 4), ('jjimbothy', 5, 4), ('jjimbothy', 2, 4), 
    ('jjimbothy', 7, 5);
