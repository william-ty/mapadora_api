var express = require("express");
const router = express.Router({ mergeParams: true });
const { Travel } = require("../models/index");
const travel_ctrl = require("../controllers/travel_controller");
const { uidToAlbumTravelStatus } = require("../repository/travel_repository");
const travel_repository = require("../repository/travel_repository");
const travelController = new travel_ctrl(Travel);

/**
 *@swagger
 *components:
 *    schemas:
 *      Itinerary:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *            element_itinerary:
 *              allOf:
 *                - $ref : '#/components/schemas/Element'
 *      Travel:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *            commentary:
 *             type: string
 *            is_finished:
 *             type: boolean
 *            is_public:
 *             type: boolean
 */

/**
 * @swagger
 * /travel:
 *  post:
 *    summary: store a travel in BDD.
 *    tags:
 *      - travel
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Travel'
 *    responses:
 *      "201":
 *        $ref: '#/responses/Success'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.post("/travel", [
  travelController.identify_client,
  travelController.create,
]);

/**
 * @swagger
 * /travel:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: update a travel.
 *    tags:
 *      - travel
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *      - $ref: '#/parameters/idobject'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Travel'
 *    responses:
 *      "200":
 *        $ref: '#/responses/Success'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.put("/travel/:idTravel", [
  travelController.identify_client,
  travelController.isAdminOfTravel,
  travelController.update,
]);

/**
 * @swagger
 * /travel/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: delete a Travel in BDD.
 *    tags:
 *      - travel
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
 */
router.delete("/travel/:idTravel", [
  travelController.identify_client,
  // travelController.isAdminOfTravel,
  travelController.delete,
]);

/**
 * @swagger
 * /travel/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get a travel from BDD.
 *    tags:
 *      - travel
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
 */
router.get("/travel/:idTravel", travelController.findIfPublic, travelController.identify_client, travelController.findOne);

/**
 * @swagger
 * /travel:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: find all user travels from DB
 *    tags:
 *      - travel
 *    responses:
 *      "200":
 *        $ref: '#/responses/Success'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.get("/mytravels",
  travelController.identify_client,
  travelController.findAllByUser,
);

/**
 * @swagger
 * /travel:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: find all user travels from DB
 *    tags:
 *      - travel
 *    responses:
 *      "200":
 *        $ref: '#/responses/Success'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.get("/travel/:idTravel/admin",
  travelController.identify_client,
  travelController.isParticipantOfTravel,
  travelController.getTravelAdmin,
);

router.get("/travel/:idTravel/isAuthorized",
  travelController.identify_client,
  travelController.isAuthorized,
);

/**
 * @swagger
 * /travel:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: find all public travels from DB
 *    tags:
 *      - travel
 *    responses:
 *      "200":
 *        $ref: '#/responses/Success'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.get("/publictravels", travelController.findAllPublicTravels);

// /**
// * @swagger
// * /travel:
// *  get:
// *    summary: find all travels from DB
// *    tags:
// *      - travel
// *    responses:
// *      "200":
// *        $ref: '#/responses/Success'
// *      "406":
// *        $ref: '#/responses/NotAcceptable'
// *      "400":
// *        $ref: '#/responses/BadRequest'
// */
// router.get('/travels', travelController.findAll)

router.post("/travel/:idTravel/clone",
  travelController.identify_client,
  travelController.cloneTravel,
);

router.get(
  "/travel/getAlbumStatus/:pathUid",
  travel_repository.uidToAlbumTravelStatus
);

module.exports = router;
