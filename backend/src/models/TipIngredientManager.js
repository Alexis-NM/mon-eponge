/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class TipIngredientManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "tip_ingredient" as configuration
    super({ table: "tip_ingredient" });
  }

  // The C of CRUD - Create operation

  async create(tip_ingredient) {
    const { tip_id, ingredient_id } = tip_ingredient;
    // Execute the SQL INSERT query to add a new tip_ingredient to the "tip_ingredient" table
    const [result] = await this.database.query(
      `insert into ${this.table} (tip_id, ingredient_id) values (?, ?)`,
      [tip_id, ingredient_id]
    );

    // Return the ID of the newly inserted tip_ingredient
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific tip_ingredient by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the tip_ingredient
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all tip_ingredients from the "tip_ingredient" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of tip_ingredients
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing tip_ingredient

  async update(tipIngredient, id) {
    // Execute the SQL INSERT query to update the row with tie id on the "tip_ingredient" table
    const result = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [tipIngredient, id]
    );

    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an tip_ingredient by its ID
  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = TipIngredientManager;
