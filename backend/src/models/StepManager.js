const AbstractManager = require("./AbstractManager");

class StepManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "step" as configuration
    super({ table: "step" });
  }

  // The C of CRUD - Create operation

  async create(step) {
    const { tipId, stepNumber, stepContent } = step;
    // Execute the SQL INSERT query to add a new step to the "step" table
    const [result] = await this.database.query(
      `insert into ${this.table} (tip_id, step_number, step_content) values (?, ?, ?)`,
      [tipId, stepNumber, stepContent]
    );

    // Return the ID of the newly inserted step
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific step by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the step
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all steps from the "step" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of steps
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing step

  async update(step, id) {
    // Execute the SQL INSERT query to update the row with tie id on the "step" table
    const result = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [step, id]
    );

    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an step by its ID
  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = StepManager;
