/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation
  async create(user) {
    const { user_name, hashed_password, picture_id, is_admin } = user;

    // Si picture_id est null, attribuer la valeur par défaut de 1
    const finalPictureId = picture_id || 1;

    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await this.database.query(
      `insert into ${this.table} (user_name, hashed_password, picture_id, is_admin) values (?, ?, ?, ?)`,
      [user_name, hashed_password, finalPictureId, is_admin]
    );

    // Return only the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select id, user_name, picture_id, is_admin from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(
      `select id, user_name, picture_id, is_admin from ${this.table}`
    );

    // Return the array of users
    return rows;
  }

  async readByUserNameWithPassword(user_name) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `select * from ${this.table} where user_name = ?`,
      [user_name]
    );
    // Return the first row of the result, which represents the user
    return rows[0];
  }

  // The U of CRUD - Update operation
  async update(user, id) {
    // Execute the SQL INSERT query to update the row with tie id on the "user" table
    const result = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [user, id]
    );

    return result;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = UserManager;
