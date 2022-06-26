// var express = require("express");
// const router = express.Router({ mergeParams: true });
// const { TaskList } = require("../models/index")
// const tasklist_controller = require("../controllers/tasklist_controller");
// const tasklistController = new tasklist_controller(TaskList);


// /**
// *@swagger
// *components:
// *    schemas:
// *      TaskList:
// *        type: object
// *        properties:
// *          id:
// *            type: integer
// *          name:
// *            type: string
// *            description: name of tasklist
// */


// /**
//  * @swagger
//  * /tasklist:
//  *  post:
//  *    summary: store a tasklist in BDD.
//  *    tags:
//  *      - tasklist
//  *    requestBody:
//  *      content:
//  *        application/json:
//  *          schema: 
//  *            $ref: '#/components/schemas/TaskList'        
//  *    responses:
//  *      "201":
//  *        $ref: '#/responses/SuccessCreation'
//  *      "406":
//  *        $ref: '#/responses/NotAcceptable'
//  *      "400":
//  *        $ref: '#/responses/BadRequest'
//  */
// router.post('/', tasklistController.create)

// /**
// * @swagger
// * /tasklist:
// *  put:
// *    summary: update a tasklist.
// *    tags:
// *      - tasklist
// *    requestBody:
// *      content:
// *        application/json:
// *          schema: 
// *            $ref: '#/components/schemas/TaskList'        
// *    responses:
// *      "201":
// *        $ref: '#/responses/SuccessCreation'
// *      "406":
// *        $ref: '#/responses/NotAcceptable'
// *      "400":
// *        $ref: '#/responses/BadRequest'
// */
// router.put('/:id', tasklistController.update)


// /**
// * @swagger
// * /tasklist/{id}:
// *  delete:
// *    summary: delete a tasklist in BDD.
// *    tags: 
// *      - tasklist
// *    parameters:
// *         - in: path
// *           name: id
// *           schema:
// *             type: integer
// *           required: true
// *           description: Numeric ID of the TaskList to delete 
// *    responses:
// *      "200":
// *        $ref: '#/responses/SuccessCreation'
// *      "406":
// *        $ref: '#/responses/NotAcceptable'
// *      "400":
// *        $ref: '#/responses/BadRequest'
// */
// router.delete('/:id', tasklistController.delete)

// /**
// * @swagger
// * /tasklist/{id}:
// *  get:
// *    summary: get a tasklist from BDD.
// *    tags: 
// *      - tasklist
// *    parameters:
// *         - in: path
// *           name: id
// *           schema:
// *             type: integer
// *           required: true
// *           description: Numeric ID of the tasklist to get 
// *    responses:
// *      "200":
// *        $ref: '#/responses/SuccessCreation'
// *      "406":
// *        $ref: '#/responses/NotAcceptable'
// *      "400":
// *        $ref: '#/responses/BadRequest'
// */
// router.get('/:id', tasklistController.findOne)

// module.exports = router;
