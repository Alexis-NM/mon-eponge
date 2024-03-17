/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class TipManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "tip" as configuration
    super({ table: "tip" });
  }

  // The C of CRUD - Create operation

  async create(tip) {
    const { tip_name, user_id, picture_id, steps, ingredients } = tip;

    // Execute the SQL INSERT query to add a new tip to the "tip" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (tip_name, user_id, picture_id) VALUES (?, ?, ?)`,
      [tip_name, user_id, picture_id]
    );

    // Retrieve the ID of the newly inserted tip
    const tipId = result.insertId;

    // Check if steps and ingredients are provided
    if (steps && steps.length > 0) {
      // Insert steps into the "step" table
      await Promise.all(
        steps.map(async (step, index) => {
          await this.database.query(
            `INSERT INTO step (tip_id, step_number, step_content) VALUES (?, ?, ?)`,
            [tipId, index + 1, step.step_content]
          );
        })
      );
    }

    if (ingredients && ingredients.length > 0) {
      // Iterate through ingredients and insert them or retrieve existing ones
      await Promise.all(
        ingredients.map(async (ingredient) => {
          if (ingredient.id) {
            // If ingredient has an ID, assume it already exists
            await this.database.query(
              `INSERT INTO tip_ingredient (tip_id, ingredient_id) VALUES (?, ?)`,
              [tipId, ingredient.id]
            );
          } else {
            // If ingredient has no ID, assume it's a new ingredient
            const [ingredientResult] = await this.database.query(
              `INSERT INTO ingredient (ingredient_name) VALUES (?)`,
              [ingredient.ingredient_name]
            );

            // Insert the new ingredient into the tip_ingredient table
            await this.database.query(
              `INSERT INTO tip_ingredient (tip_id, ingredient_id) VALUES (?, ?)`,
              [tipId, ingredientResult.insertId]
            );
          }
        })
      );
    }

    // Return the ID of the newly inserted tip
    return tipId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific tip by its ID
    const [rows] = await this.database.query(
      `
    SELECT 
      tip.id,
      tip.tip_name,
      tip.user_id,
      tip.picture_id,
      picture.picture_url,
      GROUP_CONCAT(DISTINCT step.step_content ORDER BY step.step_number) AS steps,
      GROUP_CONCAT(DISTINCT ingredient.ingredient_name) AS ingredients
    FROM tip
    LEFT JOIN picture ON tip.picture_id = picture.id
    LEFT JOIN step ON tip.id = step.tip_id
    LEFT JOIN tip_ingredient ON tip.id = tip_ingredient.tip_id
    LEFT JOIN ingredient ON tip_ingredient.ingredient_id = ingredient.id
    WHERE tip.id = ?
    GROUP BY tip.id, tip.tip_name, tip.user_id, tip.picture_id, picture.picture_url
  `,
      [id]
    );

    // Return the first row of the result, which represents the tip
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`
    SELECT 
      tip.id,
      tip.tip_name,
      tip.user_id,
      tip.picture_id,
      picture.picture_url,
      GROUP_CONCAT(DISTINCT step.step_content ORDER BY step.step_number) AS steps,
      GROUP_CONCAT(DISTINCT ingredient.ingredient_name) AS ingredients
    FROM tip
    LEFT JOIN picture ON tip.picture_id = picture.id
    LEFT JOIN step ON tip.id = step.tip_id
    LEFT JOIN tip_ingredient ON tip.id = tip_ingredient.tip_id
    LEFT JOIN ingredient ON tip_ingredient.ingredient_id = ingredient.id
    GROUP BY tip.id
  `);
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing tip

  async update(tip, id) {
    const { tip_name, steps, ingredients, picture_id } = tip;

    // Execute the SQL UPDATE query to update the row with the id in the "tip" table
    await this.database.query(
      `UPDATE ${this.table} SET tip_name = ?, picture_id = ? WHERE id = ?`,
      [tip_name, picture_id, id]
    );

    // Delete existing steps for the tip
    await this.database.query(`DELETE FROM step WHERE tip_id = ?`, [id]);

    // Insert new steps for the tip
    if (steps && steps.length > 0) {
      await Promise.all(
        steps.map(async (step, index) => {
          await this.database.query(
            `INSERT INTO step (tip_id, step_number, step_content) VALUES (?, ?, ?)`,
            [id, index + 1, step.step_content]
          );
        })
      );
    }

    // Delete existing tip_ingredient records for the tip
    await this.database.query(`DELETE FROM tip_ingredient WHERE tip_id = ?`, [
      id,
    ]);

    // Insert new tip_ingredient records for the tip
    if (ingredients && ingredients.length > 0) {
      await Promise.all(
        ingredients.map(async (ingredient) => {
          // Check if the ingredient already exists in the database
          const [existingIngredient] = await this.database.query(
            `SELECT id FROM ingredient WHERE ingredient_name = ?`,
            [ingredient.ingredient_name]
          );

          if (existingIngredient.length > 0) {
            // If the ingredient exists, insert it into the tip_ingredient table
            await this.database.query(
              `INSERT INTO tip_ingredient (tip_id, ingredient_id) VALUES (?, ?)`,
              [id, existingIngredient[0].id]
            );
          } else {
            // If the ingredient doesn't exist, insert it into the ingredient table first
            const [result] = await this.database.query(
              `INSERT INTO ingredient (ingredient_name) VALUES (?)`,
              [ingredient.ingredient_name]
            );

            // Insert the new ingredient into the tip_ingredient table
            await this.database.query(
              `INSERT INTO tip_ingredient (tip_id, ingredient_id) VALUES (?, ?)`,
              [id, result.insertId]
            );
          }
        })
      );
    }
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an tip by its ID
  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = TipManager;
