// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all tip_ingredients from the database
    const tipIngredients = await tables.tip_ingredient.readAll();

    // Respond with the tip_ingredients in JSON format
    res.status(200).json(tipIngredients);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific tip_ingredient from the database based on the provided ID
    const tipIngredient = await tables.tip_ingredient.read(req.params.id);

    // If the tip_ingredient is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the tip_ingredient in JSON format
    if (tipIngredient == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(tipIngredient);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  // Extract the tip_ingredient data from the request body
  const tipIngredient = req.body;

  try {
    // Insert the tip_ingredient into the database
    await tables.tip_ingredient.update(tipIngredient, req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the tip_ingredient data from the request body
  const tipIngredient = req.body;

  try {
    // Insert the tip_ingredient into the database
    const insertId = await tables.tip_ingredient.create(tipIngredient);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted tip_ingredient
    res.status(201).json({ ...req.body, id: insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  // Extract the tip_ingredient data from the request body
  try {
    // Insert the tip_ingredient into the database
    await tables.tip_ingredient.delete(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
