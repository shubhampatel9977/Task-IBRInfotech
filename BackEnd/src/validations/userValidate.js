const Joi = require("joi");

const updateUserSchema = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  bio: Joi.string().allow(''),
  profilePicture: Joi.string().allow(''),
});

module.exports = {
  updateUserSchema,
};
