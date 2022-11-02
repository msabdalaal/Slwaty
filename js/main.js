let profilePic = document.querySelector(".profile");
let dimmer = document.querySelector(".dimmer");
let profileMenu = document.querySelector(".profile-menu");
let close = document.querySelector(".close");
let name = "محمد سيد";
let welcomeLabel = document.querySelector(".welcome-label");

welcomeLabel.innerHTML = `أهلا بك، ${name}`
profilePic.addEventListener("click", () => {
  dimmer.classList.toggle("hide");
  close.classList.toggle("hide");
  profileMenu.classList.toggle("hide");
});

close.addEventListener("click", () => {
  dimmer.classList.toggle("hide");
  close.classList.toggle("hide");
  profileMenu.classList.toggle("hide");
});

let table = document.querySelector("table");

table.addEventListener("click", (e) => {
  if (e.target.classList.contains("status")) {
    e.target.classList.toggle("check");
  }
});