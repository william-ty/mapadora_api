var express = require("express");
const router = express.Router({ mergeParams: true });
const { InterestPoint, Element } = require("../models/index");
const interestpoint_ctrl = require("../controllers/interestpoint_controller");
const interestpointController = new interestpoint_ctrl(InterestPoint);

/**
 *@swagger
 *components:
 *    schemas:
 *      Element:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *            description: name of element
 *          description:
 *            type: string
 *          id_travel:
 *            type: integer
 *          predicted_date:
 *            type: string
 *            format: date
 *      Interestpoint:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *            element:
 *             allOf:
 *               - $ref : '#/components/schemas/Element'
 *            point:
 *              $ref: '#/components/schemas/Point'
 *            order:
 *              type: integer
 *      Point:
 *        type: object
 *        description: GeoJSon geometry
 *        properties:
 *         type:
 *           type: string
 *           enum:
 *           - Point
 *         coordinates:
 *           $ref: '#/components/schemas/Point2D'
 *      Point2D:
 *        type: array
 *        maxItems: 2
 *        minItems: 2
 *        items:
 *         type: number
 */

/**
 * @swagger
 * /travel/{idTravel}/interestpoint:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: store a point in BDD.
 *    tags:
 *      - interestpoint
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Interestpoint'
 *    responses:
 *      "201":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.post("/interestpoint/", [
  interestpointController.identify_client,
  interestpointController.isParticipantOfTravel,
  interestpointController.create,
]);

/**
 * @swagger
 * /travel/{idTravel}/interestpoint/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: update an interestpoint.
 *    tags:
 *      - interestpoint
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *      - $ref: '#/parameters/idobject'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Interestpoint'
 *    responses:
 *      "200":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.put("/interestpoint/:id", [
  interestpointController.identify_client,
  interestpointController.isParticipantOfTravel,
  interestpointController.update,
]);

/**
 * @swagger
 * /travel/{idTravel}/interestpoint/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: delete a point in BDD.
 *    tags:
 *      - interestpoint
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
router.delete("/interestpoint/:id", [
  interestpointController.identify_client,
  interestpointController.isParticipantOfTravel,
  interestpointController.delete,
]);

/**
 * @swagger
 * /travel/{idTravel}/interestpoint/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get a point from BDD.
 *    tags:
 *      - interestpoint
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
router.get("/interestpoint/:id", 
interestpointController.findOne);

/**
 * @swagger
 * /travel/{idTravel}/interestpoint:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all interestpoints for a travel.
 *    tags:
 *      - interestpoint
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
router.get("/interestpoint/", 
interestpointController.findAll);

/**
* @swagger
* /travel/{idTravel}/interestpoint/{id}/step/{idStep}:
*  get:
*    security:
*      - bearerAuth: []
*    summary: associate an existing interestpoint to an existing step.
*    tags:
*      - interestpoint
*    parameters:
*      - $ref: '#/parameters/idtravel'
*      - $ref: '#/parameters/idobject'
*      - $ref: '#/parameters/idstep' 
*    responses:
*      "200":
*        $ref: '#/responses/SuccessCreation'
*      "406":
*        $ref: '#/responses/NotAcceptable'
*      "400":
*        $ref: '#/responses/BadRequest'
*/
router.put("/interestpoint/:id/step/:idStep", 
interestpointController.identify_client, 
interestpointController.isParticipantOfTravel,
interestpointController.addInterestPointToStep);

/**
* @swagger
* /travel/{idTravel}/interestpoint/{id}/removestep:
*  get:
*    security:
*      - bearerAuth: []
*    summary: remove existing link of an interestpoint with an existing step.
*    tags:
*      - interestpoint
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
router.put("/interestpoint/:id/removestep", 
  interestpointController.identify_client, 
  interestpointController.isParticipantOfTravel,
  interestpointController.removeInterestPointFromStep);


module.exports = router;
