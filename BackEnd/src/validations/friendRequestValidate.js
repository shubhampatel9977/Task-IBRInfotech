const Joi = require("joi");

const sendRequestSchema = Joi.object({
  receiverId: Joi.string().hex().length(24).required(),
});

const requestIdSchema = Joi.object({
  requestId: Joi.string().hex().length(24).required(),
});

module.exports = {
  sendRequestSchema,
  requestIdSchema,
};
