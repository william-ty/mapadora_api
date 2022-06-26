
const elementFactory = {

 createElement : () => {
  const {Element} = require("../models/index")

  const element = {
    id: 33,
    name: "Test",
    description: "Test",
    predicted_date: "2022-03-20",
    createdAt: "2022-03-20T19:34:45.476Z",
    updatedAt: "2022-03-20T19:34:45.476Z",
  };
  return Element.build(element);
}
}

module.exports = elementFactory;
