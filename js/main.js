let profilePic = document.querySelector(".profile");
let dimmer = document.querySelector(".dimmer");
let profileMenu = document.querySelector(".profile-menu");
let close = document.querySelector(".close");
let name = "محمد سيد";
let welcomeLabel = document.querySelector(".welcome-label");

welcomeLabel.innerHTML = `أهلا بك، ${name}`;
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

dimmer.addEventListener("click", () => {
  dimmer.classList.toggle("hide");
  close.classList.toggle("hide");
  profileMenu.classList.toggle("hide");
});

let table = document.querySelector("table");

table.addEventListener("click", (e) => {
  if (e.target.classList.contains("check")) {
    e.target.classList.remove("check");
  } else if (e.target.classList.contains("status")) {
    for (let i = 0; i < 3; i++) {
      e.target.parentElement.parentElement.children[
        i
      ].children[0].classList.remove("check");
    }
    e.target.classList.add("check");
  }
});
//===============
setInterval(() => {
  // let adress = "giza";
  let city = document.getElementById("city").value;
  const prayerTimes = async () => {
    try {
      let fetched = await fetch(
        `https://api.aladhan.com/v1/timingsByAddress?address=${city}`
      );
      return await fetched.json();
    } catch (error) {
      clearInterval();
    }
  };
  //===============
  var prayer = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  // let todayDate = new Date().toDateString().split(" ");
  let timeNow = new Date();
  //==============

  //==============
  let getNextPrayer = () => {
    let nextPrayerAndTime = prayerTimes().then((result) => {
      let nextPrayer;
      let remainingTime;
      let allPrayerTimes = result.data.timings;
      let date = result.data.date.gregorian;
      let day = date["day"];
      let month = date["month"]["number"];
      let year = date["year"];
      for (let i = 0; i < prayer.length; i++) {
        let PrayTime = allPrayerTimes[prayer[i]];
        // console.log(PrayTime);
        let prayerTime = new Date(`${year}-${month}-${day}T${PrayTime}:00`);
        // console.log(prayerTime);
        // console.log(timeNow);
        // console.log(prayerTime - timeNow);
        if (prayerTime - timeNow > 0) {
          nextPrayer = prayer[i];
          remainingTime = prayerTime - timeNow;
          break;
        } else {
          prayerTime = new Date(
            `${year}-${month}-${+day + 1}T${allPrayerTimes[prayer[0]]}:00`
          );
          // console.log(prayerTime);
          remainingTime = prayerTime - timeNow;
          // console.log(remainingTime / 1000 / 60 / 60);
          nextPrayer = "Fajr";
        }
      }
      // console.log(nextPrayer);
      // console.log(remainingTime / 1000 / 60);
      return [nextPrayer, remainingTime];
    });
    // console.log(nextPrayerAndTime);
    return nextPrayerAndTime;
  };
  getNextPrayer();
  //==============

  let nextPrayerLabel = document.getElementById("nextPrayer");
  let timeRemainingLabel = document.getElementById("timeRemaining");
  function remainingTime() {
    getNextPrayer().then((res) => {
      // console.log(res);
      let time = res[1] / 1000 / 60;
      let minutesRemaining;
      let hoursRemaining;
      if (time > 60) {
        hoursRemaining = Math.floor(time / 60);
        minutesRemaining = Math.ceil((time / 60 - hoursRemaining) * 60);
      }
      nextPrayerLabel.innerHTML = `${res[0]} صلاة ال`;
      timeRemainingLabel.innerHTML = `${minutesRemaining} ساعة و ${hoursRemaining} دقيقة`;
    });
  }
  setInterval(remainingTime(), 1000);
}, 1000);

//===============
