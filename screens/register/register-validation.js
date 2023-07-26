import Joi from "@hapi/joi";
import config from "../../config/config.json";

export default class RegisterValidation {
  schema = Joi.object({
    email: Joi.string()
      .required()
      .max(config.maxLength)
      .email({ tlds: { allow: false } })
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.code) {
            case "string.empty":
              err.message = "Email address is required";
              break;
            case "string.email":
              err.message = "Invalid email address";
              break;
            case "string.max":
              err.message = `Email address length must be less than or equal ${config.maxLength} characters!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    type: Joi.string().required(),
    password: Joi.string()
      .max(config.maxLength)
      .required()
      .min(config.minPasswordLength)
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.code) {
            case "string.empty":
              err.message = "Password is required";
              break;
            case "string.min":
              err.message = `Password must be at least ${config.minPasswordLength} characters!`;
              break;
            case "string.max":
              err.message = `Password must be less than or equal ${config.maxLength} characters!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    password2: Joi.string()
      .required()
      .max(config.maxLength)
      .valid(Joi.ref("password"))
      .min(config.minPasswordLength)
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.code) {
            case "string.empty":
              err.message = "Confirm password is required";
              break;
            case "string.min":
              err.message = `Confirm password must be at least ${config.minPasswordLength} characters!`;
              break;
            case "string.max":
              err.message = `Confirm password must be less than or equal ${config.maxLength} characters!`;
              break;
            case "any.only":
              err.message = "Unmatch password";
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  });
}
