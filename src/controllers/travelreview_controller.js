const AppController = require("./app_controller");

const {
  Travel,
} = require("../models/index");
class TravelReviewController extends AppController {
  constructor(model) {
    super(model);
  }

  getAverageReview = async (req, res, next) => {
    try {
      await this._model
        .findAll({
          where: {
            id_travel: req.params.idTravel,
          },
        })
        .then((objectsFound) => {
          if (objectsFound.length > 0) {
            let reviews = [];
            objectsFound.map(reviewObject => reviews.push(reviewObject.review));
            console.log(JSON.stringify("reviews"))
            console.log(JSON.stringify(reviews))
            const average = reviews.reduce((a, b) => a + b, 0) / reviews.length;
            console.log(JSON.stringify("average"))
            console.log(JSON.stringify(average))
            return res.status(200).json(average);
          } else {
            return res.status(200).json([]);
          }
        });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = TravelReviewController;
