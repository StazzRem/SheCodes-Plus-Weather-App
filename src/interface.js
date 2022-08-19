//Date
let today = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = days[today.getDay()];
let hour = today.getHours();
let minute = today.getMinutes();
let date = today.getDate();
let month = months[today.getMonth()];

let todaysDate = document.querySelector("h2");
todaysDate.innerHTML = `${day}, ${date} ${month}`;
let nowTime = document.querySelector("h3");
nowTime.innerHTML = `${hour}:${String(minute).padStart(2, `0`)}`;

// SearchBar with API intergration

// DO NOT DELETE \\
let apiKey = "fc951b70b430c59535c6efec00d491ee";
// DO NOT DELETE \\

function usePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(getData);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(usePosition);
}

let currentButton = document.querySelector("#currentbutton");
currentButton.addEventListener("click", getPosition);

function getData(response) {
  console.log(response.data); // This shows the data for the city searched
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  // here I am inputting an icon appropriate for the weather
  //let weatherIcon = document.querySelector("#weatherIcon");
  //if (response.data.clouds.all === 0) {
  //  weatherIcon.innerHTML = `<img src="images/sun.png">`;
  //} else if (response.data.clouds.all < 70) {
  //  weatherIcon.innerHTML = `<img src="images/sun_cloud.png">`;
  //} else {
  //  weatherIcon.innerHTML = `<img src="images/cloud.png">`;
  //}

  let warmth = "";
  if (response.data.main.temp <= 0) {
    warmth = "freezing";
  } else if (response.data.main.temp > 0 && response.data.main.temp <= 10) {
    warmth = "cold";
  } else if (response.data.main.temp > 10 && response.data.main.temp <= 15) {
    warmth = "cool";
  } else if (response.data.main.temp > 15 && response.data.main.temp <= 25) {
    warmth = "warm";
  } else {
    warmth = "hot";
  }

  let clouds = response.data.weather[0].description;

  let description = document.querySelector("#description");
  description.innerHTML = `Today's weather is ${warmth} with ${clouds}`;

  // console.log(response.data.main.temp); // shows temperature
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(response.data.main.temp);
  let tempDesc = document.querySelector("#tempDesc");

  // console.log(response.data.main.temp_min); // shows minimum temperature
  let minTemp = document.querySelector("#minTemp");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);

  // console.log(response.data.main.temp_max); //  shows maximum temperature
  let maxTemp = document.querySelector("#maxTemp");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);

  // console.log(response.data.main.pressure); // shows pressure
  // console.log(response.data.wind.speed); // shows windspeed
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let humid = document.querySelector("#humidity");
  humid.innerHTML = Math.round(response.data.main.humidity);

  // console.log(response.data.main.humidity); // shows humidity
}

function getApi(event) {
  event.preventDefault(); // prevents default behaviour such as refreshing the page

  let newCity = document.querySelector("#cityInput"); // selecting the searchbar input
  console.log(`${newCity.value}`); // this will show in the log the city searched

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;
  // ^^ this is the URL to get current weather info for the city searched ^^^^ here

  axios.get(`${apiUrl}`).then(getData); // axios helps retrieve the API

  newCity.value = ""; // This is so that the search bar is cleared after search
  //
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}`;
}

let citySearch = document.querySelector("#searchbar");
citySearch.addEventListener("submit", getApi);

function defaultCity(city) {
  let defaultUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${defaultUrl}`).then(getData);
}

defaultCity("Amsterdam");
