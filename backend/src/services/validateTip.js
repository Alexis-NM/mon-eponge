const Joi = require("joi");

const getTipSchema = () => {
  return Joi.object({
    id: Joi.number().optional(),
    tip_name: Joi.string().max(255).required(),
    user_id: Joi.number().required(),
    picture_id: Joi.number().required(),
    steps: Joi.array()
      .items(
        Joi.object({
          step_content: Joi.string().required(),
        })
      )
      .optional(),
    ingredients: Joi.array()
      .items(
        Joi.object({
          id: Joi.number(),
          ingredient_name: Joi.string().max(255).required(),
        })
      )
      .optional(),
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
