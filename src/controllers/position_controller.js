const AppController = require("./app_controller");
const { Traveler } = require("../models/index");

class PositionController extends AppController {
  constructor(model) {
    super(model);
    this.foreignKeys = [{ model: Traveler, as: "traveler_position" }];
  }
}

module.exports = PositionController;
