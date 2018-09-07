function deleteTodo() {
  var taskItem = this.parentNode;
  var taskList = taskItem.parentNode;

  taskList.removeChild(taskItem);

}
function doneTodo(){
  var taskItem = this.parentNode;
  var taskList = taskItem.parentNode;
  taskList.classList.add('checked');
}
function delInput() {
  var inputValue = document.getElementById('task-id');
  document.getElementById('task-id').value = "";
  inputValue.focus();
}
function addTodo() {
  var taskList = document.querySelector('ol');
  var taskItem = document.createElement('li');
  var inputValue = document.getElementById('task-id');
  var task = document.createElement('b');
  task.innerText = inputValue.value;
  taskItem.appendChild(task);
  if(inputValue.value == "") {
      alert("Введите задачу!");
      inputValue.focus();
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

  deleteButton.addEventListener('click',deleteTodo);
  doneButton.addEventListener('click',doneTodo);

  inputValue.focus();
}
