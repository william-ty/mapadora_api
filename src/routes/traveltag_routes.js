var express = require("express");
const router = express.Router({ mergeParams: true });
const { TravelTag } = require("../models/index");
const traveltag_ctrl = require("../controllers/traveltag_controller");
const traveltagController = new traveltag_ctrl(TravelTag);

/**
 *@swagger
 *components:
 *    schemas:
 *      TravelTag:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *            description: name of traveltag
 *          is_terminated:
 *            type: boolean
 *          id_element:
 *            type: integer
 *            description: id of the element linked to the traveltag
 *          id_traveltag_list:
 *            type: integer
 *            description: id of the list of traveltags of the travel
 */

// /**
//  * @swagger
//  * /travel/{idTravel}/traveltag:
//  *  post:
//  *    summary: store a traveltag in BDD.
//  *    tags:
//  *      - traveltag
//  *    parameters:
//  *      - $ref: '#/parameters/idtravel'
//  *    requestBody:
//  *      content:
//  *        application/json:
//  *          schema:
//  *            $ref: '#/components/schemas/TravelTag'
//  *    responses:
//  *      "201":
//  *        $ref: '#/responses/SuccessCreation'
//  *      "406":
//  *        $ref: '#/responses/NotAcceptable'
//  *      "400":
//  *        $ref: '#/responses/BadRequest'
//  */
// router.post("/", traveltagController.create);

// /**
//  * @swagger
//  * /travel/{idTravel}/traveltag/{id}:
//  *  put:
//  *    summary: update an traveltag.
//  *    tags:
//  *      - traveltag
//  *    parameters:
//  *      - $ref: '#/parameters/idtravel'
//  *      - $ref: '#/parameters/idobject'
//  *    requestBody:
//  *      content:
//  *        application/json:
//  *          schema:
//  *            $ref: '#/components/schemas/TravelTag'
//  *    responses:
//  *      "200":
//  *        $ref: '#/responses/SuccessCreation'
//  *      "406":
//  *        $ref: '#/responses/NotAcceptable'
//  *      "400":
//  *        $ref: '#/responses/BadRequest'
//  */
// router.put("/:id", traveltagController.update);

// /**
//  * @swagger
//  * /travel/{idTravel}/traveltag/{id}:
//  *  delete:
//  *    summary: delete a traveltag in BDD.
//  *    tags:
//  *      - traveltag
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
// router.delete("/:id", traveltagController.delete);

/**
 * @swagger
 * /travel/{idTravel}/traveltag/{id}:
 *  get:
 *    summary: get a traveltag from BDD.
 *    tags:
 *      - traveltag
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
router.get("/:id", traveltagController.findOne);

/**
 * @swagger
 * /travel/{idTravel}/traveltag:
 *  get:
 *    summary: get all traveltags for a travel.
 *    tags:
 *      - traveltag
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
router.get("/", traveltagController.findAll);

module.exports = router;
