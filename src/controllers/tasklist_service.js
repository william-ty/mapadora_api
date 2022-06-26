module.exports = {
  isTaskListCorrect: async (taskList) => {
    const ctrl_is_defined = taskList.name !== undefined && typeof (taskList.name) == 'string';
    // if(ctrl_is_defined){
    //     const ctrl_nb_of_points =  await  taskList_repository.existPoint(lat,lng);
    //     return  ctrl_nb_of_points === 0
    // }
    // else{
    //     return false;
    // }
  }
}