const Joi = require("joi");

const getPictureSchema = () => {
  return Joi.object({
    id: Joi.number().presence("optional"),
    picture_url: Joi.string().max(255).presence("required"),
  });
};

const validatePicture = (req, res, next) => {
  const schema = getPictureSchema();

  const { error } = schema.validate(
    {
      ...req.body,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = validatePicture;
