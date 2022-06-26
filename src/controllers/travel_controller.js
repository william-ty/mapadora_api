const AppController = require("./app_controller");
const {
  Trip,
  Travel,
  Itinerary,
  Step,
  Element,
  TaskList,
  Travel_Traveler,
  AtTravelTraveler,
  InterestPoint,
  Participant,
  Permission,
  Traveler,
  TravelReview
} = require("../models/index");
const ItineraryController = require("./itinerary_controller");

const { ValidationError } = require("sequelize");
const { crossOriginResourcePolicy } = require("helmet");
const enumPermission = require("../utils/enumPermission");
const fs = require("fs");
var path = require("path");
const TripController = require("./trip_controller");
const StepController = require("./step_controller");
const InterestpointController = require("./interestpoint_controller");
const travel = require("../models/travel");

expressjwt = require("express-jwt");

// get config vars
const dotenv = require("dotenv");
// access config var
dotenv.config();
const secret = process.env.TOKEN_SECRET;

class TravelController extends AppController {
  constructor(model) {
    super(model);
    this.foreignKeys = [];
  }

  // à la création d'un voyage se créé aussi l'itinéraire et la liste de tâches associée.
  create = async (req, res, next) => {
    //on construit les objets itinéraire et tasklist
    const element_itinerary = {
      id_travel: null,
      name: "itinéraire de test",
      description: "description de l'itinéraire",
    };
    const tasklist = {
      id_itinerary: null,
      name: "tasklist",
    };

    const itineraryObj = {
      element_itinerary: element_itinerary,
    };

    let objectsCreated = {};

    try {
      // recuperer l'utilisateur
      // ---- refactor this----
      let traveler;
      if (req.user) {
        traveler = typeof req.user.id !== "undefined";
      }

      // ----------------------- COVER

      const elementToSave = req.body;
      let filesPath = path.resolve(__dirname, "../../uploads/cover");
      let files = fs.readdirSync(filesPath);
      let chosenFile = files[Math.floor(Math.random() * files.length)];
      elementToSave.path = "uploads/cover/" + chosenFile;

      if (typeof elementToSave.id !== undefined) {
        delete elementToSave.id;
      }
      await this._model
        .create(elementToSave, { include: this.foreignKeys })
        //créer un participant
        .then((travelCreated) => {
          const participant = {
            name: req.user.firstname + " " + req.user.lastname,
            id_travel: travelCreated.id,
            id_traveler: req.user.id,
            email: req.user.email,
          };

          Participant.create(participant);
          return travelCreated;
        })
        //créer une permission admin pour le traveler
        .then((travelCreated) => {
          // assign admin perm when creating travel
          const travelTravelerObj = {
            id_permission: enumPermission.admin,
            id_traveler: req.user.id,
            id_travel: travelCreated.id,
          };

          Travel_Traveler.create(travelTravelerObj);

          return travelCreated;
        })

        .then((travelCreated) => {
          objectsCreated.travel = travelCreated;
          element_itinerary.id_travel = travelCreated.id;
          element_itinerary.id_traveler = req.user.id;
          itineraryObj.element_itinerary = element_itinerary;
          return Itinerary.create(itineraryObj, {
            include: [{ model: Element, as: "element_itinerary" }],
          });
        })
        .then((itineraryCreated) => {
          tasklist.id_itinerary = itineraryCreated.id;
          objectsCreated.itinerary = itineraryCreated;
          return TaskList.create(tasklist);
        })
        .then((taskListCreated) => {
          objectsCreated.tasklist = taskListCreated;
          return res.status(200).json(objectsCreated);
        });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    // TODO : Check permissions
    let travel;
    // req.user.getTravelTravelers().then((ts) => {
    //   console.log(JSON.stringify(ts));
    // })
    req.user
      .getTravels({
        where: {
          id: req.params.idTravel,
        },
      })
      .then((travels) => {
        if (!travels.length > 0) {
          throw { status: 401, message: "Unauthorized" };
        } else {
          let travel = travels[0];
          delete req.body.id;
          Object.assign(travel, req.body);
          return travel.save();
        }
      })
      .then((savedObject) => {
        return res.status(200).json(savedObject);
      })
      .catch((err) => {
        next(err);
      });
  };

  delete = async (req, res, next) => {
    let travel;
    req.user
      .getTravels({
        where: {
          id: req.params.idTravel,
        },
      })
      .then((travels) => {
        if (!travels.length > 0) {
          throw { status: 401, message: "Unauthorized" };
        } else {
          let travel = travels[0];
          travel.destroy();
        }
      }).then((deletedObject) => {
        return res.status(200).json("Object deleted");
      }).catch((err) => next);
  };

  findAllByUser = async (req, res, next) => {
    return req.user
      .getTravels({
        // Kept for record, changes done to toJSON() of Travel model
        joinTableAttributes: ["id_permission"],
      })
      .then((travels) => {
        res.json(travels);
      })
      .catch((err) => next);
  };

  findIfPublic = async (req, res, next) => {
    await Travel.findByPk(req.params.idTravel)
      .then((travel) => {
        if (travel && travel.is_public) {
          return res.json(travel);
        } else {
          req.travel = travel;
          next();
        }
      })
  };

  findOne = async (req, res, next) => {
    req.user.getTravels({
      where: {
        id: req.params.idTravel,
      },
      // Kept for record, changes done to toJSON() of Travel model
      joinTableAttributes: ["id_permission"],
    })
      .then((travels) => {
        console.log(travels);
        if (travels.length > 0) {
          return res.json(travels[0]);
        } else {
          throw { status: 401, message: "Unauthorized" };
        }
      }).catch((err) => {
        next(err);
      });
  };


  getTravelAdmin = (req, res, next) => {
    let id = req.params.idTravel;

    return this._model
      .findByPk(id)
      .then((travel) => {
        return travel.getTravelers({
          // where:{
          //   id_permission : 2
          // }
        });
      })
      .then((travels) => {
        if (travels.length > 0) {
          const admin = travels.filter((travel) => {
            return travel.Travel_Traveler.id_permission === 2;
          });
          const adminUser = {
            id: admin[0].id,
            firstname: admin[0].firstname,
            lastname: admin[0].lastname,
            email: admin[0].email,
            id_permission: admin[0].Travel_Traveler.id_permission,
          };
          return res.json(adminUser);
        }
      })
      .catch((err) => next);
  };

  isAuthorized = async (req, res, next) => {
    let id = req.params.idTravel;
    let idUser = req.user.id;

    await this._model
      .findByPk(id)
      .then((travel) => {
        return travel.getTravelers({
          // where:{
          //   id_permission : 2
          // }
        });
      })
      .then((travels) => {
        if (travels.length > 0) {
          return (
            travels.filter((travel) => {
              return travel.Travel_Traveler.id_traveler === idUser;
            }).length > 0
          );
        } else return false;
      })
      .then((isAuth) => {
        return res.json(isAuth);
      })
      .catch((err) => next);
  };

  // !Kept for record
  // findAllByUser = async (req, res, next) => {
  //   try {
  //     let validAssocs = [];
  //     await Travel_Traveler.findAll({
  //       where: {
  //         id_traveler: req.user.id,
  //       },
  //     }).then((objectsFound) => {
  //       if (objectsFound.length > 0) {
  //         for (let i = 0; i < objectsFound.length; i++) {
  //           const travelTraveler = objectsFound[i];
  //           if (travelTraveler.id_traveler === req.user.id) validAssocs.push(travelTraveler);
  //         }
  //         return validAssocs;
  //       } else {
  //         return res.status(200).json([]);
  //       }
  //     }).then((validAssocs) => {
  //       let promises = [];
  //       let travelsFound = [];
  //       validAssocs.forEach(assoc => {
  //         promises.push(
  //           this._model
  //             .findByPk(assoc.id_travel)
  //             .then((travel) => {
  //               console.log(JSON.stringify(travel))
  //               return travel;
  //             })
  //             .then((travel) => travelsFound.push(travel))
  //         )
  //       });
  //       Promise.all(promises).then(() => { return res.status(200).json(travelsFound) });
  //     })
  //   } catch (error) {
  //     next(error)
  //   }
  // };

  findAllPublicTravels = async (req, res, next) => {
    try {

      await this._model
        .findAll({
          include:
            this.foreignKeys,
          // { model: TravelReview }
          // include: [
          //   this.foreignKeys
          // ]
        })
        .then((objectsFound) => {
          if (objectsFound.length > 0) {
            let publicTravels = [];
            for (let i = 0; i < objectsFound.length; i++) {
              const travel = objectsFound[i];
              if (travel.is_public == true) publicTravels.push(travel);
            }
            return res.status(200).json(publicTravels);
          } else {
            return res.status(200).json([]);
          }
        });
    } catch (error) {
      next(error);
    }
  };

  getRandomPath = () => {
    return fs.readdir(path.join(process.cwd(), "maps"), (err, files) => {
      let max = files.length - 1;
      let min = 0;

      let index = Math.round(Math.random() * (max - min) + min);
      let file = files[index];

      return file;
    });
  };

  clone = async (idTravel, idTraveler, isPublic) => {
    const travelObject = await Travel.findOne({ where: { id: idTravel } });
    const travel = { ...travelObject.dataValues };
    delete travel.id;

    const clonedTravelId = await Travel.findOne({
      where: { id: idTravel },
      raw: true,
    }).then(async (travel) => {
      const travelValues = travel;

      delete travelValues.id;
      delete travelValues.path_uid;
      travelValues.is_public = isPublic;
      travelValues.is_album_public = false;

      if (travelValues.id_public_travel) {
        await Travel.findOne({
          where: { id: travelValues.id_public_travel },
        }).then((oldPublicTravel) => {
          delete travelValues.id_public_travel;
          travelValues.id = oldPublicTravel.id;
          return oldPublicTravel.destroy();
        });
      }

      return await Travel.create(travelValues).then((clonedTravel) => {
        return clonedTravel.id;
      });
    });

    if (isPublic) {
      Travel.findOne({
        where: { id: idTravel },
      }).then((travel) => {
        travel.id_public_travel = clonedTravelId;
        travel.save();
      });
    } else {
      const travelTravelerObj = {
        id_permission: 2,
        id_traveler: idTraveler,
        id_travel: clonedTravelId,
      };

      await Travel_Traveler.create(travelTravelerObj);
    }
    return clonedTravelId;
  };

  cloneTravel = async (req, res, next) => {
    const idTravel = req.params.idTravel;
    const idTraveler = req.user.id;
    const isPublic = req.body.is_public;

    if (idTravel && idTraveler) {
      const clonedTravelId = await this.clone(
        idTravel,
        idTraveler,
        isPublic ? isPublic : false
      );

      ItineraryController.clone(idTravel, clonedTravelId, idTraveler);

      // TaskListController.clone(idTravel, clonedTravelId, idTraveler);

      const tripsMapping = await TripController.clone(
        idTravel,
        clonedTravelId,
        idTraveler
      );

      const stepsMapping = await StepController.clone(
        idTravel,
        clonedTravelId,
        idTraveler,
        tripsMapping
      );

      await InterestpointController.clone(
        idTravel,
        clonedTravelId,
        idTraveler,
        stepsMapping
      );

      res.status(200).json({ idTravelCloned: clonedTravelId });
    } else {
      res.status(400).send({
        message: idTravel ? "missing id_traveler" : "missing id_travel",
      });
    }
  };
}
module.exports = TravelController;
