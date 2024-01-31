const AbstractManager = require("./AbstractManager");

class IngredientManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "ingredient" as configuration
    super({ table: "ingredient" });
  }

  // The C of CRUD - Create operation

  async create(ingredient) {
    const { ingredientName } = ingredient;
    // Execute the SQL INSERT query to add a new ingredient to the "ingredient" table
    const [result] = await this.database.query(
      `insert into ${this.table} (ingredient_name) values (?)`,
      [ingredientName]
    );

    // Return the ID of the newly inserted ingredient
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific ingredient by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the ingredient
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all ingredients from the "ingredient" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of ingredients
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing ingredient

  async update(ingredient, id) {
    // Execute the SQL INSERT query to update the row with tie id on the "ingredient" table
    const result = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [ingredient, id]
    );

    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an ingredient by its ID
  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = IngredientManager;
