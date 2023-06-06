const validateJSON = (req, res, next) => {
  // Check if all required fields exist
  if (
    req.body.parentId === null ||
    req.body.firstName === null ||
    req.body.lastName === null ||
    req.body.address === null ||
    req.body.address.street === null ||
    req.body.address.city === null ||
    req.body.address.state === null ||
    req.body.address.zip === null
  ) {
    res
      .status(403)
      .send({ error: "One or more than one requried fields missing!" });
  } else {
    next();
  }
};

const contentTypeSetup = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

export { validateJSON, contentTypeSetup };
