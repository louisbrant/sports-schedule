const Joi = require("@hapi/joi");

// search model
class SearchModel {
  selectedSports = "";
  location = "";
  date = "";
  fromTime = null;
  from = "";
  toTime = null;
  to = "";
  locationText = "";
  sportId = null;
}

// search validation model
class SearchValidation {
  schema = Joi.object({
    // selectedSports: Joi.string()
    //   .required()
    //   .error((errors) => {
    //     errors.forEach((err) => {
    //       switch (err.code) {
    //         case "string.empty":
    //           err.message = "Sport is required";
    //           break;

    //         default:
    //           break;
    //       }
    //     });

    //     return errors;
    //   }),
    // location: Joi.string()
    //   .required()
    //   .error((errors) => {
    //     errors.forEach((err) => {
    //       switch (err.code) {
    //         case "string.empty":
    //           err.message = "Location is required";
    //           break;

    //         default:
    //           break;
    //       }
    //     });

    //     return errors;
    //   }),
    // date: Joi.date()
    //   .required()
    //   .error((errors) => {
    //     errors.forEach((err) => {
    //       switch (err.code) {
    //         case "date.empty":
    //           err.message = "Date is required";
    //           break;

    //         case "date.base":
    //           err.message = "Date must be valid";
    //           break;

    //         default:
    //           break;
    //       }
    //     });

    //     return errors;
    //   }),
    // from: Joi.string()
    //   .required()
    //   .error((errors) => {
    //     errors.forEach((err) => {
    //       switch (err.code) {
    //         case "string.empty":
    //           err.message = "From time is required";
    //           break;

    //         default:
    //           break;
    //       }
    //     });

    //     return errors;
    //   }),
    // to: Joi.string()
    //   .required()
    //   .error((errors) => {
    //     errors.forEach((err) => {
    //       switch (err.code) {
    //         case "string.empty":
    //           err.message = "To time is required";
    //           break;

    //         default:
    //           break;
    //       }
    //     });

    //     return errors;
    //   }),
  });
}

// booking model
class BookingModel {
  facilityId = null;
  sportId = null;
  courtId = null;
  from = null;
  to = null;
  mobile = null;
  email = null;
}

// booking validation model
class BookingValidation {
  schema = Joi.object({
    facilityId: Joi.number()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.code) {
            case "string.empty":
              err.message = "Facility is required";
              break;

            default:
              break;
          }
        });

        return errors;
      }),
    sportId: Joi.number()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.code) {
            case "string.empty":
              err.message = "Sport is required";
              break;

            case "any.required":
              err.message = "Sport is required";
              break;

            default:
              break;
          }
        });

        return errors;
      }),
    courtId: Joi.number()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.code) {
            case "string.empty":
              err.message = "Court is required";
              break;

            default:
              break;
          }
        });

        return errors;
      }),
    from: Joi.date()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.code) {
            case "string.empty":
              err.message = "From time is required";
              break;

            default:
              break;
          }
        });

        return errors;
      }),
    to: Joi.date()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.code) {
            case "string.empty":
              err.message = "To time is required";
              break;

            default:
              break;
          }
        });

        return errors;
      }),
    mobile: Joi.string()
      .allow(null)
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.code) {
            case "string.empty":
              err.message = "Mobile is required";
              break;

            default:
              break;
          }
        });

        return errors;
      }),
    email: Joi.string()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.code) {
            case "string.empty":
              err.message = "Email is required";
              break;

            default:
              break;
          }
        });

        return errors;
      }),
  });
}

module.exports = {
  // search model
  SearchModel,
  SearchValidation,

  // booking model
  BookingModel,
  BookingValidation,
};
