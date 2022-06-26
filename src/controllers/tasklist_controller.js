const AppController = require("./app_controller");

class TaskListController extends AppController {
  constructor(model) {
    super(model);
  }

  static clone = (idTravel, clonedTravelId, idTraveler) => {
    return Itinerary.findOne({
      include: [
        {
          model: Element,
          as: "element_itinerary",
          required: true,
          where: {
            id_travel: idTravel,
          },
        },
      ],
    }).then(async (intinerary) => {
      const intineraryToClone = intinerary.dataValues;
      const element = intineraryToClone.element_itinerary.dataValues;

      delete intineraryToClone.id;
      delete intineraryToClone.id_element;
      delete element.id;

      let clone = {};
      clone.element_itinerary = {};
      clone.element_itinerary.name = element.name;
      clone.element_itinerary.description = element.name;
      clone.element_itinerary.id_travel = clonedTravelId;
      clone.element_itinerary.id_traveler = idTraveler;

      return await Itinerary.create(clone, {
        include: [{ model: Element, as: "element_itinerary" }],
      });
    });
  };
}

module.exports = TaskListController;
