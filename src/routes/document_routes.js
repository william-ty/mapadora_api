var express = require("express");
const router = express.Router({ mergeParams: true });
const { Document, Element } = require("../models/index");
const document_ctrl = require("../controllers/document_controller");
const documentController = new document_ctrl(Document);
const multer = require("multer");

// Define destination folder of photos
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/document/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
var upload = multer({ storage: storage });

/**
 *@swagger
 *components:
 *    schemas:
 *      Document:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              required: true
 *            path:
 *              type: string
 *              description: path of the file
 *            name:
 *              type: string
 *              description: name of the file
 *            id_element:
 *              type: integer
 *              required: true
 *              description: id of the element which is associated to the document. It can be an interest point, a step, a trip, or the itinerary.
 */

/**
 * @swagger
 * /travel/{idTravel}/document:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Store an entry in DB.
 *    tags:
 *      - document
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              file:
 *                type: string
 *                format: binary
 *              id_element:
 *                type: integer
 *                description: id of the element which is associated to the document. It can be an interest point, a step, a trip, or the itinerary.
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    responses:
 *     "201":
 *       $ref: '#/responses/SuccessCreation'
 *     "406":
 *       $ref: '#/responses/NotAcceptable'
 *     "400":
 *       $ref: '#/responses/BadRequest'
 *     "401":
 *       $ref: '#/components/responses/UnauthorizedError'
 */
router.post("/", upload.single("document", 1), 
documentController.identify_client, 
documentController.isParticipantOfTravel,
  documentController.create);

/**
 * @swagger
 * /travel/{idTravel}/document/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update a document.
 *    tags:
 *      - document
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *      - $ref: '#/parameters/idobject'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Document'
 *    responses:
 *      "200":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 *      "401":
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.put("/:id", 
documentController.identify_client, 
documentController.isParticipantOfTravel,
  documentController.update);

/**
 * @swagger
 * /travel/{idTravel}/document/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Delete a document in DB.
 *    tags:
 *      - document
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
 *      "401":
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.delete("/:id", 
documentController.identify_client, 
documentController.isParticipantOfTravel,
  documentController.delete);

/**
 * @swagger
 * /travel/{idTravel}/document/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get a document from DB.
 *    tags:
 *      - document
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
 *      "401":
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/:id", 
documentController.identify_client,
  documentController.isParticipantOfTravel,
  documentController.findOne);

/**
 * @swagger
 * /travel/{idTravel}/document:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get all documents from DB.
 *    tags:
 *      - document
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *    responses:
 *      "200":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 *      "401":
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/", 
documentController.identify_client,
documentController.isParticipantOfTravel,
documentController.findAll);

module.exports = router;
