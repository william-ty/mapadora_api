const AppTravelController = require("./app_travel_controller");
const { ValidationError } = require("sequelize");
const { Document, Element, Itinerary } = require("../models");

class DocumentController extends AppTravelController {
  constructor(model) {
    super(model);
    this.elementAlias = "element";
    this.foreignKeys = [{ model: Element, as: this.elementAlias }];
  }

  create = async (req, res, next) => {
    let document;

    // if (typeof req.file === 'undefined') {
    //   throw { status: 400, message: "No file provided" }
    // }
    // TODO - handle wrong path - no such file
    const file = req.file;
    let idElement = req.body.id_element;
    const idTravel = parseInt(req.params.idTravel);

    if (!idElement) {
      const ElementItinerary = await Itinerary.findAll({
        include: [
          {
            model: Element,
            required: true,
            as: "element_itinerary",
            where: {
              id_travel: idTravel,
            },
          },
        ],
      });
      idElement = ElementItinerary[0]?.id_element;
    }

    // Create
    document = {
      path: file.path,
      name: file.filename,
      id_element: idElement,
    };
    try {
      await Document.create(document)
        .then((savedObject) => {
          return res.status(201).json(savedObject);
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = DocumentController;
