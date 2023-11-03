let itemId;
let localReps = 0;
let localSets = 0;
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function getDaysInMonth() {
  let date = new Date();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let days = daysInMonth(month, year);
  return days + 1;
}

function togglePopup() {
  let popupshade = document.getElementById("popup");
  let popupContainer = document.getElementById("popup_container");

  if (popupContainer.style.display === "none") {
    popupContainer.style.display = "block";
    popupshade.style.backgroundColor = "rgba(0,0,0,0.350)";
    popupshade.style.display = "flex";
  } else {
    popupContainer.style.display = "none";
    popupshade.style.backgroundColor = "rgba(0,0,0,0)";
    popupshade.style.display = "none";
  }
}

function makeListItemId(currentDay) {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();
  let monthName = month[date.getMonth()];
  return "" + monthName + " " + currentDay;
}

function setSplitContent(mainContainer) {
  let listItems = mainContainer.querySelectorAll("div.list_item");
  let setvar = 0;

  for (var i = 0; i < listItems.length; i++) {
    let currentListItem = listItems[i];
    let dayInfo = currentListItem.querySelector(".day_info");

    switch (setvar) {
      case 0:
        dayInfo.textContent = "push";
        setvar = 1;
        break;
      case 1:
        dayInfo.textContent = "pull";
        setvar = 2;
        break;
      case 2:
        dayInfo.textContent = "leg";
        setvar = 3;
        break;
      case 3:
        dayInfo.textContent = "rest";
        setvar = 0;
        break;
    }
  }
}

function setDateComplInfo(main_container) {
  let date = new Date();
  let year = date.getFullYear();
  let listItem = main_container.querySelectorAll("div.list_item");

  for (var i = 0; i < listItem.length; i++) {
    let currentListItem = listItem[i];
    let date_info = currentListItem.querySelector(".date_info");
    let dateI = date_info.querySelector("#date");
    let status = date_info.querySelector("#status");

    let dateinfoDate = year + " " + currentListItem.id;
    dateI.textContent = dateinfoDate;
    status.textContent = "incompleat";
  }
}

function addEventlists(main_container) {
  let listItem = main_container.querySelectorAll("div.list_item");
  for (var i = 0; i < listItem.length; i++) {
    let currentListItem = listItem[i];
    let currListItemId = currentListItem.id;
    document
      .getElementById(currListItemId)
      .addEventListener("click", function getIdOfListItem() {
        togglePopup();
        itemId = currListItemId;
        setPopupHeader();
      });
  }
}

function populateList() {
  let mainContainer = document.getElementById("main_container");
  let listItem = document.getElementById("list_item");

  for (var i = 1; i < getDaysInMonth(); i++) {
    var clonedLitem = listItem.cloneNode(true);
    mainContainer.appendChild(clonedLitem);
    let listId = makeListItemId(i);
    clonedLitem.id = listId;
  }

  listItem.parentNode.removeChild(listItem);
  setSplitContent(mainContainer);
  setDateComplInfo(mainContainer);
  addEventlists(mainContainer);
  togglePopup();
}
function inputReps(reps) {
  let listItem = document.getElementById(itemId);
  let repSetCont = listItem.querySelector(".rep_set_info");
  let repsCont = repSetCont.querySelector("#repCont");
  repsCont.textContent = reps;
  togglePopup();
}
function setPopupHeader() {
  let popupHeader = document.querySelector(".popup_info_header");
  let date = new Date();
  let year = date.getFullYear();
  popupHeader.innerHTML = year + " " + itemId;
}
function zeroOut() {
  let listItem = document.getElementById(itemId);
  let repSetCont = listItem.querySelector(".rep_set_info");
  let repsCont = repSetCont.querySelector("#repCont");
  let setsCont = repSetCont.querySelector("#setCont");
  repsCont.innerHTML = 0;
  setsCont.innerHTML = 0;
  localReps = 0;
  localSets = 0;
  togglePopup();
}
function decincReps(incdec) {
  let repIndicator = document.querySelector("#reps_indicator");
  if (incdec == true) {
    localReps++;
  } else {
    localReps--;
  }
  repIndicator.innerHTML = "reps " + localReps;
}
function decincSets(incdec) {
  let setIndicator = document.querySelector("#sets_indicator");
  if (incdec == true) {
    localSets++;
  } else {
    localSets--;
  }
  setIndicator.innerHTML = "sets " + localSets;
}
// localReps the localstorage valu
//localSets are the localstorage value
populateList();
