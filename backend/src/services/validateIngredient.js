const Joi = require("joi");

const getIngredientSchema = () => {
  return Joi.object({
    id: Joi.number().presence("optional"),
    ingredient_name: Joi.string().max(255).presence("required"),
  });
};

const validateIngredient = (req, res, next) => {
  const schema = getIngredientSchema();

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

module.exports = validateIngredient;
