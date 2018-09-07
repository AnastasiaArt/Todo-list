function deleteTodo() {
  var taskItem = this.parentNode;
  var taskList = taskItem.parentNode;

  taskList.removeChild(taskItem);
}
function doneTodo(){
  var taskItem = this.parentNode;
  var taskList = taskItem.parentNode;

  taskList.classList.toggle('checked');
}
function editTodo(){
  var modal = document.getElementById('modal-id');
  var taskItem = this.parentNode;
  var saveButton = document.getElementById('save-id');
  var inputValue = taskItem.querySelector('b');
  var inputEdit = document.getElementById('task-edit-id');

  modal.classList.add('modal-show');
  modal.classList.remove("modal-error");
  inputEdit.value=inputValue.innerText;
  saveButton.addEventListener('click', function () {
    if(inputEdit.value == "") {
      modal.classList.remove("modal-error");
      modal.offsetWidth = modal.offsetWidth;
      modal.classList.add("modal-error");
     } else {
        inputValue.innerText=inputEdit.value;
        modal.classList.remove('modal-show');
     }
  });
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
  editButton.addEventListener('click',editTodo);

  inputValue.focus();
}
