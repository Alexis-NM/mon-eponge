const Joi = require("joi");

const getPictureSchema = () => {
  return Joi.object({
    id: Joi.number().optional(),
    picture_url: Joi.string().max(255).required(),
  });
};

const validatePicture = (req, res, next) => {
  const schema = getPictureSchema();

  const { error } = schema.validate(
    {
      id: req.body.id,
      picture_url: req.file ? req.file.filename : req.body.picture_url,
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
