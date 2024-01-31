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
      { picture_url: "./chemin/vers/la/picture" },
      { picture_url: "./chemin/vers/la/picture" },
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
      { user_name: "Nono", password: "Nono", picture_id: "1", is_admin: true },
      {
        user_name: "Estelle",
        password: "SecondUser",
        picture_id: "1",
        is_admin: false,
      },
    ];

    const queriesUser = [];

    // Insert data into the 'user' table for each user in the array
    usersToInsert.forEach((user) => {
      queriesUser.push(
        database.query(
          "insert into user(user_name, password, picture_id, is_admin) values (?, ?, ?, ?)",
          [user.user_name, user.password, user.picture_id, user.is_admin]
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
      { tip_name: "Nettoyant multi-usage", user_id: "1", picture_id: "1" },
      {
        tip_name: "Produit nettoyant pour les sols durs",
        user_id: "1",
        picture_id: "1",
      },
      {
        tip_name: "Désodorisant naturel pour la maison",
        user_id: "1",
        picture_id: "1",
      },
      { tip_name: "Nettoyant pour parquets", user_id: "1", picture_id: "1" },
      { tip_name: "Nettoyant pour toilettes", user_id: "1", picture_id: "1" },
      {
        tip_name: "Détachant naturel pour les tissus",
        user_id: "1",
        picture_id: "1",
      },
      {
        tip_name: "Produit lave-vaisselle écologique",
        user_id: "1",
        picture_id: "1",
      },
      {
        tip_name: "Nettoyant pour vitres et miroirs",
        user_id: "1",
        picture_id: "1",
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
      { tip_id: "1", ingredient_id: "1" },
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
      { tip_id: "1", step_number: "1", step_content: "Nettoyant multi-usage" },
      { tip_id: "1", step_number: "2", step_content: "Nettoyant multi-usage" },
      { tip_id: "1", step_number: "3", step_content: "Nettoyant multi-usage" },
      { tip_id: "1", step_number: "1", step_content: "Nettoyant multi-usage" },
      { tip_id: "1", step_number: "1", step_content: "Nettoyant multi-usage" },
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
