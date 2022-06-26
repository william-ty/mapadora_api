const tasklist = require("../models/tasklist");

let afterCreateTaskListTag = async (sequelize, instance) => {
  const element = await sequelize.models.Element.findOne({
    where: {
      id: instance.id_element
    }
  });
  console.log("element")
  console.log(JSON.stringify(element))
  const itinerary = await sequelize.models.Itinerary.findOne({
    include: [{
      model: sequelize.models.Element, required: true, as: "element_itinerary",
      where: {
        id_travel: element.id_travel
      }
    }]
  });
  console.log("itinerary")
  console.log(JSON.stringify(itinerary))
  const taskList = await sequelize.models.TaskList.findOne({
    where: {
      id_itinerary: itinerary.id
    }
  });
  console.log("taskList")
  console.log(JSON.stringify(taskList))
  if (taskList) {
    const taskListId = taskList.id

    await sequelize.models.TaskListTag.create({
      name: element.name,
      id_task_list: taskListId
    });
  }
}

module.exports = { afterCreateTaskListTag }