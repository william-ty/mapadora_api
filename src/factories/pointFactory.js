 const pointFactory = {

      createPointWithLonLat : (lon,lat) => {
        const {Point} = require("../models/index")

       const point = {
            crs: {
                type: "name",
                properties: {
                    name: "EPSG:4326"
                }
            },
            type: "Point",
            coordinates: [
                lon,
                lat
            ]
        }

        return Point.build(point);
    }

}

module.exports = pointFactory;