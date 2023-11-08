let itemId;
let setsInc = 0;
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
  zeroOutPop();
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
        dayInfo.textContent = "Push";
        setvar = 1;
        break;
      case 1:
        dayInfo.textContent = "Pull";
        setvar = 2;
        break;
      case 2:
        dayInfo.textContent = "Legs";
        setvar = 3;
        break;
      case 3:
        dayInfo.textContent = "Rest";
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
      .addEventListener("click", function () {
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
  loadSavedData(mainContainer);
  addClickInc();
}
function inputReps(reps) {
  let listItem = document.getElementById(itemId);
  let repSetCont = listItem.querySelector(".rep_set_info");
  let repsCont = repSetCont.querySelector("#repCont");
  repsCont.textContent = reps;
  incSets();
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

function submitValue() {
  let listItem = document.getElementById(itemId);
  let repSetCont = listItem.querySelector(".rep_set_info");
  let repsCont = repSetCont.querySelector("#repCont");
  let setsCont = repSetCont.querySelector("#setCont");
  repsCont.innerHTML = localReps;
  setsCont.innerHTML = localSets;
  togglePopup();
}
function zeroOutPop() {
  let setIndicator = document.querySelector("#sets_indicator");
  let repIndicator = document.querySelector("#reps_indicator");
  setIndicator.innerHTML = "sets " + 0;
  repIndicator.innerHTML = "reps " + 0;
  localReps = 0;
  localSets = 0;
}
function incSets() {
  let currSets = document.getElementById(itemId);
  let repSet = currSets.querySelector(".rep_set_info");
  let sets = repSet.querySelector(".sets");
  let setCont = sets.querySelector("#setCont");
  let setContVal = parseInt(setCont.textContent);
  setContVal++;
  setCont.textContent = setContVal;
}
function saveAppData() {
  let maincontainer = document.getElementById("main_container");
  let listItems = maincontainer.querySelectorAll("div.list_item");

  for (let i = 0; i < listItems.length; i++) {
    let currentListItem = listItems[i];
    let currListItemid = currentListItem.id;
    let itembyid = document.getElementById(currListItemid);
    let repsetinfo = itembyid.querySelector(".rep_set_info");
    let reps = repsetinfo.querySelector("#repCont");
    let sets = repsetinfo.querySelector("#setCont");

    let repKeyVal = currListItemid + "_rep";
    let setKeyVal = currListItemid + "_set";
    let CLIReps = reps.textContent;
    let CLISets = sets.textContent;

    localStorage.setItem(repKeyVal, CLIReps);
    localStorage.setItem(setKeyVal, CLISets);
  }
}
function loadSavedData(maincontainer) {
  let listItems = maincontainer.querySelectorAll("div.list_item");

  for (let i = 0; i < listItems.length; i++) {
    let currentListItem = listItems[i];
    let currListItemid = currentListItem.id;
    let itembyid = document.getElementById(currListItemid);
    let repsetinfo = itembyid.querySelector(".rep_set_info");
    let reps = repsetinfo.querySelector("#repCont");
    let sets = repsetinfo.querySelector("#setCont");

    let repKeyVal = currListItemid + "_rep";
    let setKeyVal = currListItemid + "_set";

    let CLIReps = localStorage.getItem(repKeyVal);
    let CLISets = localStorage.getItem(setKeyVal);
    if (CLIReps == null) {
      reps.textContent = 0;
    } else {
      reps.textContent = CLIReps;
    }
    if (CLISets == null) {
      reps.textContent = 0;
    } else {
      sets.textContent = CLISets;
    }
  }
  setStatus(maincontainer);
}
function setStatus(maincontainer) {
  let listItems = maincontainer.querySelectorAll("div.list_item");

  for (let i = 0; i < listItems.length; i++) {
    let currentListItem = listItems[i];
    let currListItemid = currentListItem.id;
    let itembyid = document.getElementById(currListItemid);
    let repsetinfo = itembyid.querySelector(".rep_set_info");
    let reps = repsetinfo.querySelector("#repCont");
    let sets = repsetinfo.querySelector("#setCont");
    let dateInfo = itembyid.querySelector(".date_info");
    let status = dateInfo.querySelector("#status");
    if (reps.textContent != "0" && sets.textContent != "0") {
      status.textContent = "compleat";
    } else {
      status.textContent = "incompleat";
    }
  }
}
function addClickInc() {
  let setArrowInc = document.querySelector("#setArrow_inc");
  let setArrowDec = document.querySelector("#setArrow_dec");
  let repArrowInc = document.querySelector("#repArrow_inc");
  let repArrowDec = document.querySelector("#repArrow_dec");
  let closeIcon = document.querySelector(".closeIcon");

  closeIcon.addEventListener("click", function () {
    togglePopup();
    console.log("popup closed");
  });

  setArrowInc.addEventListener("click", function () {
    decincSets(true);
  });
  setArrowDec.addEventListener("click", function () {
    decincSets(false);
  });
  repArrowInc.addEventListener("click", function () {
    decincReps(true);
  });
  repArrowDec.addEventListener("click", function () {
    decincReps(false);
  });
  console.log("event added");
}
populateList();
setInterval(() => {
  saveAppData();
  console.log("data saved");
}, 20000);
