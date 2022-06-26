var express = require("express");
const router = express.Router({ mergeParams: true });
const { Diary, Travel } = require("../models/index");
const diary_ctrl = require("../controllers/diary_controller");
const diaryController = new diary_ctrl(Diary);
const errorHandler = require("../utils/errors_middlewares");

/**
 * @swagger
 * parameters:
 *  idtravel:
 *     in: path
 *     name: idTravel
 *     type: integer
 *     required: true
 *     description: the ID of the travel
 *  idobject:
 *     in: path
 *     name: id
 *     type: integer
 *     required: true
 *     description: the ID of the object
 *  idstep:
 *     in: path
 *     name: idStep
 *     type: integer
 *     required: true
 *     description: the ID of the step containing the interestpoint
 *  idtag:
 *     in: path
 *     name: idTag
 *     type: integer
 *     required: true
 *     description: the ID of the tag to associate to the task
 *
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      Diary:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          content:
 *            type: string
 *            description: text from diary entry
 *          is_in_album:
 *            type: boolean
 *            description: set true if the diary is included in album
 *          id_travel:
 *            type: integer
 *            description: id of the associated travel
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    responses:
 *      UnauthorizedError:
 *        description: Access token is missing or invalid
 */

/**
 * @swagger
 * responses:
 *  SuccessCreation:
 *      description : Object successfully created
 *      schema:
 *        $ref: '#/components/schemas/Diary'
 *  Success:
 *      description: Operation done successfully
 *  NotAcceptable:
 *      description: The object is not valid, validation error, data constraints error, empty or invalid object fields
 *  BadRequest:
 *      description: Empty or incomplete object, missing url parameters, others.
 *
 */

/**
 * @swagger
 * /travel/{idTravel}/diary:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Store an entry in DB.
 *    tags:
 *      - diary
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Diary'
 *    responses:
 *      "201":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 *      "401":
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.post("/", [
  diaryController.identify_client,
  diaryController.isParticipantOfTravel,
  diaryController.create,
]);

/**
 * @swagger
 * /travel/{idTravel}/diary/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update an entry.
 *    tags:
 *      - diary
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Diary'
 *    responses:
 *      "200":
 *        $ref: '#/responses/Success'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.put("/:id", [
  diaryController.identify_client,
  diaryController.isParticipantOfTravel,
  diaryController.update,
]);

/**
 * @swagger
 * /travel/{idTravel}/diary/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    security:
 *      - bearerAuth: []
 *    summary: Delete an entry in DB.
 *    tags:
 *      - diary
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *      - $ref: '#/parameters/idobject'
 *    responses:
 *      "200":
 *        $ref: '#/responses/Success'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 *      "401":
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.delete("/:id", [
  diaryController.identify_client,
  diaryController.isAdminOfTravel,
  diaryController.delete,
]);

/**
 * @swagger
 * /travel/{idTravel}/diary/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get an entry from DB.
 *    tags:
 *      - diary
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *      - $ref: '#/parameters/idobject'
 *    responses:
 *      "200":
 *        $ref: '#/responses/Success'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 *      "401":
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/:id",
  diaryController.identify_client,
  diaryController.isParticipantOfTravel,
  diaryController.findOne);

/**
 * @swagger
 * /travel/{idTravel}/diary:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get all entries from BDD.
 *    tags:
 *      - diary
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *    responses:
 *      "200":
 *        $ref: '#/responses/Success'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 *      "401":
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/",
  diaryController.identify_client,
  diaryController.isParticipantOfTravel,
  diaryController.findAll);

module.exports = router;
