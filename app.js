function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function getDaysInMonth() {
  let date = new Date();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let days = daysInMonth(month, year);
  console.log(days);
  return days;
}

function populateList() {
  let mainContainer = document.getElementById("main_container");
  let listItem = document.getElementById("list_item");
  let i = 0;

  while (i < getDaysInMonth()) {
    var clonedLitem = listItem.cloneNode(true);

    clonedLitem.removeAttribute("id");

    mainContainer.appendChild(clonedLitem);
    i++;
  }
  listItem.remove();
}
populateList();

function togglePopup() {
  let DataPopup = document.getElementById("popup");
  if (DataPopup.style.display === "none") {
    DataPopup.style.display = "flex";
  } else {
    DataPopup.style.display = "none";
  }
}
