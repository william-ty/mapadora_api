const AppController = require("./app_controller");
const { Element, Itinerary, TaskList } = require("../models/index");

class ItineraryController extends AppController {
  constructor(model) {
    super(model);
    this.foreignKeys = [{ model: Element, as: "element_itinerary" }];
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
      }).then((itinerary) => {
        const tasklist = {
          id_itinerary: itinerary.id,
          name: "tasklist",
        };
        TaskList.create(tasklist);
        return itinerary;
      }).catch((err) => {
        next(err);
      });
    });
  };
}

module.exports = ItineraryController;
