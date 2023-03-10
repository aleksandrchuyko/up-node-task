const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongoSaveError, validator } = require('../../utils');

const regexp = {
  email:
    /^[a-zA-Z](([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone:
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
};
const idTypes = ['phone', 'email'];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minlength: 8,
    },
    id: {
      type: String,
      validate: [validator, 'Email or phone number only'],
      required: [true, 'Email or phone number is required'],
      unique: true,
    },
    id_type: {
      type: String,
      enum: idTypes,
    },
    tokens: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.post('save', handleMongoSaveError);

const User = model('user', userSchema);

const registerSchema = Joi.object({
  id: Joi.alternatives()
    .try(
      Joi.string().pattern(regexp.email).required(),
      Joi.string().pattern(regexp.phone).required()
    )
    .messages({ 'alternatives.match': 'Email or phone number only' }),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  id: Joi.alternatives()
    .try(
      Joi.string().pattern(regexp.email).required(),
      Joi.string().pattern(regexp.phone).required()
    )
    .messages({ 'alternatives.match': 'Email or phone number only' }),
  password: Joi.string().min(8).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = {
  User,
  schemas,
};
