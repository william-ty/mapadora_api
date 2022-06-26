var express = require("express");
const router = express.Router({ mergeParams: true });
const { Traveler } = require("../models/index")
const traveler_ctrl = require("../controllers/traveler_controller");
const travelerController = new traveler_ctrl(Traveler);

/**
 * @swagger
 * components:
 *    schemas:
 *      Traveler:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              required: true
 *            firstname:
 *              type: string
 *              required: true
 *            lastname:
 *              type: string
 *              required: true
 *            email:
 *              type: string
 *              required: true
 *            password:
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
 * /traveler/whoami:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Identifies a traveler.
 *    tags:
 *      - traveler
 *    responses:
 *      "200":
 *        description: Traveler returned successfully
 *        schema:
 *          type: string
 *      "400":
 *        description: "Invalid object"
 *      "404":
 *        description: "Requested Traveler not found"
 *      "401":
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/whoami',
  travelerController.identify_client,
  travelerController.whoami);

/**
 * @swagger
 * /traveler/signin:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Find a traveler and get token.
 *    tags:
 *      - traveler
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                required: true
 *              password:
 *                type: string
 *                required: true
 *    responses:
 *      "200":
 *        description: Traveler and token returned successfully. User signed in.
 *        schema:
 *          type: string
 *      "400":
 *        description: "Requested User not found || Wrong password"
 */
router.post('/signin', travelerController.signin);

/**
 * @swagger
 * /traveler/signup:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: (Register) Store a traveler in DB.
 *    tags:
 *      - traveler
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Traveler'
 *    responses:
 *      "200":
 *        description: Traveler created successfully
 *        schema:
 *          type: string
 *      "400":
 *        description: "Invalid object"
 */
router.post('/signup', travelerController.signup);

/**
* @swagger
* /traveler:
*  get:
*    security:
*      - bearerAuth: []
*    summary: Find invitations from other travelers
*    tags:
*      - traveler
*    responses:
*      "201":
*        description: Traveler returned successfully
*        schema:
*          type: string
*      "400":
*        description: "Invalid object"
*/
router.get('/invitations',
  travelerController.identify_client,
  travelerController.fetchInvitations);

/**
* @swagger
* /traveler:
*  get:
*    security:
*      - bearerAuth: []
*    summary: Find invitations from other travelers
*    tags:
*      - traveler
*    responses:
*      "201":
*        description: Traveler returned successfully
*        schema:
*          type: string
*      "400":
*        description: "Invalid object"
*/
router.get('/invitations/count',
  travelerController.identify_client,
  travelerController.fetchNumberOfInvitations);


/**
* @swagger
* /traveler:
*  get:
*    security:
*      - bearerAuth: []
*    summary: Accept or refuse invitation
*    tags:
*      - traveler
*    responses:
*      "201":
*        description: Traveler returned successfully
*        schema:
*          type: string
*      "400":
*        description: "Invalid object"
*/
router.post('/invitations',
  travelerController.identify_client,
  travelerController.dealWithInvitation);

/**
 * @swagger
 * /traveler:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Store a traveler in DB.
 *    tags:
 *      - traveler
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Traveler'
 *    responses:
 *      "200":
 *        description: Traveler created successfully
 *        schema:
 *          type: string
 *      "400":
 *        description: "Invalid object"
 */
router.post('/', travelerController.create);

/**
 * @swagger
 * /traveler/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update a traveler in DB.
 *    tags:
 *      - traveler
 *    parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the traveler to update
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Traveler'
 *    responses:
 *      "200":
 *        description: Traveler updated successfully
 *        schema:
 *          type: string
 *      "400":
 *        description: "Invalid object"
 */
router.put('/:id',
  travelerController.identify_client,
  travelerController.update);

/**
 * @swagger
 * /traveler/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Delete a traveler from DB.
 *    tags:
 *      - traveler
 *    parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the traveler to delete
 *    responses:
 *      "200":
 *        description: Traveler deleted successfully
 *        schema:
 *          type: string
 *      "400":
 *        description: "Traveler not found"
 */
router.delete('/:id', [travelerController.identify_client, travelerController.delete]);

/**
 * @swagger
 * /traveler/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get a traveler from DB.
 *    tags:
 *      - traveler
 *    parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the traveler to get
 *    responses:
 *      "200":
 *        description: Traveler returned successfully
 *        schema:
 *          type: string
 *      "400":
 *        description: "Traveler not found"
 */
router.get('/:id',
  travelerController.identify_client,
  travelerController.findOne);

/**
* @swagger
* /traveler:
*  get:
*    security:
*      - bearerAuth: []
*    summary: Find all travelers from DB
*    tags:
*      - traveler
*    responses:
*      "201":
*        description: Traveler returned successfully
*        schema:
*          type: string
*      "400":
*        description: "Invalid object"
*/
router.get('/',
  travelerController.identify_client,
  travelerController.findAll);


module.exports = router;
