var makenew = document.querySelector("#newbtn");
var close = document.querySelector("#clbtn");
var newrem = document.querySelector("#newrem");
var box = document.querySelector(".box");
var make = document.querySelector("#make");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const cards = document.querySelector(".cards");
var files = document.querySelector(".files");

if (localStorage.getItem("tasks") === null) {
  localStorage.setItem("tasks", JSON.stringify([]));
}

makenew.addEventListener("click", function () {
  newrem.classList.remove("hidden");
  box.classList.add("hidden");
  cards.classList.add("hidden");
});

close.addEventListener("click", function () {
  newrem.classList.add("hidden");
  box.classList.remove("hidden");
  cards.classList.remove("hidden");
  const presentTasks = localStorage.getItem("tasks");

  const arrayTasks = JSON.parse(presentTasks);

  if (arrayTasks.length > 0) {
    box.classList.add("hidden");
  }
});

function printer() {
  const allTasks = localStorage.getItem("tasks");

  const parsedTask = JSON.parse(allTasks);

  var clutter = "";

  parsedTask.forEach(function (elem, index) {
    if (elem.title && elem.detail) {
      clutter += ` <div
    class="card w-[235px] h-[185px] rounded-md bg-zinc-600 p-2 flex flex-col gap-2"
    id="task-${index}"
  >
    <h1 class="text-white font-bold text-2xl">
      ${elem.title}
    </h1>
    <p class="text-white font-light tracking-tight mt-1 overflow-hidden text-ellipsis leading-4 max-h-36">
      ${elem.detail}
    </p>
    <p class="text-gray-400 mt-10">${elem.date}</p> 
    <button class="delete text-white -mt-9 ml-44 font-semibold text-lg" data-index="${index}"><i class="ri-delete-bin-7-line"></i></button>
  </div>`;
    }
  });
  cards.innerHTML = clutter;

  if (parsedTask.length > 0) {
    box.classList.add("hidden");
  }

  Delete();
}
function Delete() {
  var deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      const indexToDelete = event.target.getAttribute("data-index");
      const allTasks = localStorage.getItem("tasks");
      const parsedTasks = JSON.parse(allTasks);

      parsedTasks.splice(indexToDelete, 1);

      localStorage.setItem("tasks", JSON.stringify(parsedTasks));

      printer();

      if (parsedTasks == 0) {
        files.classList.add("hidden");
      }
    });
  });
}
make.addEventListener("click", function () {
  const valueoftitle = title.value;
  const valueofdescription = description.value;

  const data = {
    title: valueoftitle,
    detail: valueofdescription,
    date: new Date().toLocaleString(),
  };

  const allprevioustasks = localStorage.getItem("tasks") || "[]";
  const parsedtask = JSON.parse(allprevioustasks);
  parsedtask.push(data);
  const stringifiedtasks = JSON.stringify(parsedtask);
  localStorage.setItem("tasks", stringifiedtasks);

  title.value = "";
  description.value = "";

  newrem.classList.add("hidden");

  printer();
});
printer();
