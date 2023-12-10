CREATE TABLE activities(
	act_id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users(user_id),
	activity VARCHAR(100)
)

CREATE TABLE users(
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(50),
	email VARCHAR(100) UNIQUE,
	password CHAR(60)
);

INSERT INTO users(username, email, password)
VALUES ('Jcypher', 'jcypher2121@gmail.com', '$2a$10$g0EN.1wYfoBxX0DL0oBqwu8/.g48pgwdpxIhoJVcg5ZxG8JG07jEO');

INSERT INTO activities(user_id, activity)
VALUES (1, 'Buy tissue'), (1, 'Buy cotton buds');

SELECT * FROM users;

SELECT * FROM activities;

