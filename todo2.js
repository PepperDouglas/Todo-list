const toDoList = document.querySelector('.appender');
const doneList = document.querySelector('.finished');
const sendButton = document.querySelector('#sendCard');
const stateButton = document.querySelector('.stateButton');
const retrieveButton = document.querySelector('.retBtn');
const cardTitle = document.querySelector('.title');
const cardDescription = document.querySelector('.description');
const dateReg = document.querySelector('.deadline');

/* eslint-disable no-unused-vars */
function removeCard(id) {
/* eslint-enable no-unused-vars */
  document.getElementById(`${id}`).remove();
}

function buildCard(cardObj) {
  let html = `<h2>${cardObj.title}</h2>`;
  html += `<p>${cardObj.description}</p>`;
  html += `<button id="${cardObj.title}" class="removeBtn" onclick="removeCard(this.id)">Remove</button>`;
  return html;
}

sendButton.addEventListener('click', () => {
  const cardObj = {
    date: dateReg.value,
    title: cardTitle.value,
    description: cardDescription.value,
    className: 'new',
    id: cardTitle.value,
  };
  const html = document.createElement('div');
  html.accessKey = cardObj.date;
  html.className = cardObj.className;
  html.id = cardObj.id;
  html.p = cardObj.description;
  html.innerHTML = buildCard(cardObj);

  dateReg.value = '';
  cardTitle.value = '';
  cardDescription.value = '';

  html.addEventListener('click', function listener() {
    html.className = 'done';
    doneList.appendChild(html);
    html.removeEventListener('click', listener, true);
  }, true);
  toDoList.appendChild(html);
});

stateButton.addEventListener('click', () => {
  const toSaveDo = document.querySelectorAll('.appender div');
  const toSaveDone = document.querySelectorAll('.finished div');
  const allArr = [];
  const doingArr = [];
  const doneArr = [];
  toSaveDo.forEach((n) => {
    const stateSave = {
      time: n.accessKey,
      title: n.id,
      description: n.p,
      type: 'new',
    };
    doingArr.push(stateSave);
  });
  toSaveDone.forEach((n) => {
    const stateSave = {
      time: n.accessKey,
      title: n.id,
      description: n.p,
      type: 'done',
    };
    doneArr.push(stateSave);
  });
  allArr.push(doingArr);
  allArr.push(doneArr);
  localStorage.setItem('allCards', JSON.stringify(allArr));
});

retrieveButton.addEventListener('click', () => {
  const storageTest = JSON.parse(localStorage.getItem('allCards'));
  storageTest[0].forEach((obj) => {
    const html = document.createElement('div');
    html.className = obj.type;
    html.accessKey = obj.time;
    html.id = obj.title;
    html.p = obj.description;
    html.innerHTML = buildCard(obj);
    toDoList.appendChild(html);
  });
  storageTest[1].forEach((obj) => {
    const html = document.createElement('div');
    html.className = obj.type;
    html.accessKey = obj.time;
    html.id = obj.title;
    html.p = obj.description;
    html.innerHTML = buildCard(obj);
    doneList.appendChild(html);
  });
  const updateState = document.querySelectorAll('.appender div');
  const d = new Date();
  updateState.forEach((n) => {
    if (n.accessKey < d.getHours()) {
      /* eslint-disable no-param-reassign */
      n.className = 'expired';
      /* eslint-enable no-param-reassign */
    }
    n.addEventListener('click', function loadListen() {
      /* eslint-disable no-param-reassign */
      n.className = 'done';
      /* eslint-enable no-param-reassign */
      doneList.appendChild(n);
      n.removeEventListener('click', loadListen, true);
    }, true);
  });
});
