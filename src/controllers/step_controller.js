const AppTravelController = require("./app_travel_controller");
const { InterestPoint, Element, Trip, Step } = require("../models/index");
const { ValidationError, where } = require("sequelize");
const TripController = require("./trip_controller");
const travelUtil = require("../utils/travel_util");

class StepController extends AppTravelController {
  constructor(model) {
    super(model);
    this.foreignKeys = [{ model: Element, as: "element" }];
    this.elementAlias = "element";
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

      let stepToSave = req.body;
      if (typeof stepToSave.id !== undefined) {
        delete stepToSave.id;
      }

      let tripToSave = {
        element: {
          name: "Trajet vers l'étape '" + stepToSave.element.name + "'",
          description: "trajet",
        },
      };

      if (typeof stepToSave.id_transportmode !== undefined) {
        const idTransportMode_attr = {
          id_transportmode: stepToSave.id_transportmode,
        };
        Object.assign(tripToSave, idTransportMode_attr);
      }

      if (travelerRequired) {
        const idTraveler_attr = { id_traveler: req.user.id };
        Object.assign(tripToSave["element"], idTraveler_attr);
      }

      if (travelerRequired) {
        const idTraveler_attr = { id_traveler: req.user.id };
        Object.assign(stepToSave[aliasJson], idTraveler_attr);
      }

      if (typeof req.params.idTravel !== "undefined") {
        const idTravel_attr = { id_travel: req.params.idTravel };
        Object.assign(tripToSave[aliasJson], idTravel_attr);
        Object.assign(stepToSave[aliasJson], idTravel_attr);
        // validity = await travelUtil(this._model, req.params.idTravel); //!TODO DEBUG THIS WITH MARION => "message": "la colonne Step.id_travel n'existe pas"
      }

      // -----------------------------------

      // const idTravel_attr = { id_travel: req.params.idTravel };
      // Object.assign(stepToSave[aliasJson], idTravel_attr);
      validity
        ? await Trip.create(tripToSave, { include: this.foreignKeys }) //TO EDIT ?
          .then((tripCreated) => {
            stepToSave.id_trip = tripCreated.id;
            return this._model.create(stepToSave, {
              include: this.foreignKeys,
            });
          })
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

  findAllAssociatedInterestPoints = async (req, res, next) => {
    await this._model
      .findByPk(req.params.id)
      .then((stepFound) => {
        if (stepFound) {
          return stepFound.getInterestPoints();
        }
      })
      .then((objectsFound) => {
        if (objectsFound.length > 0) {
          return res.status(200).json(objectsFound);
        } else {
          return res.status(200).json([]);
        }
      });
  };

  reorder = async (req, res, next) => {
    let promises = [];
    let steps = [];
    await req.body.map((stepReq) => {
      promises.push(
        this._model.findByPk(stepReq.id).then((stepFound) => {
          Object.assign(stepFound, stepReq);
          stepFound.save();
          steps.push(stepFound);
        })
      );
    });
    Promise.all(promises)
      .then(() => {
        return res.status(200).json(steps);
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

  static clone = (idTravel, clonedTravelId, idTraveler, tripsMapping) => {
    return Step.findAll({
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
    }).then((steps) => {
      return Promise.all(
        steps.map((step) => {
          const stepValues = step.dataValues;
          const element = stepValues.element.dataValues;

          let clone = {};
          clone.point = stepValues.point;
          clone.duration = stepValues.duration;
          clone.order = stepValues.order;
          clone.id_trip = tripsMapping[stepValues.id_trip];
          clone.element = {};
          clone.element.name = element.name;
          clone.element.description = element.name;
          clone.element.id_travel = clonedTravelId;
          clone.element.id_traveler = idTraveler;

          return Step.create(clone, {
            include: [{ model: Element, as: "element" }],
          }).then((step) => {
            return { old: stepValues.id, new: step.id };
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

module.exports = StepController;
