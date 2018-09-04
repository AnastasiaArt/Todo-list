var taskList=document.querySelector('ul');
function addTodo() {
  var taskItem = document.createElement('li');
  var inputValue = document.getElementById('task-id').value;
  var task = document.createTextNode(inputValue);
  taskItem.appendChild(task);
  if(inputValue == "") {
      alert("Введите задачу!");
   } else {
      taskList.appendChild(taskItem);
   }
  document.getElementById('task-id').value = "";
  var doneButton= document.createElement('button');
  doneButton.className = "done button";
  var editButton= document.createElement('button');
  editButton.className = "edit button";
  var deleteButton= document.createElement('button');
  deleteButton.className = "delete button";
  taskItem.appendChild(doneButton);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
}
