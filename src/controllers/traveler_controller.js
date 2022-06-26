
const AppController = require("./app_controller");
const jwt = require('jsonwebtoken');
expressjwt = require('express-jwt');
const { ValidationError } = require("sequelize");

// get config vars
const dotenv = require('dotenv');
// access config var
dotenv.config();
const secret = process.env.TOKEN_SECRET;
const bcrypt = require('bcryptjs');
const { Participant, Travel, Travel_Traveler, Itinerary, TaskList, Element, TaskListTag } = require('../models/index');
const participant = require("../models/participant");
const enumPermission = require("../utils/enumPermission")

class TravelerController extends AppController {
  constructor(model) {
    super(model);
  }

  // Signup (same as this.create for now, could login user on signup)
  signup = (req, res, next) => {
    const data = {
      username: req.body.username || '',
      firstname: req.body.firstname || '',
      lastname: req.body.lastname || '',
      email: req.body.email || '',
      password: req.body.password || ''
    };
    return this._model.create(data)
      .then((user) => res.status(201).json(user))
      .catch((err) => next(err));
  };

  // Signin
  signin = async (req, res, next) => {
    const username = req.body.email || '';
    const password = req.body.password || '';

    await this._model.findOne({ where: { email: username } })
      .then((user) => {
        if (!user) {
          throw { status: 404, message: 'Requested User not found' };
        }
        if (!user.check_password(password)) {
          throw { status: 401, message: 'Wrong password' };
        }

        const token = jwt.sign(
          { id: user.id },
          secret,
          { algorithm: 'HS256', expiresIn: 60 * 60 * 12 }
        );
        return res.status(200).json({ user, token });
      })
      .catch((err) => next(err));
  };

  // Whoami ***uses auth controller (identify_client)***
  whoami = (req, res, next) => {
    return res.status(200).json(req.user);
  };

  update = async (req, res, next) => {
    // ---- refactor this-----
    let travelerRequired;
    if (req.user) {
      travelerRequired = typeof req.user.id !== 'undefined';
    }
    // -----------------------

    try {
      await this._model
        .findByPk(req.params.id)
        .then((object) => {
          // ---- refactor this-----
          if (travelerRequired) {
            // check if object is traveler
            if (typeof object.email !== 'undefined') {
              if (object.email !== req.user.email) {
                throw { status: 401, message: 'Unauthorized: wrong user' };
              }
            } else {
              // check if object has traveler id
              if (!object.id_traveler) {
                throw { status: 401, message: "Unauthorized: not a user ressource" };
              } else if (object.id_traveler !== req.user.id) {
                throw { status: 401, message: 'Unauthorized: no rights for this user' };
              }
            }
          }
          // -----------------------
          delete req.body.id;
          if (req.body.password) {
            const salt = bcrypt.genSaltSync(10, secret);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
          }
          Object.assign(object, req.body);
          return object.save();
        })
        .then((savedObject) => {
          return res.status(200).json(savedObject);
        })
        .catch((err) => {
          next(err)
        });
    } catch (err) {
      return next(err);
    }
  };

  identify_client = [
    expressjwt({ secret, algorithms: ['HS256'] }),
    (req, res, next) => {
      this._model.findByPk(req.user.id)
        .then((user) => {
          if (!user) {
            throw { status: 404, message: 'Requested Traveler not found' };
          }
          req.user = user;
          return next();
        })
        .catch((err) => {
          next(err)
        });
    }
  ];

  fetchInvitations = (req, res, next) => {
    //fetch sur la table participant pour trouver tous les participants
    //dont le mail est celui de la personne logguée et dont l'id_traveler
    //est null, et dont la colonne "hasRefused" est false
    return Participant.findAll({
      // attributes:['id_travel','id_participant'],
      include: [
        {
          attributes: ['id', 'path', 'name', 'commentary', 'id_traveltag'],
          model: Travel,
          required: true,
          as: "participant_travel",
        },
      ],
      where: {
        email: req.user.email,
        has_refused: false,
        id_traveler: null
      }

    }).then((invitations) => {
      if (!req.user) {
        throw { status: 404, message: 'Requested Traveler not found' };
      }

      return res.status(200).json(invitations);
    })
      .catch((err) => {
        next(err)
      });
  }

  fetchNumberOfInvitations = (req, res, next) => {
    //fetch sur la table participant pour trouver tous les participants
    //dont le mail est celui de la personne logguée et dont l'id_traveler
    //est null, et dont la colonne "hasRefused" est false
    return Participant.count({
      // attributes:['id_travel','id_participant'],
      include: [
        {
          attributes: ['name', 'commentary'],
          model: Travel,
          required: true,
          as: "participant_travel",
        },
      ],
      where: {
        email: req.user.email,
        has_refused: false,
        id_traveler: null
      }

    }).then((invitations) => {
      if (!req.user) {
        throw { status: 404, message: 'Requested Traveler not found' };
      }

      return res.status(200).json({ count: invitations });
    })
      .catch((err) => {
        next(err)
      });
  }





  dealWithInvitation = async (req, res, next) => {
    //on récupère le champ correspondant à l'adresse mail de 
    //l'utilisateur connecté + le voyage sélectionné
    //puis on update l'entrée en settant l'id_traveler. 
    //on créé ensuite une entrée dans travel_traveler
    // pour l'utilisateur et le voyage sélectionné, en mettant
    //une permission regular. 

    if (!req.user) {
      throw { status: 404, message: 'Requested Traveler not found' };
    }
    else {
      let participantToSave = await Participant.findByPk(req.body.idParticipant)
      participantToSave.id_traveler = req.user.id;
      participantToSave.has_refused = req.body.hasRefused;
      participantToSave.save().then(async participantSaved => {

        if (!participantToSave.has_refused) {
          const travelTravelerToSave = {
            id_permission: enumPermission.regular,
            id_traveler: participantSaved.id_traveler,
            id_travel: participantSaved.id_travel
          };

          const itinerary = await Itinerary.findOne({
            include: [{
              model: Element, required: true, as: "element_itinerary",
              where: {
                id_travel: travelTravelerToSave.id_travel
              }
            }]
          });
          console.log("JSON.stringify(travelTravelerToSave.id_travel")
          console.log(JSON.stringify(travelTravelerToSave.id_travel))

          console.log("JSON.stringify(itinerary)")
          console.log(JSON.stringify(itinerary))

          const taskList = await TaskList.findOne({
            where:{
              id_itinerary : itinerary.id
            }
          });
          const taskListId = taskList.id;

          console.log("JSON.stringify(TEST)")
          console.log(JSON.stringify(taskListId))
          console.log(JSON.stringify(participantSaved))

          await TaskListTag.create({
            name: participantSaved.name,
            id_task_list: taskListId
          });
          console.log("JSON.stringifyTASKLIST CREATED")

          return Travel_Traveler.create(travelTravelerToSave)
        }
        else {
          Participant.findByPk(req.body.idParticipant).then(participantToDelete => {
            participantToDelete.destroy()
            return "Participant deleted"
          })
        }
      })
        .then(result => {
          return res.status(200).json(result);
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


    }




  }
}

module.exports = TravelerController;
