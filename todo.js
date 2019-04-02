let toDoList = document.querySelector('.appender');
let doneList = document.querySelector('.finished');
let sendButton = document.querySelector('#sendCard');
let stateButton = document.querySelector('.stateButton');
let retrieveButton = document.querySelector('.retBtn');
let cardTitle = document.querySelector('.title');
let cardDescription = document.querySelector('.description');
let dateReg = document.querySelector('.deadline');

function removeCard(id){
  document.getElementById(`${id}`).remove();
}

function buildCard(title, desc){
  let html = `<h2>${title}</h2>`;
  html += `<p>${desc}</p>`;
  html += `<button id="${title}" class="removeBtn" onclick="removeCard(this.id)">Remove</button>`;
  return html;
}

sendButton.addEventListener('click', () => {
  let checker = false;
  let idChecker = document.querySelectorAll('.appender div');
  idChecker.forEach((n) => {
    if (n.id === cardTitle.value){
      alert('Please use a unique title');
      checker = true;
    }
  });
  if (checker){
    return;
  }
  if (localStorage.getItem('todo') !== null){
    let storageCheck = localStorage.getItem('todo');
    let regex = /id="(\w+ ?)+"/g;
    let storage = storageCheck.match(regex);
    if (storage !== null){
      storage.forEach((e) => {
        let slice = e.slice(4, -1);
        if (slice === cardTitle.value){
          checker = true;
        }
      });

    }
  }
  if (checker){
    alert('Title exists in memory');
    return;
  }
  
  let date = dateReg.value;
  let title = cardTitle.value;
  let description = cardDescription.value;
  let html = document.createElement('div');
  html.accessKey = date; //WARNING
  html.className = 'new';
  html.id = cardTitle.value;
  dateReg.value = '';
  cardTitle.value = '';
  cardDescription.value = '';

  html.innerHTML = buildCard(title, description);

  html.addEventListener('click', function listener(){
    html.className = 'done';
    doneList.appendChild(html);
    html.removeEventListener('click', listener, true);
  }, true);
  toDoList.appendChild(html);
});

stateButton.addEventListener('click', () => {
  let toSaveDo = document.querySelectorAll('.appender div');
  let toSaveDone = document.querySelectorAll('.finished div');
  let todoHtml = '';
  let doneHtml = '';
  
  let stateArray = [];
  toSaveDo.forEach((n) => {
    let stateSave = {
      time: n.accessKey,
      title: n.id,
      description: n.p,
      type: 'new'
    };
    stateArray.push(stateSave);
    
    todoHtml += n.outerHTML;
  });
  toSaveDone.forEach((n) => {
    let stateSave = {
      time: n.accessKey,
      title: n.id,
      description: n.p,
      type: 'new'
    };
    stateArray.push(stateSave);
    doneHtml += n.outerHTML;
  });
  localStorage.setItem("todo", todoHtml);
  localStorage.setItem("done", doneHtml);
  localStorage.setItem('savedObj', stateArray);
})

retrieveButton.addEventListener('click', () => {
  document.querySelector('.appender').innerHTML = localStorage.getItem('todo');
  document.querySelector('.finished').innerHTML = localStorage.getItem('done');
  let updateState = document.querySelectorAll('.appender div');
  let d = new Date();
  updateState.forEach((n) => {
    if (n.accessKey < d.getHours()){
      n.className = "expired";
    }
    n.addEventListener('click', function loadListen(){
      n.className = "done";
      doneList.appendChild(n);
      n.removeEventListener('click', loadListen, true);
    }, true);
  });
})