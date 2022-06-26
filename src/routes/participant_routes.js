var express = require("express");
const router = express.Router({ mergeParams: true });
const { Participant, Traveler } = require("../models/index")
const participant_ctrl = require("../controllers/participant_controller");
const participantController = new participant_ctrl(Participant);
const traveler_ctrl = require("../controllers/traveler_controller");
const travelerController = new traveler_ctrl(Traveler);
/**
 * @swagger
 * components:
 *    schemas:
 *      Participant:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              required: true
 *            name:
 *              type: string
 *              required: true
 *            email:
 *              type: string
 *              required: true
 *            hasRefused:
 *              type: string
 *              required: true
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
 * /participant:
 *  post:
 *    summary: Store a participant in DB.
 *    tags:
 *      - participant
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/participant'
 *    responses:
 *      "200":
 *        description: participant created successfully
 *        schema:
 *          type: string
 *      "400":
 *        description: "Invalid object"
 */
router.post('/',
  participantController.identify_client,
  participantController.isAdminOfTravel,
  participantController.create,
  participantController.sendEmailInvitation
);



/**
 * @swagger
 * /participant/{id}:
 *  delete:
 *    summary: Delete a participant from DB.
 *    tags:
 *      - participant
 *    parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the participant to delete
 *    responses:
 *      "200":
 *        description: participant deleted successfully
 *        schema:
 *          type: string
 *      "400":
 *        description: "participant not found"
 */
router.delete('/:id', participantController.identify_client,
  participantController.isAdminOfTravel,
  participantController.delete);

/**
 * @swagger
 * /participant/{id}:
 *  get:
 *    summary: Get a participant from DB.
 *    tags:
 *      - participant
 *    parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the participant to get
 *    responses:
 *      "200":
 *        description: participant returned successfully
 *        schema:
 *          type: string
 *      "400":
 *        description: "participant not found"
 */
router.get('/:id',
  participantController.identify_client,
  participantController.isParticipantOfTravel,
  participantController.findOne);

/**
* @swagger
* /participant:
*  get:
*    summary: Find all travelers from DB
*    tags:
*      - participant
*    responses:
*      "201":
*        description: participant returned successfully
*        schema:
*          type: string
*      "400":
*        description: "Invalid object"
*/
router.get('/',
  participantController.identify_client,
  participantController.isParticipantOfTravel,
  participantController.fetchTravelParticipants);

module.exports = router;
