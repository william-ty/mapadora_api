const { ValidationError } = require("sequelize");
const { Step, Element, Traveler, Travel_Traveler } = require("../models/index");

expressjwt = require("express-jwt");

// get config vars
const dotenv = require("dotenv");
// access config var
dotenv.config();
const secret = process.env.TOKEN_SECRET;
const { findTravelOfElementFromModel } = require("../utils/travel_util");

/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties !!! ONLY FOR MODELS WHICH DEPENDS ON ID_TRAVEL IN ROUTES
 */
class AppTravelController {
  /**
   * @param {Model} model The default model object
   * for the controller. Will be required to create
   * an instance of the controller
   */
  constructor(model, foreignKeys, elementAlias) {
    if (new.target === AppTravelController) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this._model = model;
    this.create = this.create.bind(this);
    this.foreignKeys = foreignKeys;
    this.elementAlias = elementAlias;
  }
  /**
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {function} next The callback to the next program handler
   * @return {Object} res The response object
   */
  create = async (req, res, next) => {
    try {
      const aliasJson = this.elementAlias;

      // ------------ refactor this part-----
      let travelerRequired;
      if (req.user) {
        travelerRequired = typeof req.user.id !== "undefined";
      }

      let validity = true;

      const objectToSave = req.body;
      if (typeof objectToSave.id !== undefined) {
        delete objectToSave.id;
      }

      if (travelerRequired) {
        const idTraveler_attr = { id_traveler: req.user.id };
        Object.assign(objectToSave[aliasJson], idTraveler_attr);
      }

      if (req.params.idTravel) {
        const idTravel_attr = { id_travel: req.params.idTravel };
        Object.assign(objectToSave[aliasJson], idTravel_attr);
        validity = await findTravelOfElementFromModel(
          this._model,
          req.params.idTravel,
          this
        );
      } else {
        throw { status: 400, message: "Travel not provided" };
      }

      // -----------------------------------

      // const idTravel_attr = { id_travel: req.params.idTravel };
      // Object.assign(objectToSave[aliasJson], idTravel_attr);
      validity
        ? await this._model
            .create(objectToSave, { include: this.foreignKeys })
            .then(
              (savedObject) => {
                return res.status(201).json(savedObject);
              },
              (err) => {
                return next(err);
              }
            )
        : next(err);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    // ---- refactor this-----
    let travelerRequired;
    if (req.user) {
      travelerRequired = typeof req.user.id !== "undefined";
    }
    // -----------------------
    await this._model
      .findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Element,
            as: this.elementAlias,
          },
        ],
      })
      .then((object) => {
        // ---- refactor this-----
        if (travelerRequired) {
          // check if object is traveler
          if (typeof object.email !== "undefined") {
            if (object.email !== req.user.email) {
              throw { status: 401, message: "Unauthorized: wrong user" };
            }
          } else {
            // check if element linked to object has traveler id
            Element.findByPk(object.id_element).then((element) => {
              if (!element.id_traveler) {
                throw {
                  status: 401,
                  message: "Unauthorized: not a user ressource",
                };
              } else if (element.id_traveler !== req.user.id) {
                throw {
                  status: 401,
                  message: "Unauthorized: no rights for this user",
                };
              }
            });
          }
        }
        // -----------------------
        delete req.body.id;
        Object.assign(object, req.body);
        object.getElement().then((element) => {
          Object.assign(element, req.body.element);
          element.save();
          console.log("PROMISE ?"); // Check if order is a problem. Could handle promises better?
        });
        return object.save();
      })
      .then((savedObject) => {
        return res.status(200).json(savedObject);
      })
      .catch((err) => {
        if (err instanceof ValidationError) {
          // respond with validation errors
          return res.status(422).json(
            err.errors.map((e) => {
              return e.message;
            })
          );
        } else {
          return res.status(400).send({
            message: err.message,
          });
        }
      });
  };

  delete = async (req, res, next) => {
    // ---- refactor this-----
    let travelerRequired;
    if (req.user) {
      travelerRequired = typeof req.user.id !== "undefined";
    }
    // -----------------------

    let id = req.params.id;
    let obj = {};
    if (id === null || id === undefined || id === 0) {
      return res.status(400).json("Not found");
    } else {
      obj.id = id;
      await this._model
        .findByPk(id)
        .then((object) => {
          // ---- refactor this-----
          if (travelerRequired) {
            // check if object is traveler
            if (typeof object.email !== "undefined") {
              if (object.email !== req.user.email) {
                throw { status: 401, message: "Unauthorized: wrong user" };
              }
            } else {
              // check if element linked to object has traveler id
              Element.findByPk(object.id_element).then((element) => {
                if (!element.id_traveler) {
                  throw {
                    status: 401,
                    message: "Unauthorized: not a user ressource",
                  };
                } else if (element.id_traveler !== req.user.id) {
                  throw {
                    status: 401,
                    message: "Unauthorized: no rights for this user",
                  };
                }
                // element.destroy();
              });
            }
          }
          // -----------------------
          object.destroy();
          // TODO : Destroy element linked ?
        })
        .then(
          (deletedObject) => {
            return res.status(200).json("Object deleted");
          },
          (err) => {
            return next(err);
          }
        )
        .catch((err) => {
          return res.status(400).send({
            message: err.message,
          });
        });
    }
  };

  findAllByTravelAndStep = async (req, res, next) => {
    this._model
      .findAll({
        include: [
          {
            model: Element,
            as: this.elementAlias,
            required: true,
            where: {
              id_travel: req.params.idTravel,
            },
          },
        ],
        where: {
          id_step: req.params.idStep,
        },
      })
      .then((objectsFound) => {
        if (objectsFound.length > 0) {
          return res.status(200).json(objectsFound);
        } else {
          return res.status(200).json([]);
        }
      });
  };

  findAllByTravel = async (req, res, next) => {
    this._model
      .findAll({
        include: [
          {
            model: Element,
            as: this.elementAlias,
            required: true,
            where: {
              id_travel: req.params.idTravel,
            },
          },
        ],
      })
      .then((objectsFound) => {
        if (objectsFound.length > 0) {
          return res.status(200).json(objectsFound);
        } else {
          return res.status(200).json([]);
        }
      });
  };

  findAll = async (req, res, next) => {
    if (typeof req.params.idStep !== "undefined") {
      return this.findAllByTravelAndStep(req, res, next);
    } else {
      return this.findAllByTravel(req, res, next);
    }
  };

  findOne = async (req, res, next) => {
    let id = req.params.idTravel;
    console.log("idTravel = " + id);
    if (id === null || id === undefined || id === 0) {
      return res.status(400).json("Not found");
    } else {
      await this._model
        .findOne({
          where: {
            id: id,
          },
          include: [
            {
              model: Element,
              as: this.elementAlias,
            },
          ],
        })
        .then(
          (objectFound) => {
            if (objectFound !== null) {
              return res.status(200).json(objectFound);
            } else {
              return res.status(200).json("No object in DB with this id");
            }
          },
          (err) => {
            return next(err);
          }
        );
    }
  };

  identify_client = [
    expressjwt({ secret, algorithms: ["HS256"] }),
    async (req, res, next) => {
      await Traveler.findByPk(req.user.id)
        .then((user) => {
          if (!user) {
            throw { status: 404, message: "Requested User not found" };
          }
          req.user = user;
          next();
        })
        .catch((err) => {
          next(err);
        });
    },
  ];

  isParticipantOfTravel = async (req, res, next) => {
    const idTravel = req.params.idTravel;
    if (req.user && idTravel) {
     await  Travel_Traveler.findOne({
        where: {
          id_travel: idTravel,
          id_traveler: req.user.id,
        },
      })
        .then((travelTraveler) => {
          if (
            travelTraveler !== null &&
            travelTraveler &&
            travelTraveler.id_traveler
          ) {
            next();
          } else {
            return res.status(401).send({
              message: "Unauthorized",
            });
          }
        })
        .catch((err) => {
          return err;
        });
    }
  };

  isAdminOfTravel = async (req, res, next) => {
    const idTravel = req.params.idTravel;

    if (req.user && idTravel) {
      return Travel_Traveler.findOne({
        where: {
          id_travel: idTravel,
          id_traveler: req.user.id,
        },
      })
        .then((travelTraveler) => {
          if (travelTraveler !== null && travelTraveler.id_permission === 2) {
            next();
          } else {
            return res.status(401).send({
              message: "Unauthorized",
            });
          }
        })
        .catch((err) => {
          return err;
        });
    }
  };
}

module.exports = AppTravelController;
