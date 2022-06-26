const {Trip} = require("../models/index")


const findTripByDepartureAndArrivalStep = async  (trip) => {
   const tripModel = Trip.build(trip);
   return Trip.findAll({
       where: {
           id_travel: tripModel.id_travel,
           id_departure_step : tripModel.id_departure_step,
           id_arrival_step: tripModel.id_arrival_step
       }
   })
}

module.exports = findTripByDepartureAndArrivalStep