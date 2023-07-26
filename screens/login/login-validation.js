import Joi from "@hapi/joi";
import config from "../../config/config.json";

export default class LoginValidation {
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
              err.message = `Email address must be less than or equal ${config.max} characters!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
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
  });
}
