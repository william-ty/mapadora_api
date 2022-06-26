const { Element } = require("../../src/models/index")

let findTravelFromModel = async (model, idTravel) => {
  return model.findAll({
    where: {
      id_travel: idTravel,
    },
  })
}

let findTravelOfElementFromModel = async (model, idTravel, controller) => {
  return model.findAll({
    include: [
      {
        model: Element,
        as: controller.elementAlias,
        required: true,
        where: {
          id_travel: idTravel,
        },
      },
    ],
  })
}

module.exports = { findTravelFromModel, findTravelOfElementFromModel }