const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const p1 = document.querySelector("#msg1");
const p2 = document.querySelector("#msg2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  p1.textContent = "Loading...";
  p2.textContent = "";

  fetch("http://localhost:3000/weather?address=" + search.value).then(
    response => {
      response.json().then(data => {
        if (data.error) {
          p1.textContent = data.error;
        } else {
          p1.textContent = data.local;
          p2.textContent = data.forecast;
        }
      });
    }
  );
});
