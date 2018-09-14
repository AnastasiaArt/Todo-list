var taskList = document.querySelector('ol');
var inputValue = document.getElementById('task-id');
var modal = document.getElementById('modal-id');
var inputEdit = document.getElementById('task-edit-id');
var saveButton = document.getElementById('save-id');

taskList.addEventListener('click', function (ev) {
  var target = ev.target;
  ev.preventDefault;
    if(target.classList.contains("done")) {
      if (target.parentNode.classList.contains("checked")) {
        target.parentNode.classList.remove("checked");
      } else {
        target.parentNode.classList.add("checked");
      }
      save();
    } else if(target.classList.contains("delete")) {
      var li = ev.target.parentNode;
      li.remove();
      save();
     }
    if (target.classList.contains("edit")) {
       target.onclick = editTodo;
    }
},false);

inputValue.addEventListener("keydown", function (ev) {
  if (ev.keyCode === 13) {
    ev.preventDefault();
    addTodo();
  }
});
function save(){
  var task = [];
  var check =[];
  for (var i = 0; i < taskList.children.length; i++) {
    task.push(taskList.children[i].getElementsByTagName('b')[0].innerText);
    }
  for (var i = 0; i < taskList.children.length; i++) {
    check.push(taskList.children[i].className);
    }
  localStorage.setItem('class', JSON.stringify({taskList: check}));
  localStorage.setItem('task', JSON.stringify({taskList: task}));
}
var checkLocal = JSON.parse(localStorage.getItem('class'));
var taskLocal = JSON.parse(localStorage.getItem('task'));

if (taskLocal) {
  for(var i = 0; i<taskLocal.taskList.length;i++){
    var taskItem = addTodoList(taskLocal.taskList[i]);
    taskList.appendChild(taskItem);
    console.log(taskItem);
}
//
// if (checkLocal) {
//   for(var i = 0; i<checkLocal.taskList.length;i++){
//       //checkLocal.taskList[i].className;
//         console.log(checkLocal.taskList[i].className);
//     }
//
// }
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
  save();
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
function editTodo() {
  var editButton = this;
  var taskItem = this.parentNode;
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
