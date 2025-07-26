const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().max(30).required().messages({
    "string.base": "Username must be a string",
    "string.empty": "Username cannot be empty",
    "string.max": "Username cannot exceed 30 characters",
    "any.required": "Username is required"
  }),

  password: Joi.string().min(5).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 5 characters long",
    "any.required": "Password is required"
  }),

  dob: Joi.date().iso().required().messages({
    "date.base": "Date of birth must be a valid date",
    "date.format": "Date of birth is required",
    "any.required": "Date of birth is required"
  })
});

const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Username must be a string",
    "string.empty": "Username cannot be empty",
    "any.required": "Username is required"
  }),

  password: Joi.string().required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required"
  })
});

module.exports = {
  registerSchema,
  loginSchema
};
