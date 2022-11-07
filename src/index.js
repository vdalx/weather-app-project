function formatDay(date) {
    let hour = date.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[date.getDay()];
  
    return `${day} ${hour}:${minutes}`;
  }
  
  let dateField = document.querySelector("#day-and-time");
  let time = new Date();
  dateField.innerHTML = formatDay(time);
  
  let locationSearch = document.querySelector("form.search-field");
  locationSearch.addEventListener("submit", submissionEvent);
  
  function showWeather(response) {
    document.querySelector("#search-input-display").innerHTML =
      response.data.name;
    document.querySelector("#temp").innerHTML = Math.round(
      response.data.main.temp
    );
  }
  
  function citySearch(city) {
    let apiKey = "bbf3400701611eeb80e9b930916e7b6a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function searchLocation(position) {
    let apiKey = "bbf3400701611eeb80e9b930916e7b6a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  function submissionEvent(event) {
    event.preventDefault();
    let city = document.querySelector("#search-text-input").value;
    citySearch(city);
  }
  
  citySearch("Vancouver");