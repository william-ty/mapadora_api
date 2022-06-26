var express = require("express");
const router = express.Router({ mergeParams: true });
const { Trip, Element } = require("../models/index")
const trip_ctrl = require("../controllers/trip_controller");
const tripController = new trip_ctrl(Trip);


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
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: store a trip in BDD.
 *    tags:
 *      - trip
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: '#/components/schemas/Trip'        
 *    responses:
 *      "201":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.post('/', [
    tripController.identify_client, 
    tripController.isParticipantOfTravel,
    tripController.create])

/**
* @swagger
* /travel/{idTravel}/trip:
*  put:
*    security:
*      - bearerAuth: []
*    summary: update an step.
*    tags:
*      - trip
*    parameters:
*      - $ref: '#/parameters/idtravel'
*    requestBody:
*      content:
*        application/json:
*          schema: 
*            $ref: '#/components/schemas/Trip'        
*    responses:
*      "200":
*        $ref: '#/responses/SuccessCreation'
*      "406":
*        $ref: '#/responses/NotAcceptable'
*      "400":
*        $ref: '#/responses/BadRequest'
*/
router.put('/:id', [tripController.identify_client,
    tripController.isParticipantOfTravel,
    tripController.update])


/**
* @swagger
* /travel/{idTravel}/trip/{id}:
*  delete:
*    security:
*      - bearerAuth: []
*    summary: delete a Trip in BDD.
*    tags:
*      - trip
*    parameters:
*      - $ref: '#/parameters/idtravel'
*      - $ref: '#/parameters/idobject'
*    responses:
*      "200":
*        $ref: '#/responses/SuccessCreation'
*      "406":
*        $ref: '#/responses/NotAcceptable'
*      "400":
*        $ref: '#/responses/BadRequest'
*/
router.delete('/:id', [
    tripController.identify_client, 
    tripController.isParticipantOfTravel,
    tripController.delete])

/**
* @swagger
* /travel/{idTravel}/trip/{id}:
*  get:
*    security:
*      - bearerAuth: []
*    summary: get a trip from BDD.
*    tags:
*      - trip
*    parameters:
*      - $ref: '#/parameters/idtravel'
*      - $ref: '#/parameters/idobject'
*    responses:
*      "200":
*        $ref: '#/responses/SuccessCreation'
*      "406":
*        $ref: '#/responses/NotAcceptable'
*      "400":
*        $ref: '#/responses/BadRequest'
*/
router.get('/:id', 
tripController.findOne)

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
router.get('/', 
tripController.findAll)


module.exports = router;
