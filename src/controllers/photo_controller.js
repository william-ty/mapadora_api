const AppController = require("./app_controller");
const { Photo } = require("../models");

var ExifImage = require("exif").ExifImage;
class PhotoController extends AppController {
  constructor(model) {
    super(model);
    this.foreignKeys = [];
  }

  create = async (req, res, next) => {
    Promise.all(
      req.files.map((image) => {
        // Coordinates
        let exifLng;
        let exifLat;
        let lng;
        let lat;

        // Date
        let date;

        // Get Exif MetaData of Photo
        return new Promise((resolve, reject) => {
          new ExifImage({ image: image.path }, async (error, exifData) => {
            if (!error) {
              date = exifData?.exif?.DateTimeOriginal;
              exifLng = exifData?.gps?.GPSLongitude;
              exifLat = exifData?.gps?.GPSLatitude;

              if (exifLng && exifLat) {
                lng = exifLng[0] + exifLng[1] / 60 + exifLng[2] / 3600;
                lat = exifLat[0] + exifLat[1] / 60 + exifLat[2] / 3600;
              }
            }

            let photoToCreate = {
              point:
                lng && lat
                  ? {
                      type: "Point",
                      coordinates: [lng, lat],
                      crs: { type: "name", properties: { name: "EPSG:4326" } },
                    }
                  : null,
              path: image.path,
              is_in_album: false, // By default, photo are juste visible by the members of the travel
              is_public: false,
              id_travel: req.params.idTravel,
            };
            console.log("Photo create");
            // Service Checks
            Photo.create(photoToCreate).then((photo) => {
              resolve(photo);
            });
          });
        });
      })
    )
      .then((photos) => {
        res.status(200).send(photos);
      })
      .catch((err) => {
        res.status(400).send("Objet non conforme");
      });
  };
}

module.exports = PhotoController;
