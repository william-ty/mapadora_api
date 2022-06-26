const AppTravelController = require("./app_travel_controller");
const { Step, Element, InterestPoint } = require("../models/index");

class InterestpointController extends AppTravelController {
  constructor(model) {
    super(model);
    this.foreignKeys = [{ model: Element, as: "element" }];
    this.elementAlias = "element";
    this.stepAlias = "step_interestpoint";
  }

  findAllByTravelAndStep = async (req, res, next) => {
    console.log(req.params.idTravel);
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

  removeInterestPointFromStep = async (req, res, next) => {
    try {
      await InterestPoint.findByPk(req.params.id).then((interestpoint) => {
        if (interestpoint) {
          interestpoint.day = null;
          interestpoint.id_step = null;
          return interestpoint.save();
        }
      })
        .then(
          (savedObject) => {
            return res.status(200).json(savedObject);
          },
          (err) => {
            return next(err);
          }
        );
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json(
          error.errors.map((e) => {
            return e.message;
          })
        );
      } else {
        return res.status(400).send({
          message: error.message,
        });
      }
    }
  };
  addInterestPointToStep = async (req, res, next) => {
    try {
      await Step.findByPk(req.params.idStep)
        .then((step) => {
          return InterestPoint.findByPk(req.params.id).then((interestpoint) => {
            if (step && interestpoint) {
              interestpoint.day = null;
              interestpoint.id_step = step.id;
              return interestpoint.save();
            }
          });
        })
        .then(
          (savedObject) => {
            return res.status(200).json(savedObject);
          },
          (err) => {
            return next(err);
          }
        );
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json(
          error.errors.map((e) => {
            return e.message;
          })
        );
      } else {
        return res.status(400).send({
          message: error.message,
        });
      }
    }
  };

  static clone = (idTravel, clonedTravelId, idTraveler, stepsMapping) => {
    return InterestPoint.findAll({
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
    }).then((interestPoints) => {
      interestPoints.forEach((interestPoint) => {
        const interestPointValues = interestPoint.dataValues;
        const element = interestPointValues.element.dataValues;

        let clone = {};
        clone.point = interestPointValues.point;
        clone.order = interestPointValues.order;
        clone.id_step = stepsMapping[interestPointValues.id_step];
        clone.element = {};
        clone.element.name = element.name;
        clone.element.description = element.name;
        clone.element.id_travel = clonedTravelId;
        clone.element.id_traveler = idTraveler;

        InterestPoint.create(clone, {
          include: [{ model: Element, as: "element" }],
        });
      });
    });
  };
}

module.exports = InterestpointController;
