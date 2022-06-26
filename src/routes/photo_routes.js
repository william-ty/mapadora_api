var express = require("express");
var router = express.Router({ mergeParams: true });
const { Photo } = require("../models/index");
const photo_ctrl = require("../controllers/photo_controller");
const photoController = new photo_ctrl(Photo);

const multer = require("multer");

// Define destination folder of photos
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/photo/");
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
 *      Photo:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *            point:
 *             allOf:
 *               - $ref : '#/components/schemas/Point'
 *            path:
 *              type: string
 *            is_in_album:
 *              type: boolean
 *            is_public:
 *              type: boolean
 */

/**
 * @swagger
 * /travel/{idTravel}/photo:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Store a photo in DB.
 *    tags:
 *      - photo
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *      - $ref: '#/parameters/idobject'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Photo'
 *    responses:
 *      "201":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.post("/", upload.array("images", 5), 
photoController.identify_client,
photoController.isParticipantOfTravel,
photoController.create);

/**
 * @swagger
 * /travel/{idTravel}/photo:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get all photos from DB.
 *    tags:
 *      - photo
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
router.get("/", 
photoController.identify_client,
photoController.isParticipantOfTravel,
photoController.findAll);

/**
 * @swagger
 * /travel/{idTravel}/photo/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update a photo in DB.
 *    tags:
 *      - photo
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *      - $ref: '#/parameters/idobject'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Photo'
 *    responses:
 *      "200":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.put("/:id", 
photoController.identify_client,
photoController.isParticipantOfTravel,
photoController.update);

/**
 * @swagger
 * /travel/{idTravel}/photo/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Delete a photo from DB.
 *    tags:
 *      - photo
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
router.delete("/:id", 
photoController.identify_client,
photoController.isParticipantOfTravel,
photoController.delete);

/**
 * @swagger
 * /travel/{idTravel}/photo/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get a photo from DB.
 *    tags:
 *      - photo
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
photoController.identify_client,
photoController.isParticipantOfTravel,
photoController.findOne);

module.exports = router;
