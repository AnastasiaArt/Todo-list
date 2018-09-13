var taskList = document.querySelector('ol');
var inputValue = document.getElementById('task-id');
var modal = document.getElementById('modal-id');
var inputEdit = document.getElementById('task-edit-id');
var saveButton = document.getElementById('save-id');

taskList.addEventListener('click', function (ev) {
  var target = ev.target;
  ev.preventDefault;
    if(target.classList.contains("done")) {
       target.parentNode.classList.toggle('checked');
      save();
    }else if(target.classList.contains("delete")) {
      var li = ev.target.parentNode;
      li.remove();
      save();
    }
    if(target.classList.contains("edit")) {
      var b=target.parentNode.querySelector('b');
      var taskIt = target.parentNode;
      modal.classList.add('modal-show');
      modal.classList.remove("modal-error");
      inputEdit.value = b.innerText;
      saveButton.addEventListener('click',function (ev) {
         if(inputEdit.value == "") {
           modal.classList.remove("modal-error");
           modal.offsetWidth = modal.offsetWidth;
           modal.classList.add("modal-error");
         } else {
          b.innerText = inputEdit.value;
          console.log(inputEdit.value);
           modal.classList.remove('modal-show');
        }
        save();
       document.getElementById('task-edit-id').value="";
      });
      save();
    }
},false);

inputValue.addEventListener("keydown", function (ev) {
  if (ev.keyCode === 13) {
    ev.preventDefault();
    addTodo();
  }
});
function save(){
  var task=[];
  for (var i = 0; i < taskList.children.length; i++) {
    task.push(taskList.children[i].getElementsByTagName('b')[0].innerText);
  }
  localStorage.setItem('task', JSON.stringify({taskList: task}));
}
var taskLocal=JSON.parse(localStorage.getItem('task'));
console.log(taskLocal);
if (taskLocal) {
for(var i=0; i<taskLocal.taskList.length;i++){
  var taskItem=addTodoList(taskLocal.taskList[i]);
  taskList.appendChild(taskItem);
}
}
function editTodo(b) {
    if(inputEdit.value == "") {
      modal.classList.remove("modal-error");
      modal.offsetWidth = modal.offsetWidth;
      modal.classList.add("modal-error");
     } else {
      b.innerText = inputEdit.value;
      console.log(inputEdit.value);
      modal.classList.remove('modal-show');

     }
     document.getElementById('task-edit-id').value="";
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
