DROP TABLE IF EXISTS steps;
DROP TABLE IF EXISTS tip_ingredients;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS tips;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT false
);

CREATE TABLE tips (
  tip_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  tip_name VARCHAR(255) NOT NULL,
  CONSTRAINT fk_user_tip FOREIGN KEY (user_id) REFERENCES users (user_id)
  );

CREATE TABLE ingredients (
  ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
  ingredient_name VARCHAR(255) NOT NULL
);

CREATE TABLE tip_ingredients (
  tip_ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
  tip_id INT,
  ingredient_id INT,
  CONSTRAINT fk_tip_ingredients_tip FOREIGN KEY (tip_id) REFERENCES tips (tip_id),
  CONSTRAINT fk_tip_ingredients_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredients (ingredient_id)
);

CREATE TABLE steps (
  step_id INT AUTO_INCREMENT PRIMARY KEY,
  tip_id INT,
  step_number INT,
  step_content VARCHAR(1000) NOT NULL,
   CONSTRAINT fk_steps_tip FOREIGN KEY (tip_id) REFERENCES tips (tip_id)
);

-- Ajout d'ingrédients écologiques à la table des ingrédients
INSERT INTO ingredients (ingredient_name) VALUES
('Vinaigre blanc'),
('Bicarbonate de soude'),
('Citron'),
('Huile essentielle de tea tree'),
('Savon de Castille'),
('Citronnelle'),
('Vinaigre de cidre'),
('Huile essentielle de citron'),
('Borax (utilisé avec précaution)'),
('Cristaux de soude (soude en cristaux)'),
('Eau oxygénée'),
('Acide citrique');
