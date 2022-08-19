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
