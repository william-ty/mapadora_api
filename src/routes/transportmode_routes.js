var express = require("express");
const router = express.Router({ mergeParams: true });
const { TransportMode } = require("../models/index");
const transportmode_ctrl = require("../controllers/transportmode_controller");
const transportmodeController = new transportmode_ctrl(TransportMode);

/**
 *@swagger
 *components:
 *    schemas:
 *      TransportMode:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *            description: name of transportmode
 *          is_terminated:
 *            type: boolean
 *          id_element:
 *            type: integer
 *            description: id of the element linked to the transportmode
 *          id_transportmode_list:
 *            type: integer
 *            description: id of the list of transportmodes of the travel
 */

// /**
//  * @swagger
//  * /travel/{idTravel}/transportmode:
//  *  post:
//  *    summary: store a transportmode in BDD.
//  *    tags:
//  *      - transportmode
//  *    parameters:
//  *      - $ref: '#/parameters/idtravel'
//  *    requestBody:
//  *      content:
//  *        application/json:
//  *          schema:
//  *            $ref: '#/components/schemas/TransportMode'
//  *    responses:
//  *      "201":
//  *        $ref: '#/responses/SuccessCreation'
//  *      "406":
//  *        $ref: '#/responses/NotAcceptable'
//  *      "400":
//  *        $ref: '#/responses/BadRequest'
//  */
// router.post("/", transportmodeController.create);

// /**
//  * @swagger
//  * /travel/{idTravel}/transportmode/{id}:
//  *  put:
//  *    summary: update an transportmode.
//  *    tags:
//  *      - transportmode
//  *    parameters:
//  *      - $ref: '#/parameters/idtravel'
//  *      - $ref: '#/parameters/idobject'
//  *    requestBody:
//  *      content:
//  *        application/json:
//  *          schema:
//  *            $ref: '#/components/schemas/TransportMode'
//  *    responses:
//  *      "200":
//  *        $ref: '#/responses/SuccessCreation'
//  *      "406":
//  *        $ref: '#/responses/NotAcceptable'
//  *      "400":
//  *        $ref: '#/responses/BadRequest'
//  */
// router.put("/:id", transportmodeController.update);

// /**
//  * @swagger
//  * /travel/{idTravel}/transportmode/{id}:
//  *  delete:
//  *    summary: delete a transportmode in BDD.
//  *    tags:
//  *      - transportmode
//  *    parameters:
//  *      - $ref: '#/parameters/idtravel'
//  *      - $ref: '#/parameters/idobject'
//  *    responses:
//  *      "200":
//  *        $ref: '#/responses/SuccessCreation'
//  *      "406":
//  *        $ref: '#/responses/NotAcceptable'
//  *      "400":
//  *        $ref: '#/responses/BadRequest'
//  */
// router.delete("/:id", transportmodeController.delete);

/**
 * @swagger
 * /travel/{idTravel}/transportmode/{id}:
 *  get:
 *    summary: get a transportmode from BDD.
 *    tags:
 *      - transportmode
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
router.get("/:id", transportmodeController.findOne);

/**
 * @swagger
 * /travel/{idTravel}/transportmode:
 *  get:
 *    summary: get all transportmodes for a travel.
 *    tags:
 *      - transportmode
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
router.get("/", transportmodeController.findAll);


module.exports = router;
