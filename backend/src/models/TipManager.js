const AbstractManager = require("./AbstractManager");

class TipManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "tip" as configuration
    super({ table: "tip" });
  }

  // The C of CRUD - Create operation

  async create(tip) {
    const { tipName, userId, pictureId } = tip;
    // Execute the SQL INSERT query to add a new tip to the "tip" table
    const [result] = await this.database.query(
      `insert into ${this.table} (tip_name, user_id, picture_id) values (?, ?, ?)`,
      [tipName, userId, pictureId]
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
    // Execute the SQL SELECT query to retrieve all tips from the "tip" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of tips
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
