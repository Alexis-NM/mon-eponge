/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    await Promise.all(queries);

    /* ************************************************************************* */

    const picturesToInsert = [
      { picture_url: "profil_bubble.svg" },
      { picture_url: "bath.svg" },
      { picture_url: "bottle.svg" },
      { picture_url: "brush.svg" },
      { picture_url: "clean_set.svg" },
      { picture_url: "floor.svg" },
      { picture_url: "lavander.svg" },
      { picture_url: "lemon.svg" },
      { picture_url: "mint.svg" },
      { picture_url: "powder.svg" },
      { picture_url: "sink.svg" },
      { picture_url: "soap.svg" },
      { picture_url: "spoon.svg" },
      { picture_url: "towel.svg" },
      { picture_url: "yellow-soap.svg" },
    ];

    const queriesPicture = [];

    // Insert data into the 'picture' table for each user in the array
    picturesToInsert.forEach((picture) => {
      queriesPicture.push(
        database.query("insert into picture(picture_url) values (?)", [
          picture.picture_url,
        ])
      );
    });
    // Wait for all the insertion queries to complete
    await Promise.all(queriesPicture);
    /* ************************************************************************* */

    const usersToInsert = [
      {
        user_name: "Nono",
        hashed_password:
          "$argon2id$v=19$m=19,t=2,p=1$WnlodktQTUJjaldtSU40ag$+T2KYe86I3GQzQ",
        picture_id: "1",
        is_admin: true,
      },
      {
        user_name: "Estelle",
        hashed_password:
          "$argon2id$v=19$m=65536,t=5,p=1$HIExBMINy6J2KCFkaXUTGA$RhPP/QXbHoxL1IUYwW6cVA+jfDXioQz6x/FQhBejLYk",
        picture_id: "1",
        is_admin: false,
      },
    ];

    const queriesUser = [];

    // Insert data into the 'user' table for each user in the array
    usersToInsert.forEach((user) => {
      queriesUser.push(
        database.query(
          "insert into user(user_name, hashed_password, picture_id, is_admin) values (?, ?, ?, ?)",
          [user.user_name, user.hashed_password, user.picture_id, user.is_admin]
        )
      );
    });

    // Wait for all the insertion queries to complete
    await Promise.all(queriesUser);

    /* ************************************************************************* */

    const ingredientsToInsert = [
      { ingredient_name: "Vinaigre Blanc" },
      { ingredient_name: "Bicarbonate de soude" },
      { ingredient_name: "Savon de Marseille" },
      { ingredient_name: "Acide citrique" },
      { ingredient_name: "Savon Noir" },
      { ingredient_name: "Percarbonate de soude" },
      { ingredient_name: "Huile essentielle d'arbre à thé" },
      { ingredient_name: "Cristaux de soude" },
      { ingredient_name: "Vinaigre de cidre" },
      { ingredient_name: "Citron" },
      { ingredient_name: "Huile essentielle de citron" },
      { ingredient_name: "Borax" },
      { ingredient_name: "Huile essentielle de lavande" },
      { ingredient_name: "Sel" },
      { ingredient_name: "Amidon de maïs" },
      { ingredient_name: "Huile essentielle de menthe poivrée" },
      { ingredient_name: "Huile de coco" },
      {
        ingredient_name: "Feuilles de thé usagées",
      },
      { ingredient_name: "Jus de citron" },
      { ingredient_name: "Huile essentielle d'eucalyptus" },
      {
        ingredient_name: "Cire d'abeille",
      },
      { ingredient_name: "Cristaux de soude" },
      { ingredient_name: "Fécule de maïs" },
      { ingredient_name: "Huile essentielle de romarin" },
      { ingredient_name: "Argile blanche" },
      { ingredient_name: "Vinaigre de vin rouge" },
      { ingredient_name: "Écorce de citron" },
      { ingredient_name: "Huile essentielle de citronnelle" },
      { ingredient_name: "Feuilles de sauge" },
      { ingredient_name: "Huile essentielle de thym" },
      { ingredient_name: "Huile essentielle de menthe verte" },
      { ingredient_name: "Feuilles de basilic" },
      { ingredient_name: "Vodka" },
      { ingredient_name: "Huile essentielle de ylang-ylang" },
      { ingredient_name: "Miel" },
    ];

    const queriesIngredient = [];

    // Insert data into the 'ingredient' table for each user in the array
    ingredientsToInsert.forEach((ingredient) => {
      queriesIngredient.push(
        database.query("insert into ingredient(ingredient_name) values (?)", [
          ingredient.ingredient_name,
        ])
      );
    });
    // Wait for all the insertion queries to complete
    await Promise.all(queriesIngredient);

    /* ************************************************************************* */

    const tipsToInsert = [
      { tip_name: "Nettoyant multi-usage", user_id: "1", picture_id: "16" },
      {
        tip_name: "Produit nettoyant pour les sols durs",
        user_id: "1",
        picture_id: "4",
      },
      {
        tip_name: "Désodorisant naturel pour la maison",
        user_id: "1",
        picture_id: "10",
      },
      { tip_name: "Nettoyant pour parquets", user_id: "1", picture_id: "7" },
      { tip_name: "Nettoyant pour toilettes", user_id: "1", picture_id: "6" },
      {
        tip_name: "Détachant naturel pour les tissus",
        user_id: "1",
        picture_id: "15",
      },
      {
        tip_name: "Produit lave-vaisselle écologique",
        user_id: "1",
        picture_id: "13",
      },
      {
        tip_name: "Nettoyant pour vitres et miroirs",
        user_id: "1",
        picture_id: "2",
      },
      {
        tip_name: "Détartrant naturel pour robinets et pommeau de douche",
        user_id: "1",
        picture_id: "12",
      },
      {
        tip_name: "Éliminateur de moisissures naturel",
        user_id: "1",
        picture_id: "5",
      },
    ];

    const queriesTip = [];

    // Insert data into the 'tip' table for each user in the array
    tipsToInsert.forEach((tip) => {
      queriesTip.push(
        database.query(
          "insert into tip(tip_name, user_id, picture_id) values (?, ?, ?)",
          [tip.tip_name, tip.user_id, tip.picture_id]
        )
      );
    });

    // Wait for all the insertion queries to complete
    await Promise.all(queriesTip);

    /* ************************************************************************* */

    const tipIngredientsToInsert = [
      { tip_id: "1", ingredient_id: "1" },
      { tip_id: "1", ingredient_id: "10" },
      { tip_id: "1", ingredient_id: "13" },
      { tip_id: "2", ingredient_id: "1" },
      { tip_id: "2", ingredient_id: "10" },
      { tip_id: "2", ingredient_id: "13" },
      { tip_id: "3", ingredient_id: "1" },
      { tip_id: "3", ingredient_id: "13" },
      { tip_id: "3", ingredient_id: "12" },
      { tip_id: "4", ingredient_id: "1" },
      { tip_id: "4", ingredient_id: "13" },
      { tip_id: "4", ingredient_id: "11" },
      { tip_id: "5", ingredient_id: "1" },
      { tip_id: "5", ingredient_id: "13" },
      { tip_id: "6", ingredient_id: "1" },
      { tip_id: "6", ingredient_id: "13" },
      { tip_id: "7", ingredient_id: "1" },
      { tip_id: "7", ingredient_id: "13" },
      { tip_id: "8", ingredient_id: "1" },
      { tip_id: "8", ingredient_id: "11" },
      { tip_id: "9", ingredient_id: "1" },
      { tip_id: "9", ingredient_id: "13" },
      { tip_id: "10", ingredient_id: "1" },
      { tip_id: "10", ingredient_id: "2" },
    ];

    const queriesTipIngredient = [];

    // Insert data into the 'tip_ingredient' table for each user in the array
    tipIngredientsToInsert.forEach((tipIngredient) => {
      queriesTipIngredient.push(
        database.query(
          "insert into tip_ingredient(tip_id, ingredient_id) values (?, ?)",
          [tipIngredient.tip_id, tipIngredient.ingredient_id]
        )
      );
    });

    // Wait for all the insertion queries to complete
    await Promise.all(queriesTipIngredient);

    /* ************************************************************************* */

    const stepsToInsert = [
      {
        tip_id: "1",
        step_number: "1",
        step_content:
          "Mélangez parts égales d'eau et de vinaigre blanc dans un vaporisateur.",
      },
      {
        tip_id: "1",
        step_number: "2",
        step_content:
          "Ajoutez quelques gouttes d'huile essentielle (citron, tea tree, lavande) pour une odeur agréable.",
      },
      {
        tip_id: "1",
        step_number: "3",
        step_content:
          "Utilisez pour nettoyer les surfaces, les comptoirs, les éviers, etc.",
      },
      {
        tip_id: "2",
        step_number: "1",
        step_content:
          "Mélangez 1/4 de tasse de vinaigre blanc avec un seau d'eau tiède.",
      },
      {
        tip_id: "2",
        step_number: "2",
        step_content:
          "Ajoutez quelques gouttes d'huile essentielle pour une odeur agréable.",
      },
      {
        tip_id: "2",
        step_number: "3",
        step_content:
          "Utilisez pour nettoyer les sols en carrelage, en linoléum, etc.",
      },
      {
        tip_id: "3",
        step_number: "1",
        step_content:
          "Mélangez du bicarbonate de soude avec quelques gouttes d'huiles essentielles de votre choix (lavande, citron, eucalyptus).",
      },
      {
        tip_id: "3",
        step_number: "2",
        step_content:
          "Placez ce mélange dans un petit bol ou un sachet en tissu et disposez-le dans différentes pièces de la maison pour éliminer les mauvaises odeurs.",
      },
      {
        tip_id: "4",
        step_number: "1",
        step_content:
          "Mélangez 1/4 de tasse de vinaigre avec 1 litre d'eau tiède.",
      },
      {
        tip_id: "4",
        step_number: "2",
        step_content: "Ajoutez quelques gouttes d'huile essentielle de citron.",
      },
      {
        tip_id: "4",
        step_number: "3",
        step_content:
          "Nettoyez délicatement le parquet avec un chiffon humide.",
      },
      {
        tip_id: "5",
        step_number: "1",
        step_content: "Saupoudrez du bicarbonate de soude dans la cuvette.",
      },
      {
        tip_id: "5",
        step_number: "2",
        step_content:
          "Ajoutez du vinaigre, laissez reposer, puis frottez et tirez la chasse.",
      },
      {
        tip_id: "6",
        step_number: "1",
        step_content:
          "Mélangez du bicarbonate de soude avec de l'eau pour former une pâte.",
      },
      {
        tip_id: "6",
        step_number: "2",
        step_content:
          "Appliquez cette pâte sur les taches sur les tissus, laissez agir pendant un certain temps, puis lavez normalement.",
      },
      {
        tip_id: "7",
        step_number: "1",
        step_content:
          "Mélangez du savon de Marseille râpé avec de l'eau chaude dans une bouteille.",
      },
      {
        tip_id: "7",
        step_number: "2",
        step_content:
          "Utilisez ce mélange pour laver votre vaisselle à la main de manière écologique.",
      },
      {
        tip_id: "8",
        step_number: "1",
        step_content:
          "Mélangez 1 tasse de vinaigre blanc avec 1 tasse d'eau dans un vaporisateur.",
      },
      {
        tip_id: "8",
        step_number: "2",
        step_content:
          "Vaporisez directement sur la surface à nettoyer et essuyez avec un chiffon en microfibres.",
      },
      {
        tip_id: "9",
        step_number: "1",
        step_content: "Frottez les zones tachées avec du vinaigre blanc pur.",
      },
      {
        tip_id: "9",
        step_number: "2",
        step_content:
          "Pour les pommeaux de douche, trempez-les dans du vinaigre chaud pendant la nuit.",
      },
      {
        tip_id: "10",
        step_number: "1",
        step_content:
          "Mélangez du vinaigre blanc avec du bicarbonate de soude pour former une pâte.",
      },
      {
        tip_id: "10",
        step_number: "2",
        step_content:
          "Appliquez cette pâte sur les zones touchées par la moisissure, laissez agir pendant un moment, puis frottez avec une brosse et rincez abondamment.",
      },
    ];

    const queriesStep = [];

    // Insert data into the 'step' table for each user in the array
    stepsToInsert.forEach((step) => {
      queriesStep.push(
        database.query(
          "insert into step(tip_id, step_number, step_content) values (?, ?, ?)",
          [step.tip_id, step.step_number, step.step_content]
        )
      );
    });

    // Wait for all the insertion queries to complete
    await Promise.all(queriesStep);

    /* ************************************************************************* */

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
