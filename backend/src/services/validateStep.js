const Joi = require("joi");

const getStepSchema = () => {
  return Joi.object({
    id: Joi.number().presence("optional"),
    tip_id: Joi.number().presence("required"),
    step_number: Joi.number().presence("required"),
    step_content: Joi.string().max(1000).presence("required"),
  });
};

const validateStep = (req, res, next) => {
  const schema = getStepSchema();

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

module.exports = validateStep;
