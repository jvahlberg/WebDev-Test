--Clear tables and make again if script is run

DROP TABLE IF EXISTS Rating;
DROP TABLE IF EXISTS Favorite;
DROP TABLE IF EXISTS Decision;
DROP TABLE IF EXISTS Choice;
DROP TABLE IF EXISTS List;
DROP TABLE IF EXISTS User;

-- User table: 
-- contains unique usernames
CREATE TABLE User (
    username VARCHAR(100),
    PRIMARY KEY (username)
);

-- List table:
-- unique id
-- list name  
-- public tells whether user makes list public or private
CREATE TABLE List (
    list_id INT UNSIGNED AUTO_INCREMENT,
    username VARCHAR(100),
    l_name VARCHAR(100) NOT NULL,
    public BOOL NOT NULL,
    PRIMARY KEY (list_id),
    FOREIGN KEY (username) REFERENCES User(username)
);

-- Choices table:
-- unique id
-- name of choice in the list
CREATE TABLE Choice (
    choice_id INT UNSIGNED AUTO_INCREMENT,
    list_id INT UNSIGNED,
    c_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (choice_id),
    FOREIGN KEY (list_id) 
        REFERENCES List (list_id)
        ON DELETE CASCADE
);

-- Decisions table:
-- Tracks the time a decision is made on a specific list for analytic purposes
CREATE TABLE Decision (
    list_id INT UNSIGNED,
    timestamp DATETIME(3),
    PRIMARY KEY (list_id, timestamp),
    FOREIGN KEY (list_id) REFERENCES List (list_id)
    ON DELETE CASCADE
);

-- Favorites table:
-- Tracks which user has "favorited" a list of choices
CREATE TABLE Favorite (
    username VARCHAR(100),
    list_id INT UNSIGNED,
    PRIMARY KEY (username, list_id),
    FOREIGN KEY (username) REFERENCES User(username),
    FOREIGN KEY (list_id) REFERENCES List(list_id)
    ON DELETE CASCADE
);

-- Rating table:
-- stores which user rated which table
CREATE TABLE Rating (
    username VARCHAR(100),
    list_id INT UNSIGNED,
    rating INT UNSIGNED NOT NULL,
    PRIMARY KEY (username, list_id),
    FOREIGN KEY (username) REFERENCES User(username),
    FOREIGN KEY (list_id) REFERENCES List(list_id) ON DELETE CASCADE,
    CONSTRAINT valid_rating CHECK (
        rating >= 1 AND rating <= 5
    )
    
);