// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all steps from the database
    const steps = await tables.step.readAll();

    // Respond with the steps in JSON format
    res.status(200).json(steps);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific step from the database based on the provided ID
    const step = await tables.step.read(req.params.id);

    // If the step is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the step in JSON format
    if (step == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(step);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  // Extract the step data from the request body
  const step = req.body;

  try {
    // Insert the step into the database
    await tables.step.update(step, req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the step data from the request body
  const step = req.body;

  try {
    // Insert the step into the database
    const insertId = await tables.step.create(step);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted step
    res.status(201).json({ ...req.body, id: insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  // Extract the step data from the request body
  try {
    // Insert the step into the database
    await tables.step.delete(req.params.id);

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
