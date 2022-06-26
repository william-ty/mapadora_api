var express = require("express");
const router = express.Router({ mergeParams: true });
const { TravelReview } = require("../models/index");
const travelreview_ctrl = require("../controllers/travelreview_controller");
const travelreviewController = new travelreview_ctrl(TravelReview);

/**
 *@swagger
 *components:
 *    schemas:
 *      TravelReview:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *            description: name of travelreview
 *          is_terminated:
 *            type: boolean
 *          id_element:
 *            type: integer
 *            description: id of the element linked to the travelreview
 *          id_travelreview_list:
 *            type: integer
 *            description: id of the list of travelreviews of the travel
 */

/**
 * @swagger
 * /travel/{idTravel}/travelreview:
 *  post:
 *    summary: store a travelreview in BDD.
 *    tags:
 *      - travelreview
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
router.post("/", travelreviewController.create);


/**
 * @swagger
 * /travel/{idTravel}/travelreview/average:
 *  get:
 *    summary: get the average review of a travel from BDD.
 *    tags:
 *      - travelreview
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
router.get("/average", travelreviewController.getAverageReview);


/**
 * @swagger
 * /travel/{idTravel}/travelreview/{id}:
 *  put:
 *    summary: update an travelreview.
 *    tags:
 *      - travelreview
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
router.put("/:id", travelreviewController.update);

/**
 * @swagger
 * /travel/{idTravel}/travelreview/{id}:
 *  delete:
 *    summary: delete a travelreview in BDD.
 *    tags:
 *      - travelreview
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
router.delete("/:id", travelreviewController.delete);

/**
 * @swagger
 * /travel/{idTravel}/travelreview/{id}:
 *  get:
 *    summary: get a travelreview from BDD.
 *    tags:
 *      - travelreview
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
router.get("/:id", travelreviewController.findOne);

/**
 * @swagger
 * /travel/{idTravel}/travelreview:
 *  get:
 *    summary: get all travelreviews for a travel.
 *    tags:
 *      - travelreview
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
router.get("/", travelreviewController.findAll);

module.exports = router;
