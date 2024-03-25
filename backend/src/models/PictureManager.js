/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class PictureManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "picture" as configuration
    super({ table: "picture" });
  }

  // The C of CRUD - Create operation

  async create(picture) {
    const { picture_url } = picture;
    const [result] = await this.database.query(
      `insert into ${this.table} (picture_url) values (?)`,
      [picture_url]
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific picture by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the picture
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all pictures from the "picture" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of pictures
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing picture

  async update(picture, id) {
    // Execute the SQL INSERT query to update the row with tie id on the "picture" table
    const result = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [picture, id]
    );

    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an picture by its ID
  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = PictureManager;
