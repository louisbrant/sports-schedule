const ValidationService = {
  validate(schema, data) {
    return _validate(schema, data);
  },
  validateProperty(input, schema, data) {
    const errors = _validate(schema, data);
    const error = errors ? errors[input["name"]] : null;
    return error;
  },
  validateProperties(schema, data, properties) {
    const errors = _validate(schema, data);
    const errorList = {};
    for (let e in errors) {
      if (properties.indexOf(e) != -1) errorList[e] = errors[e];
    }
    return errorList;
  },
};

const _validate = (schema, data) => {
  const { error } = schema.validate(data, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (!error) return null;
  let errors = {};
  for (let item of error.details) errors[item.path[0]] = item.message;
  return errors;
};

export default ValidationService;
