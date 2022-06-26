const AppController = require("./app_controller");
const { Diary, Traveler } = require("../models/index");
expressjwt = require("express-jwt");

// get config vars
const dotenv = require("dotenv");
// access config var
dotenv.config();
const secret = process.env.TOKEN_SECRET;

class DiaryController extends AppController {
  constructor(model) {
    super(model);
    this.foreignKeys = [{ model: Traveler, as: "traveler_diary" }];
  }
}

module.exports = DiaryController;
