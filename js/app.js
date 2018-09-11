var taskList = document.querySelector('ol');

taskList.addEventListener('click', function (ev) {
  var target = ev.target;
    if(target.classList.contains("done")) {
       target.parentNode.classList.toggle('checked');
      save();
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
console.log(taskList);
for(var i=0; i<taskLocal.taskList.length;i++){

  var taskItem=addTodo(taskLocal.taskList[i]);

  console.log(taskItem);
}
function deleteTodo() {
  var taskItem = this.parentNode;
  var taskList = taskItem.parentNode;

  taskList.removeChild(taskItem);
  save();
}
function editTodo(){
  var modal = document.getElementById('modal-id');
  var taskItem = this.parentNode;
  var saveButton = document.getElementById('save-id');
  var inputValue = taskItem.querySelector('b');
  var inputEdit = document.getElementById('task-edit-id');

  modal.classList.add('modal-show');
  modal.classList.remove("modal-error");
  inputEdit.value = inputValue.innerText;
  saveButton.addEventListener('click', function () {
    if(inputEdit.value == "") {
      modal.classList.remove("modal-error");
      modal.offsetWidth = modal.offsetWidth;
      modal.classList.add("modal-error");
     } else {
        inputValue.innerText = inputEdit.value;
        modal.classList.remove('modal-show');
        save();
     }
  });

}
function delInput() {
  var inputValue = document.getElementById('task-id');

  document.getElementById('task-id').value = "";
  inputValue.focus();
}
function addTodo(text) {
  var taskList = document.querySelector('ol');
  var taskItem = document.createElement('li');
  var inputValue = document.getElementById('task-id');
  var task = document.createElement('b');

  task.innerText = inputValue.value;
  taskItem.appendChild(task);

  // if(inputValue.value == "") {
  //   alert("Введите задачу!");
  //   inputValue.focus();
  //  } else {
      taskList.appendChild(taskItem);
   // }
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
  deleteButton.addEventListener('click',deleteTodo);
  editButton.addEventListener('click',editTodo);
  inputValue.focus();
  save();
  // return taskItem;
}
