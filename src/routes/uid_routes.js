var express = require("express");
const router = express.Router({ mergeParams: true });
const { uidToIdTravel } = require("../repository/travel_repository");

const { Diary, Photo, Position } = require("../models/index")
const uid_controller = require("../controllers/uid_controller");
const uidController = new uid_controller();

/**
*@swagger
*components:
*    schemas:
*      Trip:       
*          type: object
*          properties:
*            id:
*              type: integer
*            element:
*             allOf:
*               - $ref : '#/components/schemas/Element' 
*            id_departure_step:
*             type: integer
*            id_arrival_step:
*             type: integer
*            id_itinerary:
*             type:integer     
*/

/**
* @swagger
* /travel/{idTravel}/trip:
*  get:
*    security:
*      - bearerAuth: []
*    summary: find all trips from DB
*    tags:
*      - trip
*    parameters:
*      - $ref: '#/parameters/idtravel'
*    responses:
*      "200":
*        $ref: '#/responses/SuccessCreation'
*      "406":
*        $ref: '#/responses/NotAcceptable'
*      "400":
*        $ref: '#/responses/BadRequest'
*/
router.get('/view/:pathUid/diary', uidToIdTravel,uidController.findAllDiaryByTravel)
router.get('/view/:pathUid/photo', uidToIdTravel,uidController.findAllPhotoByTravel)
router.get('/view/:pathUid/position', uidToIdTravel, uidController.findAllPositionByTravel)


module.exports = router;
