const AppController = require("./app_controller");
const { TaskListTag, Task, Itinerary, Element, TaskList } = require("../models/index");
const { ValidationError } = require("sequelize");

class TaskController extends AppController {
  constructor(model) {
    super(model);
  }

  create = async (req, res, next) => {
    try {

      const tagProvided = typeof req.body.tag_id !== "undefined";
      const tagsProvided = typeof req.body.TaskListTags != "undefined";

      const itinerary = await Itinerary.findOne({
        include: [{
          model: Element, required: true, as: "element_itinerary",
          where: {
            id_travel: req.params.idTravel
          }
        }]
      });

      const idItinerary = itinerary.id;

      const taskList = await TaskList.findByPk(idItinerary);

      const idTaskList = taskList.id;

      // ------------ refactor this part-----
      let travelerRequired;
      if (req.user) {
        travelerRequired = typeof req.user.id !== "undefined";
      }

      let validity = true;

      const taskToSave = req.body;
      if (typeof taskToSave.id !== undefined) {
        delete taskToSave.id;
      }

      Object.assign(taskToSave, { id_task_list: idTaskList });
      Object.assign(taskToSave, { is_terminated: 'false' });

      console.log(JSON.stringify(taskToSave));

      if (travelerRequired) {
        const idTraveler_attr = { id_traveler: req.user.id };
        Object.assign(taskToSave, idTraveler_attr);
      }

      // -----------------------------------
      let tagFound;
      if (tagProvided) {
        tagFound = await TaskListTag.findByPk(req.body.tag_id);
      }

      let tags;
      let tagsIds;
      let tagsFound;

      if (tagsProvided) {
        tags = req.body.TaskListTags;
        tagsIds = tags.map((tag) => tag.id);
        tagsFound = await TaskListTag.findAll({
          where: {
            id: tagsIds
          }
        });
      }

      console.log(validity);

      validity
        ? await this._model
          .create(taskToSave, { include: this.foreignKeys })
          .then(
            (savedTask) => {
              if (tagFound) {
                savedTask.addTaskListTag(tagFound);
              }
              if (tagsFound && tagsFound.length > 0) {
                tagsFound.map((tag) => savedTask.addTaskListTag(tag));
              }
              return savedTask;
            },
            (err) => {
              return next(err);
            }
          ).then((savedTask) => {
            if (tagsFound && tagsFound.length > 0) {

              let taskToReturn = savedTask;
              taskToReturn.setDataValue('TaskListTags', tagsFound);

              return res.status(201).json(taskToReturn);
            } else {
              return res.status(201).json(savedTask);
            }
          },
            (err) => {
              return next(err);
            })
        : next(err);
    } catch (err) {
      return next(err);
    }
  };


  update = async (req, res, next) => {
    const tagProvided = typeof req.body.tag_id !== "undefined";

    // ---- refactor this-----
    let travelerRequired;
    if (req.user) {
      travelerRequired = typeof req.user.id !== "undefined";
    }
    // -----------------------

    let tagFound;
    if (tagProvided) {
      tagFound = await TaskListTag.findByPk(req.body.tag_id);
    }

    try {
      await this._model
        .findByPk(req.params.id)
        .then((object) => {
          // // ---- refactor this-----
          // if (travelerRequired) {
          //   // check if object is traveler
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
          delete req.body.id;
          Object.assign(object, req.body);
          return object.save();
        })
        .then((savedObject) => {
          if (tagFound) {
            savedObject.addTaskListTag(tagFound);
          }
          return res.status(200).json(savedObject);
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      return next(err);
    }
  };

  associateTagToTask = async (req, res, next) => {
    try {
      await TaskListTag.findByPk(req.params.idTag)
        .then((tag) => {
          Task.findByPk(req.params.id)
            .then((task) => {
              if (tag && task) {
                task.addTaskListTag(tag);
              }
            })
        })
        .then(
          (savedObject) => {
            return res.status(200).json("Tag associé");
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

  associateTagsToTask = async (req, res, next) => {
    try {

      // console.log("req.body")
      // console.log(JSON.stringify(req.body))
      let tags = req.body;

      let tagsIds = tags.map((tag) => tag.tagId);

      await TaskListTag.findAll({
        where: {
          id: tagsIds
        }
      }).then((tags) => {
        Task.findByPk(req.params.id)
          .then((task => {
            if (tags && task) {
              tags.map((tag) => task.addTaskListTag(tag));
            }
          }))
      })
        .then(
          () => {
            return res.status(200).json("Tag associé");
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

  removeTagFromTask = async (req, res, next) => {
    try {
      await TaskListTag.findByPk(req.params.idTag)
        .then((tag) => {
          Task.findByPk(req.params.id)
            .then((task) => {
              if (tag && task) {
                task.removeTaskListTag(tag);
              }
            })
        })
        .then(
          (savedObject) => {
            return res.status(200).json("Tag dissocié");
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

  findAllByTravelAndItinerary = async (req, res, next) => {
    const itinerary = await Itinerary.findOne({
      include: [
        {
          model: Element, required: true, as: "element_itinerary",
          where: {
            id_travel: req.params.idTravel
          }
        }
      ]
    });

    const idItinerary = itinerary ? itinerary.id : undefined;

    await TaskList.findByPk(idItinerary).then((tasklist) => {
      if (tasklist) {
        return this._model.findAll({
          where: {
            id_task_list: tasklist.id
          },
          include: [
            {
              model: TaskListTag
            }
          ]
        })
      }
      else {
        return []
      }
    }).then((tasks) => {
      if (tasks.length > 0) {
        return res.status(200).json(tasks);
      } else {
        return res.status(200).json([]);
      }
    });
  };


}

module.exports = TaskController;
