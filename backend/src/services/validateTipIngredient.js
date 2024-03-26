const Joi = require("joi");

const getTipIngredientSchema = () => {
  return Joi.object({
    id: Joi.number().presence("optional"),
    tip_id: Joi.number().presence("required"),
    ingredient_id: Joi.number().presence("required"),
  });
};

const validateTipIngredient = (req, res, next) => {
  const schema = getTipIngredientSchema();

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

module.exports = validateTipIngredient;
