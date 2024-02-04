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
    const { tip_name, user_id, picture_id } = tip;
    // Execute the SQL INSERT query to add a new tip to the "tip" table
    const [result] = await this.database.query(
      `insert into ${this.table} (tip_name, user_id, picture_id) values (?, ?, ?)`,
      [tip_name, user_id, picture_id]
    );

    // Return the ID of the newly inserted tip
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific tip by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
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
    // Execute the SQL INSERT query to update the row with tie id on the "tip" table
    const result = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [tip, id]
    );

    return result;
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
