var express = require("express");
const router = express.Router({ mergeParams: true });
const { Task } = require("../models/index");
const task_ctrl = require("../controllers/task_controller");
const taskController = new task_ctrl(Task);

/**
 *@swagger
 *components:
 *    schemas:
 *      Task:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *            description: name of task
 *          is_terminated:
 *            type: boolean
 *          id_element:
 *            type: integer
 *            description: id of the element linked to the task
 *          id_task_list:
 *            type: integer
 *            description: id of the list of tasks of the travel
 */

/**
 * @swagger
 * /travel/{idTravel}/task:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: store a task in BDD.
 *    tags:
 *      - task
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      "201":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.post("/", 
taskController.identify_client,
taskController.isParticipantOfTravel,
taskController.create);

/**
 * @swagger
 * /travel/{idTravel}/task/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: update an task.
 *    tags:
 *      - task
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *      - $ref: '#/parameters/idobject'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      "200":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.put("/:id", 
taskController.identify_client,
taskController.isParticipantOfTravel,
taskController.update);

/**
 * @swagger
 * /travel/{idTravel}/task/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: delete a task in BDD.
 *    tags:
 *      - task
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
taskController.identify_client,
taskController.isParticipantOfTravel,
taskController.delete);

/**
 * @swagger
 * /travel/{idTravel}/task/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get a task from BDD.
 *    tags:
 *      - task
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
taskController.identify_client,
taskController.isParticipantOfTravel,
taskController.findOne);

/**
 * @swagger
 * /travel/{idTravel}/task:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all tasks for a travel.
 *    tags:
 *      - task
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
router.get("/", 
taskController.identify_client,
taskController.isParticipantOfTravel,
taskController.findAllByTravelAndItinerary);

/**
 * @swagger
 * /travel/{idTravel}/task/{id}/tag/{idTag}:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: associate tag to task.
 *    tags:
 *      - task
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *      - $ref: '#/parameters/idobject'
 *      - $ref: '#/parameters/idtag'
 *    responses:
 *      "200":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.post("/:id/tag/:idTag", 
taskController.identify_client,
taskController.isParticipantOfTravel,
taskController.associateTagToTask);

/**
 * @swagger
 * /travel/{idTravel}/task/{id}/addtags:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: associate multiple tags to task.
 *    tags:
 *      - task
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
router.post("/:id/addtags", taskController.associateTagsToTask);

/**
 * @swagger
 * /travel/{idTravel}/task/{id}/removetag/{idTag}/:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: remove a tag from a task.
 *    tags:
 *      - task
 *    parameters:
 *      - $ref: '#/parameters/idtravel'
 *      - $ref: '#/parameters/idobject'
 *      - $ref: '#/parameters/idtag'
 *    responses:
 *      "200":
 *        $ref: '#/responses/SuccessCreation'
 *      "406":
 *        $ref: '#/responses/NotAcceptable'
 *      "400":
 *        $ref: '#/responses/BadRequest'
 */
router.post("/:id/removetag/:idTag", 
taskController.identify_client,
taskController.isParticipantOfTravel,
taskController.removeTagFromTask);

module.exports = router;
