let inputs = {
  input9: "",
  input10: "",
  input11: "",
  input12: "",
  input13: "",
  input14: "",
  input15: "",
  input16: "",
  input17: "",
};

let hourStart = 9;
let hourEnd = 18;
let currentHr = parseInt(dayjs().format("HH"));
let interval = setInterval(() => {
  let day = dayjs().format("MMMM DD YYYY");
  let time = dayjs().format("hh:mm:ss a");
  $(".paragraph").text(`${day} ${time}`);
}, 1000);

$(".jumbotron").append($("<p>").addClass("paragraph"));
for (let i = hourStart; i < hourEnd; i++) {
  $(".container").append(
    $("<div>")
      .addClass("display-time row")
      .append(
        $("<h2>")
          .text(`${i < 13 ? i + "AM" : i - 12 + "PM"}`)
          .addClass("time-block hour")
          .attr("value", i),
        $("<textarea>")
          .addClass("input")
          .attr("data-value", `${i < 13 ? i : i - 12}`)
          .attr("id", i),
        $("<button>")
          .addClass("saveBtn")
          .append($("<i>"))
          .addClass("fa-solid fa-3x fa-floppy-disk"),
        $("<button>")
          .addClass("clearBtn")
          .append($("<i>"))
          .addClass("fa-solid fa-3x fa-delete-left")
      )
  );
}

// Event Listeners
$(".saveBtn").click((e) => {
  if ($(e.target).parent().children("textarea").attr("disabled")) {
    $(e.target).parent().children("textarea").removeAttr("disabled").focus();
    $(e.target)
      .parent()
      .children(".saveBtn")
      .removeClass("fa-pen-to-square")
      .addClass("fa-floppy-disk");
  } else {
    $(e.target).parent().children("textarea").attr("disabled", "");
    $(e.target)
      .parent()
      .children(".saveBtn")
      .removeClass("fa-floppy-disk")
      .addClass("fa-pen-to-square");
  }

  let index = `input${parseInt(
    $(e.target).parent().children("textarea").attr("id")
  )}`;
  inputs[index] = $(e.target).parent().children("textarea")[0].value;
  localStorage.setItem("inputs", JSON.stringify(inputs));
});

$(".clearBtn").click((e) => {
  $(e.target).parent().children("textarea")[0].value = "";
  let index = `input${parseInt(
    $(e.target).parent().children("textarea").attr("id")
  )}`;
  inputs[index] = $(e.target).parent().children("textarea")[0].value;
  localStorage.setItem("inputs", JSON.stringify(inputs));
});

$(".input").each(function () {
  if (parseInt($(this).attr("id")) < currentHr) {
    $(this).addClass("past");
  } else if (parseInt($(this).attr("id")) == currentHr) {
    $(this).addClass("present");
  } else if (parseInt($(this).attr("id")) > currentHr) {
    $(this).addClass("future");
  }
});

// Pulling Data from Local Storage
$(document).ready(function () {
  let inputsLocalSt = JSON.parse(localStorage.getItem("inputs"));
  for (let i = hourStart; i < hourEnd; i++) {
    $(`#${i}`).text(inputsLocalSt[`input${i}`]);
  }
});
