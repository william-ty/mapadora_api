const { Travel } = require("../models/index");

const travel_repository = {
  uidToIdTravel: async (req, res, next) => {
    await Travel.findOne({
      where: { path_uid: req.params.pathUid },
    })
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Requested Travel not found" };
        }
        req.idTravel = travel.id;
        return next();
      })
      .catch((err) => {
        next(err);
      });
  },

  uidToAlbumTravelStatus: async (req, res, next) => {
    await Travel.findOne({
      where: { path_uid: req.params.pathUid },
    })
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Requested Travel not found" };
        }
        res.status(200).json({ is_album_public: travel.is_album_public });
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },
};

module.exports = travel_repository;
