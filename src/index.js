import "./style.css";
import { Weather } from "./weather.js";

const searchBtn = document.querySelector("button");
const unit = document.querySelector(".change-system");

const formData = document.querySelector("form");
function handleForm(event) {
  event.preventDefault();
}
formData.addEventListener('submit', handleForm);

Weather.setWeatherValues();

searchBtn.addEventListener("click", Weather.setWeatherValues);
unit.addEventListener("click", () => {
  if(unit.textContent === "°C"){
    unit.textContent = "°F";
    for(let i = 0; i < 2; i++){
      document.querySelectorAll(".metric")[i].style = "display: none";
      document.querySelectorAll(".imperial")[i].style = "display: block";  
    }
  }else{
    unit.textContent = "°C";
    for(let i = 0; i < 2; i++){
      document.querySelectorAll(".metric")[i].style = "display: block";
      document.querySelectorAll(".imperial")[i].style = "display: none";  
    }
  }
});