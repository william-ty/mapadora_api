const AppTravelController = require("./app_travel_controller");
const { Step, Trip, Element, TransportMode } = require("../models/index");

class TripController extends AppTravelController {
  constructor(model, foreignKeys) {
    super(model);
    this.foreignKeys = [
      { model: Element, as: "element" },
      // { model: Step, as: "arrival_step" },
      // { model: Step, as: "departure_step" },
      { model: TransportMode, as: "transport_mode" },
    ];
    this.elementAlias = "element";
    this.transportModeAlias = "transport_mode";
  }

  create = async (req, res, next) => {
    try {
      const aliasJson = this.elementAlias;

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
        Object.assign(elementToSave[aliasJson], idTraveler_attr);
      }

      if (elementToSave.id_travel !== undefined) {
        const idTravel_attr = { id_travel: req.params.idTravel };
        Object.assign(elementToSave[aliasJson], idTravel_attr);
        validity = await travelUtil(this._model, req.params.idTravel);
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
      .findByPk(req.params.id)
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
          {
            model: TransportMode,
            as: this.transportModeAlias,
            required: false,
            // where: {
            //   id_transportmode: req.params.idTravel,
            // },
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

  static clone = (idTravel, clonedTravelId, idTraveler) => {
    return Trip.findAll({
      include: [
        {
          model: Element,
          as: "element",
          required: true,
          where: {
            id_travel: idTravel,
          },
        },
      ],
    }).then((trips) => {
      return Promise.all(
        trips.map((trip) => {
          const tripValues = trip.dataValues;
          const element = tripValues.element.dataValues;

          let clone = {};
          clone.id_transportmode = tripValues.id_transportmode;
          clone.element = {};
          clone.element.name = element.name;
          clone.element.description = element.name;
          clone.element.id_travel = clonedTravelId;
          clone.element.id_traveler = idTraveler;

          return Trip.create(clone, {
            include: [{ model: Element, as: "element" }],
          }).then((trip) => {
            return { old: tripValues.id, new: trip.id };
          });
        })
      ).then((res) => {
        let mapping = {};
        res.map((elem) => (mapping[elem.old] = elem.new));
        return mapping;
      });
    });
  };
}

module.exports = TripController;
