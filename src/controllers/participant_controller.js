const {
  Participant,
  Travel_Traveler,
  Itinerary,
  Element,
  TaskListTag,
  TaskList,
} = require("../models/index");
const { Op } = require("sequelize");
const AppController = require("./app_controller");
const mailerService = require("./mailer_service");

class ParticipantController extends AppController {
  constructor(model) {
    super(model);
    this.foreignKeys = [];
  }

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

      if (req.params.idTravel) {
        elementToSave.id_travel = req.params.idTravel;
      }

      // -----------------------------------
      await this._model
        .create(elementToSave, { include: this.foreignKeys })
        .then(
          (savedObject) => {
            res.savedObject = savedObject
            // return res.status(201).json(savedObject);
            return next();
          },
          (err) => {
            return next(err);
          }
        );
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
    let idTravel = req.params.idTravel;
    let id = req.params.id;
    let idParticipant = undefined;
    let obj = {};
    if (id === null || id === undefined || id === 0) {
      return res.status(400).json("Not found");
    } else {
      obj.id = id;
      await this._model
        .findByPk(id)
        .then((object) => {
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
          idParticipant = object.id_participant;
          object.destroy();

          return object;
        })
        .then((object) => {
          if (object.id_traveler) {
            console.log(object.id_traveler);
            return Travel_Traveler.findOne({
              where: {
                id_travel: idTravel,
                id_traveler: object.id_traveler,
              },
            });
          }
        })
        .then((travelTraveler) => {
          if (travelTraveler) {
            travelTraveler.destroy();
          }
        })
        .then(
          (deletedObject) => {
            return res.status(200).json({ id: idParticipant });
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

  //Décommenter le bloc pour l'envoi de mails :)
  sendEmailInvitation = async (req, res, next) => {
    if (req.body.email) {
      mailerService(
        req.user,
        req.params.idTravel,
        req.body.name,
        req.body.email
      )
        .then((result) => {
          return res.status(200).json(res.savedObject);
        })
        .catch((err) => {
          return res.status(400).send({
            message: err.message,
          });
        });
    } else {
      return res.status(200).json(res.savedObject);
    }
  };

  fetchTravelParticipants = async (req, res, next) => {
    await Participant.findAll({
      where: {
        id_travel: req.params.idTravel,
        // id_traveler:{
        //   [Op.ne]:req.user.id,
        // }
      },
    }).then((participants) => {
      return res.status(200).json(participants);
    });
  };
}
module.exports = ParticipantController;
