-- Your DROP TABLE statements

DROP TABLE IF EXISTS step;
DROP TABLE IF EXISTS tip_ingredient;
DROP TABLE IF EXISTS tip;
DROP TABLE IF EXISTS picture;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS user;

-- Your CREATE TABLE statements

CREATE TABLE picture (
    id INT AUTO_INCREMENT PRIMARY KEY,
    picture_url varchar(255) NOT NULL
);

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
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

-- Insertion des images dans la table picture
INSERT INTO picture (picture_url) VALUES
("profil_bubble.svg"),
("bath.svg"),
("bottle.svg"),
("brush.svg"),
("clean_set.svg"),
("floor.svg"),
("lavander.svg"),
("lemon.svg"),
("mint.svg"),
("powder.svg"),
("sink.svg"),
("soap.svg"),
("spoon.svg"),
("towel.svg"),
("yellow-soap.svg"),
("broom.svg");

-- Insertion des utilisateurs dans la table user
INSERT INTO user (user_name, hashed_password, picture_id, is_admin) VALUES
("Nono", "$argon2id$v=19$m=19,t=2,p=1$WnlodktQTUJjaldtSU40ag$+T2KYe86I3GQzQ", 1, true),
("Estelle", "$argon2id$v=19$m=65536,t=5,p=1$HIExBMINy6J2KCFkaXUTGA$RhPP/QXbHoxL1IUYwW6cVA+jfDXioQz6x/FQhBejLYk", 1, false);

-- Insertion des ingrédients dans la table ingredient
INSERT INTO ingredient (ingredient_name) VALUES
("Vinaigre Blanc"),
("Bicarbonate de soude"),
("Savon de Marseille"),
("Acide citrique"),
("Savon Noir"),
("Percarbonate de soude"),
("Huile essentielle d'arbre à thé"),
("Cristaux de soude"),
("Vinaigre de cidre"),
("Citron"),
("Huile essentielle de citron"),
("Borax"),
("Huile essentielle de lavande"),
("Sel"),
("Amidon de maïs"),
("Huile essentielle de menthe poivrée"),
("Huile de coco"),
("Feuilles de thé usagées"),
("Jus de citron"),
("Huile essentielle d'eucalyptus"),
("Cire d'abeille"),
("Cristaux de soude"),
("Fécule de maïs"),
("Huile essentielle de romarin"),
("Argile blanche"),
("Vinaigre de vin rouge"),
("Écorce de citron"),
("Huile essentielle de citronnelle"),
("Feuilles de sauge"),
("Huile essentielle de thym"),
("Huile essentielle de menthe verte"),
("Feuilles de basilic"),
("Vodka"),
("Huile essentielle de ylang-ylang"),
("Miel");

-- Insertion des conseils dans la table tip
INSERT INTO tip (tip_name, user_id, picture_id) VALUES
("Nettoyant multi-usage", 1, 15),
("Produit nettoyant pour les sols durs", 1, 6),
("Désodorisant naturel pour la maison", 1, 9),
("Nettoyant pour parquets", 1, 6),
("Nettoyant pour toilettes", 1, 5),
("Détachant naturel pour les tissus", 1, 14),
("Produit lave-vaisselle écologique", 1, 12),
("Nettoyant pour vitres et miroirs", 1, 8),
("Détartrant naturel pour robinets et pommeau de douche", 1, 11),
("Éliminateur de moisissures naturel", 1, 7);

-- Insertion des ingrédients associés aux conseils dans la table tip_ingredient
INSERT INTO tip_ingredient (tip_id, ingredient_id) VALUES
(1, 1), (1, 7), (1, 11), (1, 13),
(2, 1), (1, 7), (2, 10), (2, 13),
(3, 2), (3, 11), (3, 13),
(4, 1), (4, 11),
(5, 1), (5, 2),
(6, 2),
(7, 3),
(8, 1), (8, 11),
(9, 1),
(10, 1), (10, 2);

-- Insertion des étapes associées aux conseils dans la table step
INSERT INTO step (tip_id, step_number, step_content) VALUES
(1, 1, "Mélangez parts égales d'eau et de vinaigre blanc dans un vaporisateur."),
(1, 2, "Ajoutez quelques gouttes d'huile essentielle (citron, tea tree, lavande) pour une odeur agréable."),
(1, 3, "Utilisez pour nettoyer les surfaces, les comptoirs, les éviers, etc."),
(2, 1, "Mélangez 1/4 de tasse de vinaigre blanc avec un seau d'eau tiède."),
(2, 2, "Ajoutez quelques gouttes d'huile essentielle pour une odeur agréable."),
(2, 3, "Utilisez pour nettoyer les sols en carrelage, en linoléum, etc."),
(3, 1, "Mélangez du bicarbonate de soude avec quelques gouttes d'huiles essentielles de votre choix (lavande, citron, eucalyptus)."),
(3, 2, "Placez ce mélange dans un petit bol ou un sachet en tissu et disposez-le dans différentes pièces de la maison pour éliminer les mauvaises odeurs."),
(4, 1, "Mélangez 1/4 de tasse de vinaigre avec 1 litre d'eau tiède."),
(4, 2, "Ajoutez quelques gouttes d'huile essentielle de citron."),
(4, 3, "Nettoyez délicatement le parquet avec un chiffon humide."),
(5, 1, "Saupoudrez du bicarbonate de soude dans la cuvette."),
(5, 2, "Ajoutez du vinaigre, laissez reposer, puis frottez et tirez la chasse."),
(6, 1, "Mélangez du bicarbonate de soude avec de l'eau pour former une pâte."),
(6, 2, "Appliquez cette pâte sur les taches sur les tissus, laissez agir pendant un certain temps, puis lavez normalement."),
(7, 1, "Mélangez du savon de Marseille râpé avec de l'eau chaude dans une bouteille."),
(7, 2, "Utilisez ce mélange pour laver votre vaisselle à la main de manière écologique."),
(8, 1, "Mélangez 1 tasse de vinaigre blanc avec 1 tasse d'eau dans un vaporisateur."),
(8, 2, "Vaporisez directement sur la surface à nettoyer et essuyez avec un chiffon en microfibres."),
(9, 1, "Frottez les zones tachées avec du vinaigre blanc pur."),
(9, 2, "Pour les pommeaux de douche, trempez-les dans du vinaigre chaud pendant la nuit."),
(10, 1, "Mélangez du vinaigre blanc avec du bicarbonate de soude pour former une pâte."),
(10, 2, "Appliquez cette pâte sur les zones touchées par la moisissure, laissez agir pendant un moment, puis frottez avec une brosse et rincez abondamment.");
