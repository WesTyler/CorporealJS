
USE heroku_d758e10738131e0;

CREATE TABLE users (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  username VARCHAR(250) NOT NULL,
  UNIQUE (username),
  password VARCHAR(250) NOT NULL
);

CREATE TABLE posts (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  title VARCHAR(250),
  UNIQUE (title),
  user_id int(11) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  summary VARCHAR(250), 
  content TEXT
);


CREATE TABLE comments (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  title VARCHAR(250),
  comment TEXT,
  user_id int(11),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  post_id int(11),
  FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
);


