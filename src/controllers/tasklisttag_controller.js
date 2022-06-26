const AppController = require("./app_controller");
const { Itinerary, Element, TaskList } = require("../models/index");

class TaskListTagController extends AppController {
  constructor(model) {
    super(model);
  }

  create = async (req, res, next) => {
    try {
      // This part is common to task_controller and tasklisttag_controller
      const itinerary = await Itinerary.findOne({
        include: [
          {
            model: Element,
            required: true,
            as: "element_itinerary",
            where: {
              id_travel: req.params.idTravel,
            },
          },
        ],
      });

      const idItinerary = itinerary.id;

      const taskList = await TaskList.findByPk(idItinerary);

      const idTaskList = taskList.id;
      //__________________________________________________________________

      // ------------ refactor this part-----
      let travelerRequired;
      if (req.user) {
        travelerRequired = typeof req.user.id !== "undefined";
      }

      let validity = true;

      const taskListTagToSave = req.body;
      if (typeof taskListTagToSave.id !== undefined) {
        delete taskListTagToSave.id;
      }

      Object.assign(taskListTagToSave, { id_task_list: idTaskList });

      // if (travelerRequired) {
      //   const idTraveler_attr = { id_traveler: req.user.id };
      //   Object.assign(taskListTagToSave, idTraveler_attr);
      // }

      // -----------------------------------

      console.log(validity);

      validity
        ? await this._model
            .create(taskListTagToSave, { include: this.foreignKeys })
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

  findAllByTravelAndItinerary = async (req, res, next) => {
    const itinerary = await Itinerary.findOne({
      include: [
        {
          model: Element,
          required: true,
          as: "element_itinerary",
          where: {
            id_travel: req.params.idTravel,
          },
        },
      ],
    });

    const idItinerary = itinerary ? itinerary.id : undefined;
    if (itinerary && idItinerary) {
      await TaskList.findOne({
        where: {
          id_itinerary: idItinerary,
        },
      })
        .then((tasklist) => {
          console.log("TASKLIST")
          console.log(tasklist)
          if(tasklist && tasklist.id){

          return this._model.findAll({
            where: {
              id_task_list: tasklist?.id,
            },
          })} else{
            return ""
          }
        })
        .then((tasksListTag) => {
          if (tasksListTag.length > 0) {
            return res.status(200).json(tasksListTag);
          } else {
            return res.status(200).json([]);
          }
        });
    } else {
      return res.status(200).json("");
    }
  };
}

module.exports = TaskListTagController;
