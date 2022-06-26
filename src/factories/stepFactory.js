

const stepFactory = {


  createStepWithDurationAndOrder : (duration, order) => {
    const {Step} = require("../models/index")

    const step =  
    {
        id: 22,
        point: pointFactory.createPointWithLonLat(7.831568775596878,48.660642473159584),
        createdAt: "2022-03-20T19:34:45.475Z",
        updatedAt: "2022-03-20T19:34:45.475Z",
        duration: duration,
        order: order,
        id_element: 33,
    }

    return Step.build(step);
}
}
module.exports = stepFactory;