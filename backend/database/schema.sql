DROP TABLE IF EXISTS step;
DROP TABLE IF EXISTS tip_ingredient;
DROP TABLE IF EXISTS tip;
DROP TABLE IF EXISTS picture;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS user;

CREATE TABLE picture (
    id INT AUTO_INCREMENT PRIMARY KEY,
    picture_url varchar(255) NOT NULL
);

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  picture_id INT NOT NULL DEFAULT 1,
  is_admin BOOLEAN DEFAULT false,
  CONSTRAINT fk_user_picture FOREIGN KEY (picture_id) REFERENCES picture(id)
);

CREATE TABLE ingredient (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ingredient_name VARCHAR(255) NOT NULL
);

CREATE TABLE tip (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tip_name VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  picture_id INT NOT NULL,
  CONSTRAINT fk_tip_user FOREIGN KEY (user_id) REFERENCES user(id),
  CONSTRAINT fk_tip_picture FOREIGN KEY (picture_id) REFERENCES picture(id)
  );

CREATE TABLE tip_ingredient (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tip_id INT,
  ingredient_id INT,
  CONSTRAINT fk_tip_ingredient_tip FOREIGN KEY (tip_id) REFERENCES tip(id),
  CONSTRAINT fk_tip_ingredient_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)
);

CREATE TABLE step (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tip_id INT NOT NULL,
  step_number INT NOT NULL,
  step_content VARCHAR(1000) NOT NULL,
   CONSTRAINT fk_step_tip FOREIGN KEY (tip_id) REFERENCES tip(id)
);
