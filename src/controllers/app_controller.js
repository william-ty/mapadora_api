const { ValidationError } = require("sequelize");
const {
  Travel,
  Step,
  Interestpoint,
  Traveler,
  Travel_Traveler,
} = require("../models/index");
const { findTravelFromModel } = require("../utils/travel_util");

expressjwt = require("express-jwt");

// get config vars
const dotenv = require("dotenv");
// access config var
dotenv.config();
const secret = process.env.TOKEN_SECRET;

/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
class AppController {
  /**
   * @param {Model} model The default model object
   * for the controller. Will be required to create
   * an instance of the controller
   */
  constructor(model, foreignKeys) {
    if (new.target === AppController) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this._model = model;
    this.create = this.create.bind(this);
    this.foreignKeys = foreignKeys;
  }
  /**
   * @param {Object} req.user The user returned from identify_client (JWT)
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {function} next The callback to the next program handler
   * @return {Object} res The response object
   */
  create = async (req, res, next) => {
    try {
      // ------------ refactor this part-----
      let travelerRequired;
      if (req.user) {
        travelerRequired = typeof req.user.id !== "undefined";
      }

      let validity = true;

      const elementToSave = req.body;
      if (typeof elementToSave.id !== undefined) {
        delete elementToSave.id;
      }

      if (travelerRequired) {
        const idTraveler_attr = { id_traveler: req.user.id };
        Object.assign(elementToSave, idTraveler_attr);
      }

      // if (elementToSave.id_travel !== undefined) {
      //   const idTravel_attr = { id_travel: req.params.idTravel };
      //   Object.assign(elementToSave, idTravel_attr);
      //   validity = await travelUtil(this._model, req.params.idTravel);
      // }

      const idTravel = req.params.idTravel || req.idTravel;
      if (idTravel) {
        // const idTravel_attr = { id_travel: req.params.idTravel };
        // Object.assign(objectToSave[aliasJson], idTravel_attr);
        elementToSave.id_travel = idTravel;
        validity = await findTravelFromModel(this._model, idTravel);
      }

      // -----------------------------------

      validity
        ? await this._model
          .create(elementToSave, { include: this.foreignKeys })
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
      return next(err);
    }
  };

