var express = require("express");
const router = express.Router({ mergeParams: true });
const { Step, InterestPoint } = require("../models/index");
const step_ctrl = require("../controllers/step_controller");
const stepController = new step_ctrl(Step);
const interestpoint_ctrl = require("../controllers/interestpoint_controller");
const InterestpointController = new interestpoint_ctrl(InterestPoint);

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
 *          predicted_date:
 *            type: string
 *            format: date
 *      Step:
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
 *            duration:
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
 * /travel/{idTravel}/step:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: store a point in BDD.
 *    tags:
 *      - step
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Step'
 *    responses:
 *      "201":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.post("/step/", 
stepController.identify_client, 
stepController.isParticipantOfTravel,
stepController.create);

/**
 * @swagger
 * /travel/{idTravel}/step/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: update an step.
 *    tags:
 *      - step
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *      - $ref: '#/parameters/idobject'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Step'
 *    responses:
 *      "200":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.put("/step/:id", 
stepController.identify_client, 
stepController.isParticipantOfTravel,
stepController.update);

/**
 * @swagger
 * /travel/{idTravel}/step/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: delete a point in BDD.
 *    tags:
 *      - step
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
router.delete("/step/:id", 
stepController.identify_client, 
stepController.isParticipantOfTravel,
stepController.delete);

/**
 * @swagger
 * /travel/{idTravel}/step/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get a point from BDD.
 *    tags:
 *      - step
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
router.get("/step/:id", 
stepController.findOne);

/**
 * @swagger
 * /travel/{idTravel}/step:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all steps for a travel.
 *    tags:
 *      - step
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
router.get("/step/", 
stepController.findAll);


/**
 * @swagger
 * /travel/{idTravel}/step/{id}/interestpoint:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all interestpoint for a travel and a step.
 *    tags:
 *      - step
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
router.get("/step/:id/interestpoint", 
stepController.identify_client,
stepController.isParticipantOfTravel,
stepController.findAllAssociatedInterestPoints);


/**
 * @swagger
 * /travel/{idTravel}/step/reorder:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: reorder a list of steps.
 *    tags:
 *      - step
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Step'
 *    responses:
 *      "200":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.put("/steps/reorder", 
stepController.identify_client,
stepController.isParticipantOfTravel,
stepController.reorder);




module.exports = router;
