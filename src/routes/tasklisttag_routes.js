var express = require("express");
const router = express.Router({ mergeParams: true });
const { TaskListTag } = require("../models/index")
const tasklisttag_controller = require("../controllers/tasklisttag_controller");
const tasklisttagController = new tasklisttag_controller(TaskListTag);


/**
*@swagger
*components:
*    schemas:
*      TaskListTag:
*        type: object
*        properties:
*          id:
*            type: integer
*          name:
*            type: string
*            description: name of tasklisttag
*/


/**
 * @swagger
 * /travel/{idTravel}/tasklisttag:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: store a tasklisttag in BDD.
 *    tags:
 *      - tasklisttag
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema: 
 *            $ref: '#/components/schemas/TaskListTag'        
 *    responses:
 *      "201":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.post('/', 
tasklisttagController.identify_client,
tasklisttagController.isParticipantOfTravel,
tasklisttagController.create)

/**
* @swagger
* /travel/{idTravel}/tasklisttag:
*  put:
*    security:
*      - bearerAuth: []
*    summary: update a tasklisttag.
*    tags:
*      - tasklisttag
*    parameters:
*      - $ref: '#/parameters/idtravel'
*    requestBody:
*      content:
*        application/json:
*          schema: 
*            $ref: '#/components/schemas/TaskListTag'        
 *    responses:
 *      "200":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
*/
router.put('/:id', 
tasklisttagController.identify_client,
tasklisttagController.isParticipantOfTravel,
tasklisttagController.update)


/**
* @swagger
* /travel/{idTravel}/tasklisttag/{id}:
*  delete:
*    security:
*      - bearerAuth: []
*    summary: delete a tasklisttag in BDD.
*    tags: 
*      - tasklisttag
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
router.delete('/:id', 
tasklisttagController.identify_client,
tasklisttagController.isParticipantOfTravel,
tasklisttagController.delete)

/**
* @swagger
* /travel/{idTravel}/tasklisttag/{id}:
*  get:
*    security:
*      - bearerAuth: []
*    summary: get a tasklisttag from BDD.
*    tags: 
*      - tasklisttag
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
router.get('/:id', 
tasklisttagController.identify_client,
tasklisttagController.isParticipantOfTravel,
tasklisttagController.findOne)

/**
* @swagger
* /travel/{idTravel}/tasklisttag/{id}:
*  get:
*    security:
*      - bearerAuth: []
*    summary: get a tasklisttag from BDD.
*    tags: 
*      - tasklisttag
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
router.get('/', 
tasklisttagController.identify_client,
tasklisttagController.isParticipantOfTravel,
tasklisttagController.findAllByTravelAndItinerary)

module.exports = router;
