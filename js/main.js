// explore button
let exploreButton = document.querySelector("#exploreButton");
let hadethSection = document.querySelector(".hadith");
exploreButton.addEventListener("click", (e) => {
  hadethSection.scrollIntoView({ behavior: "smooth" });
});

let navItem = document.querySelectorAll(".navbar-nav .nav-link");
navItem.forEach((item) => {
  item.addEventListener("click", (e) => {
    navItem.forEach((x) => {
      x.classList.remove("activeItem");
    });
    console.log(e.target);
    item.classList.add("activeItem");
  });
});
// ===============fixed bar======
let fixedBar = document.querySelector(".navbar");
let scrollButton = document.querySelector(".scrollButton");

window.addEventListener("scroll", (e) => {
  window.scrollY > 60
    ? fixedBar.classList.add("activeNav")
    : fixedBar.classList.remove("activeNav");
  window.scrollY > 400
    ? scrollButton.classList.add("active")
    : scrollButton.classList.remove("active");
});
scrollButton.addEventListener("click", (e) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// ==============fetch API=======
let hadithContent = document.querySelector(".hadithContent");
let nextBtn = document.querySelector("#next");
let prevBtn = document.getElementById("prev");
let hadithNum = document.getElementById("hadithNum");
let hadithIndex = 0;
function HadithChanger() {
  fetch(" https://api.hadith.gading.dev/books/bukhari?range=1-300")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let Hadiths = data.data.hadiths;
      hadithContent.innerText = Hadiths[hadithIndex].arab;
      hadithNum.innerText = hadithIndex + 1 + "/300";
      //nextBtn=================================
      nextBtn.addEventListener("click", (e) => {
        console.log(e.target);
        hadithIndex >= Hadiths.length - 1 ? (hadithIndex = 0) : hadithIndex++;
        console.log(hadithIndex);
        hadithContent.innerText = Hadiths[hadithIndex].arab;
        hadithNum.innerText = hadithIndex + 1 + "/300";
      });
      //prevBtn=================================
      prevBtn.addEventListener("click", (e) => {
        hadithIndex == 0 ? (hadithIndex = Hadiths.length - 1) : hadithIndex--;
        hadithContent.innerText = Hadiths[hadithIndex].arab;
        hadithNum.innerText = hadithIndex + 1 + "/300";
      });
    });
}
HadithChanger();
// ==============================quran Section=======================
let arabName = document.getElementById("arabName");
let englishName = document.getElementById("englishName");
let quranContent = document.getElementById("quranContent");
function getSurahs() {
  // ====fetch surah(Name)=====
  fetch("http://api.alquran.cloud/v1/meta")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let surahs = data.data.surahs.references;
      surahs.forEach((surah) => {
        quranContent.innerHTML += `
         <div class="box col-lg-2 col-md-3 col-5">
                    <span class="arabName" id="arabName">${surah.name}</span>
                    <span class="englishName" id="englishName">${surah.englishName}</span>
          </div>
        `;
      });
      let surahPopup = document.querySelector(".surahPopup");
      let surahTitle = document.querySelectorAll(".box");
      let contentAyat = document.querySelector(".content-Ayat");
      surahTitle.forEach((surah, index) => {
        surah.addEventListener("click", (e) => {
          contentAyat.innerHTML = ""; //VIP
          fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              let ayas = data.data.ayahs;

              ayas.forEach((aya) => {
                surahPopup.classList.add("activePop");
                contentAyat.innerHTML += `
                  <p>(${aya.numberInSurah})-${aya.text}</p>
                `;
              });
            });
        });
      });
      // =============popup===========================
      let closePopup = document.getElementById("close");
      closePopup.addEventListener("click", (e) => {
        surahPopup.classList.remove("activePop");
      });
    });
}
getSurahs();

// ===============================
// ==============prayTime====================
let prayTimeContent = document.querySelector(".prayTime .content");
function getPrayTime() {
  prayTimeContent.innerHTML = "";
  fetch(
    "http://api.aladhan.com/v1/timingsByCity/16-04-2023?city=cairo&country=egypt&method=8"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let times = data.data.timings;
      for (let time in times) {
        // console.log(time);
        // console.log(times[time]);
        prayTimeContent.innerHTML += `
         <div class="card col-lg-3 col-md-5 col-11">
                <div class="circle">
                        <span class="time">${times[time]}</span>
                </div>
               <h6 class="prayName">${time}</h6>
           </div>
        `;
      }
    });
}
getPrayTime();

// =================================
// =========scroll Button===========
