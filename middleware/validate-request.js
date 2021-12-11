module.exports = validateRequest;

function validateRequest(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown prop
    stripUnknown: true // remove unknown props
  };
  const { error, value } = schema.validate(req.body.data.form, options);
  if (error) {
    next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
  } else {
    console.log('dopo la validazione', value)
    req.body.data.form = value
    next();
  }
}
