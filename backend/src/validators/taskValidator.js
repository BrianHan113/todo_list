const Joi = require("joi");

const createTaskSchema = Joi.object({
  title: Joi.string().max(100).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
    "string.max": "Title cannot exceed 100 characters",
    "any.required": "Title is required"
  }),
  description: Joi.string().allow("").max(1000).messages({
    "string.base": "Description must be a string",
    "string.max": "Description cannot exceed 1000 characters"
  })
});

const updateTaskSchema = Joi.object({
  title: Joi.string().max(100).messages({
    "string.base": "Title must be a string",
    "string.max": "Title cannot exceed 100 characters"
  }),
  description: Joi.string().allow("").max(1000).messages({
    "string.base": "Description must be a string",
    "string.max": "Description cannot exceed 1000 characters"
  }),
  position: Joi.number().integer().messages({
    "number.base": "Position must be a number",
    "number.integer": "Position must be an integer"
  })
}).min(1).messages({
  "object.min": "At least one field must be provided for update"
});

module.exports = {
  createTaskSchema,
  updateTaskSchema
};
