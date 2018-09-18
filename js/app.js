var taskList = document.querySelector('ol');
var inputValue = document.getElementById('task-id');
var modal = document.getElementById('modal-id');
var inputEdit = document.getElementById('task-edit-id');
var saveButton = document.getElementById('save-id');

taskList.addEventListener('click', function (ev) {
  var target = ev.target;
  var li=ev.target.parentNode;
  var text=li.querySelector('b');
  ev.preventDefault;
    if(target.classList.contains("done")) {
      text.classList.toggle('checked');
      save();
      } else if(target.classList.contains("delete")) {
      li.remove();
      save();
     }
    if (target.classList.contains("edit")) {
       editTodo(target);

    }
},false);

inputValue.addEventListener("keydown", function (ev) {
  if (ev.keyCode === 13) {
    ev.preventDefault();
    addTodo();
  }
});
function save() {
  var task = [];
  for (var i = 0; i < taskList.children.length; i++) {
    var taskText=taskList.children[i].getElementsByTagName('b')[0].innerText;
    var check=taskList.children[i].getElementsByTagName('b')[0].className;
    task.push({id: taskText, check: check});
  }
  localStorage.setItem('task', JSON.stringify(task));
}
var taskLocal = JSON.parse(localStorage.getItem('task'));

if (taskLocal) {
  for (var key in taskLocal) {
    var taskItem= addTodoList(taskLocal[key].id);
    taskItem.querySelector('b').className=(taskLocal[key].check);
    taskList.appendChild(taskItem);
  }
}
function delInput() {
  var inputValue = document.getElementById('task-id');
  document.getElementById('task-id').value = "";
  inputValue.focus();
}
function addTodoList(taskText) {
  var taskList = document.querySelector('ol');
  var taskItem = document.createElement('li');
  var task = document.createElement('b');

  task.innerText = taskText;
  taskItem.appendChild(task);
  taskList.appendChild(taskItem);

  document.getElementById('task-id').value = "";
  var doneButton = document.createElement('button');
  doneButton.className = "done button";
  var editButton= document.createElement('button');
  editButton.className = "edit button";
  var deleteButton= document.createElement('button');
  deleteButton.className = "delete button";

  taskItem.appendChild(doneButton);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  inputValue.focus();

  return taskItem;
}
function addTodo() {
  if (inputValue.value) {
    var listItem = addTodoList(inputValue.value);
    taskList.appendChild(listItem);
    inputValue.value = "";
  } else {
    alert("Введите задачу!");
    inputValue.focus();
  }
  save();
}
function editTodo(editbtn) {
  var editButton = editbtn;
  var taskItem = editbtn.parentNode;
  var input = modal.querySelector('input');
  var text = taskItem.querySelector('b');

  modal.classList.add('modal-show');
  input.value = text.innerText;
  saveButton.onclick=function() {
    if (input.value) {
      text.innerText = input.value;
      save();
      modal.classList.remove('modal-show');
      document.getElementById('task-edit-id').value = "";
    } else {
      modal.classList.remove("modal-error");
      modal.offsetWidth = modal.offsetWidth;
      modal.classList.add("modal-error");
   }
  }
}
