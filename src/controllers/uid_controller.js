const { Diary,Photo,Position } = require("../models/index");

class UidController  {
  constructor() { /* TODO document why this constructor is empty */ }

  findAllDiaryByTravel = async (req, res, next) => {
    const idTravel = req.idTravel
    Diary.findAll({
        where:{
            id_travel : idTravel
        }
      })
      .then((objectsFound) => {
        if (objectsFound.length > 0) {
          return res.status(200).json(objectsFound);
        } else {
          return res.status(200).json([]);
        }
      })
      .catch((err) => {
        return err;
      });
  };

  findAllPositionByTravel = async (req, res, next) => {
    const idTravel = req.idTravel
    Position
      .findAll({
        where:{
            id_travel : idTravel
        }
      })
      .then((objectsFound) => {
        if (objectsFound.length > 0) {
          return res.status(200).json(objectsFound);
        } else {
          return res.status(200).json([]);
        }
      })
      .catch((err) => {
        return err;
      });
  };

  findAllPhotoByTravel = async (req, res, next) => {
    const idTravel = req.idTravel
    Photo
      .findAll({
        where:{
            id_travel : idTravel
        }
      })
      .then((objectsFound) => {
        if (objectsFound.length > 0) {
          return res.status(200).json(objectsFound);
        } else {
          return res.status(200).json([]);
        }
      })
      .catch((err) => {
        return err;
      });
  };

}

module.exports = UidController;


