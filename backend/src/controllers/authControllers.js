const { verify } = require("argon2");
const jwt = require("jsonwebtoken");
// Import access to database tables
const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided email
    const user = await tables.user.readByUserNameWithPassword(
      req.body.user_name
    );

    if (user == null) {
      res.sendStatus(422);
      return;
    }
    const verified = await verify(user.hashed_password, req.body.password);

    if (verified) {
      // Respond with the user in JSON format (but without the hashed password)
      delete user.hashed_password;
      const token = jwt.sign({ user_id: user.id }, process.env.APP_SECRET, {
        expiresIn: "1h",
      });

      // Send the token in the response
      res.status(200).json({ token });

      // .cookie("user token", token, {
      // httpOnly: true,
      // });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  login,
};
