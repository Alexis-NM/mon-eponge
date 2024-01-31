const Joi = require("joi");

const getTipSchema = () => {
  return Joi.object({
    id: Joi.number().presence("optional"),
    tip_name: Joi.string().max(255).presence("required"),
    user_id: Joi.number().presence("required"),
    picture_id: Joi.number().presence("required"),
  });
};

const validateTip = (req, res, next) => {
  const schema = getTipSchema();

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

module.exports = validateTip;
