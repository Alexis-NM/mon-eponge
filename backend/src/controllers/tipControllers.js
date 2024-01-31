// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all tips from the database
    const tips = await tables.tip.readAll();

    // Respond with the tips in JSON format
    res.status(200).json(tips);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific tip from the database based on the provided ID
    const tip = await tables.tip.read(req.params.id);

    // If the tip is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the tip in JSON format
    if (tip == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(tip);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  // Extract the tip data from the request body
  const tip = req.body;

  try {
    // Insert the tip into the database
    await tables.tip.update(tip, req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the tip data from the request body
  const tip = req.body;

  try {
    // Insert the tip into the database
    const insertId = await tables.tip.create(tip);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted tip
    res.status(201).json({ ...req.body, id: insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  // Extract the tip data from the request body
  try {
    // Insert the tip into the database
    await tables.tip.delete(req.params.id);

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