  update = async (req, res, next) => {
    // ---- refactor this-----
    let travelerRequired;
    if (req.user) {
      travelerRequired = typeof req.user.id !== "undefined";
    }
    // -----------------------
    console.log("TEST");
    console.log(JSON.stringify(req.params));

    try {
      await this._model
        .findByPk(req.params.id)
        .then((object) => {
          console.log("JSON.stringify(object)");
          console.log(JSON.stringify(object));
          // The following is not in use after feature/permission
          // Kept for records
          // // ---- refactor this-----
          // if (travelerRequired) {
          //   // check if object is traveler
          //   if (typeof object.email !== "undefined") {
          //     console.log("TEST");
          //     if (object.email !== req.user.email) {
          //       throw { status: 401, message: "Unauthorized: wrong user" };
          //     }
          //   } else {
          //     // check if object has traveler id
          //     if (!object.id_traveler) {
          //       throw {
          //         status: 401,
          //         message: "Unauthorized: not a user ressource",
          //       };
          //     } else if (object.id_traveler !== req.user.id) {
          //       throw {
          //         status: 401,
          //         message: "Unauthorized: no rights for this user",
          //       };
          //     }
          //   }
          // }
          console.log("JSON.stringify(object)");
          console.log(JSON.stringify(object));
          // -----------------------
          delete req.body.id;
          Object.assign(object, req.body);
          console.log("JSON.stringify(object)");
          console.log(JSON.stringify(object));
          return object.save();
        })
        .then((savedObject) => {
          return res.status(200).json(savedObject);
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      return next(err);
    }
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
          // The following is not in use after feature/permission
          // Kept for records
          // // ---- refactor this-----
          // if (travelerRequired) {
          //   // check if object is traveler
          //   // TODO - Assoc Travel / Traveler to get email here!
          //   if (typeof object.email !== "undefined") {
          //     if (object.email !== req.user.email) {
          //       throw { status: 401, message: "Unauthorized: wrong user" };
          //     }
          //   } else {
          //     // check if object has traveler id
          //     if (!object.id_traveler) {
          //       throw {
          //         status: 401,
          //         message: "Unauthorized: not a user ressource",
          //       };
          //     } else if (object.id_traveler !== req.user.id) {
          //       throw {
          //         status: 401,
          //         message: "Unauthorized: no rights for this user",
          //       };
          //     }
          //   }
          // }
          // -----------------------
          object.destroy();
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

  findAllWithoutTravel = async (req, res, next) => {
    await this._model
      .findAll({ include: this.foreignKeys })
      .then((objectsFound) => {
        if (objectsFound.length > 0) {
          return res.status(200).json(objectsFound);
        } else {
          return res.status(200).json([]);
        }
      });
  };

  findAllByTravel = async (req, res, next) => {
    const idTravel = req.params.idTravel || req.idTravel;
    this._model
      .findAll({
        where: {
          id_travel: idTravel,
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

  findAll = async (req, res, next) => {
    const idTravel = req.params.idTravel || req.idTravel;
    if (typeof idTravel !== "undefined") {
      return this.findAllByTravel(req, res, next);
    } else {
      return this.findAllWithoutTravel(req, res, next);
    }
  };

  findOne = async (req, res, next) => {
    let id = req.params.id;

    if (id === null || id === undefined || id === 0) {
      return res.status(400).json("Not found");
    } else {
      await this._model.findByPk(id).then(
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

  requested_user = [
    expressjwt({ secret, algorithms: ["HS256"] }),
    async (req, res, next) => {
      await Traveler.findByPk(req.user.id)
        .then((user) => {
          if (!user) {
            return next();
          }
          req.user = user;
          return next();
        })
        .catch((err) => {
          next(err);
        });
    },
  ]


  identify_client = [

    expressjwt({ secret, algorithms: ["HS256"] }),
    async (req, res, next) => {
      await Traveler.findByPk(req.user.id)
        .then((user) => {
          if (!user) {
            throw { status: 404, message: "Requested User not found" };
          }
          req.user = user;
          return next();
        })
        .catch((err) => {
          next(err);
        });
    },
  ];

  isParticipantOfTravel = async (req, res, next) => {
    const idTravel = req.params.idTravel;
    console.log(idTravel)
    // console.log("TEST")
    console.log(JSON.stringify(req.user))
    if (req.user && idTravel) {
      return Travel_Traveler.findOne({
        where: {
          id_travel: idTravel,
          id_traveler: req.user.id
        }
      }).then((travelTraveler) => {
        if (travelTraveler && travelTraveler.id_traveler) {
          next()
        }
        else {
          return res.status(401).send({
            message: "Unauthorized",
          })
        }
      })
        .catch((err) => {
          return err
        });

    }
  }

  isAdminOfTravel = async (req, res, next) => {
    const idTravel = req.params.idTravel;

    if (req.user && idTravel) {
      return Travel_Traveler.findOne({
        where: {
          id_travel: idTravel,
          id_traveler: req.user.id
        }
      }).then((travelTraveler) => {
        if (travelTraveler !== null && travelTraveler.id_permission === 2) {
          next()
        }
        else {
          return res.status(401).send({
            message: "Unauthorized",
          });
        }
      }).catch((err) => {
        return err
      });

    }
  }


  // create_permission = async (req, res, next, idTravel, idPermisison) => {
  //   try {

  //     // ------------ refactor this part-----
  //     let travelerRequired;
  //     if (req.user) {
  //       travelerRequired = typeof req.user.id !== 'undefined';
  //     }
  //     let idTraveler;
  //     if (travelerRequired) {
  //       idTraveler = { id_traveler: req.user.id };
  //     }

  //     const elementToSave = {
  //       id_travel: idTravel,
  //       id_traveler: idTraveler,
  //       // Regular permission assigned to user
  //       id_permission: idPermisison
  //     }
  //     // -----------------------------------

  //     await Travel_Traveler._model
  //       .create(elementToSave, { include: this.foreignKeys })
  //       .then(
  //         (savedObject) => {
  //           return res.status(201).json(savedObject);
  //         },
  //         (err) => {
  //           return next(err);
  //         }
  //       )
  //   } catch (err) {
  //     return next(err);
  //   }
  // }
}

module.exports = AppController;
