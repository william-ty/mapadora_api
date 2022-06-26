var express = require("express");
const router = express.Router({ mergeParams: true });
const { Position } = require("../models/index");
const position_ctrl = require("../controllers/position_controller");
const positionController = new position_ctrl(Position);

/**
 *@swagger
 *components:
 *    schemas:
 *      TravelReview:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          is_terminated:
 *            type: boolean
 *          id_element:
 *            type: integer
 *            description: id of the element linked to the position
 *          id_position_list:
 *            type: integer
 *            description: id of the list of positions of the travel
 */

/**
 * @swagger
 * /travel/{idTravel}/position:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: store a position in BDD.
 *    tags:
 *      - position
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TravelReview'
 *    responses:
 *      "201":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.post("/", [
  positionController.identify_client,
  positionController.isParticipantOfTravel,
  positionController.create,
]);

/**
 * @swagger
 * /travel/{idTravel}/position/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: update an position.
 *    tags:
 *      - position
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *      - $ref: '#/parameters/idobject'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TravelReview'
 *    responses:
 *      "200":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.put("/:id", [
  positionController.identify_client,
  positionController.isParticipantOfTravel,
  positionController.update,
]);

/**
 * @swagger
 * /travel/{idTravel}/position/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: delete a position in BDD.
 *    tags:
 *      - position
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
router.delete("/:id", [
  positionController.identify_client,
  positionController.isParticipantOfTravel,
  positionController.delete,
]);

/**
 * @swagger
 * /travel/{idTravel}/position/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get a position from BDD.
 *    tags:
 *      - position
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
router.get("/:id", 
positionController.identify_client,
  positionController.isParticipantOfTravel,
positionController.findOne);

/**
 * @swagger
 * /travel/{idTravel}/position:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all positions for a travel.
 *    tags:
 *      - position
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
router.get("/", 
positionController.identify_client,
  positionController.isParticipantOfTravel,
positionController.findAll);

module.exports = router;
