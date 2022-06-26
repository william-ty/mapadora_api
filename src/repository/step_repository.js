const { Step, Element } = require("../models/index");
const travel = require("../models/travel");

const step_repository = {


   findAllByTravel: async (id_travel) => Step.findAll({
      include: [{
         model: Element,
         as: "element",
         required: true,
         where: { id_travel: id_travel }
      }]
   }),

   findMaxOrder: async () => Step.findAllByTravel.max('duration')

}

module.exports = step_repository