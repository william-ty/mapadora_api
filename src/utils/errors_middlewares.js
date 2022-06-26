const { ValidationError } = require("sequelize");
const { Travel } = require("../models/index");

let validationErrorHandler = (err, req, res, next) => {
  console.log("Vérification validation du modèle");

  if (err instanceof ValidationError) {
    if (err.errors.length > 0) {
      return res.status(406).json(
        err.errors.map((e) => {
          return e.message;
        })
      );
    } else if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(406).json("This object already exists : id conflicts");
    }
  } else {
    next(err);
  }
};

let otherErrorHandler = (err, req, res, next) => {
  console.log("Autre erreur");

  return res.status(400).send({
    message: err.message,
  });
};

let unauthorizedErrorHandler = (err, req, res, next) => {
  console.log("Vérification Token");
  if (req.headers['authorization'] === NULL || req.headers['authorization'] === undefined) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  } else {
    next(err);
  }
};

let emptyObjectErrorHandler = (err, req, res, next) => {
  console.log("Vérification objet vide");
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Empty or incomplete object",
    });
  } else {
    next(err);
  }
};

let urlIdErrorHandler = async (err, req, res, next) => {
  console.log("Vérification parms url");
  console.log(req.params);
  if (
    Object.keys(req.params).length > 0 &&
    typeof req.params.idTravel !== undefined
  ) {
    await isTravel(req.params.idTravel).then((travelList) => {
      if (travelList.length === 0) {
        return res.status(400).send({
          message: "Travel not found",
        });
      } else {
        next(err);
      }
    });
  } else {
    return res.status(400).send({
      message: "Ids missing in request",
    });
  }
};




let isTravel = async (idTravel) => {
  return Travel.findAll({
    where: {
      id: idTravel,
    },
  });
};

module.exports = {
  validationErrorHandler,
  otherErrorHandler,
  unauthorizedErrorHandler,
  emptyObjectErrorHandler,
  urlIdErrorHandler,
};
