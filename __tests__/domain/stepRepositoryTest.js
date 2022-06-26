
const step_repository = require('../../src/repository/step_repository')

test("récupération des points", async () => {
   const Step = require("../../src/models/step")
   const Element = require("../../src/models/element")


   await Step.findAll({
      include: [{
         model: Element,
         as: "element",
         required: true,
         where: { id_travel: 8 }
      }]
   }).then(res => console.log(res))
});
