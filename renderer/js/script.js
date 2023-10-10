const cityForm = document.querySelector('form');
const details = document.querySelector('.details');
const leftInfo = document.querySelector('.city_current_temp_info');

const updateData = (data) => {
  const cityDets = data.cityDets;
  const weather = data.weather;
  const oneDayForecast = data.oneDayForecast;
  const oneHourForecast = data.oneHourForecast;
  const twelveHourForecast = data.twelveHourForecast;
  const fiveHourForecast = data.fiveHourForecast;
  console.log(oneDayForecast.DailyForecasts[0].Temperature.Maximum.Value);

  var hoursArray = [];
  var daysArray = [];

  for (var i = 0; i < 12; i++){

    var dateTimeString = twelveHourForecast[i].DateTime;
    var parts = dateTimeString.split('T');
    var timePart = parts[1];

    var dayTemp = {
      temperature: twelveHourForecast[i].Temperature.Value,
      hour: timePart.substring(0, 5)
    }

    hoursArray.push(dayTemp);
  }

  for (var i = 0; i < 5; i++){

    var dateString = fiveHourForecast.DailyForecasts[i].Date;

    var dayTemp = {
      maxTemperature: fiveHourForecast.DailyForecasts[i].Temperature.Maximum.Value,
      minTemperature: fiveHourForecast.DailyForecasts[i].Temperature.Minimum.Value,
      date: dateString.split('T')[0]
    }

    daysArray.push(dayTemp);
  }

  leftInfo.innerHTML =  `
  <div class="city">
    <p>${cityDets.EnglishName}</p>
  </div>
  <div class="current_temp">
    <span>${weather.Temperature.Metric.Value}</span>
    <spam>&deg;C</spam>
`;

  details.innerHTML = `
    <div class="option">
      <p class="title">1 hour forecast:</p>
      <p class="content">${oneHourForecast.Temperature.Value}<spam>&deg;C</spam></p>
    </div>

    <div class="option">
          <p class="title">12 hour forecast:</p>
        </div>

        <table style="width:85%">
        <tr>
          <th>Hour</th>
          <th>${hoursArray[0].hour}</th>
          <th>${hoursArray[1].hour}</th>
          <th>${hoursArray[2].hour}</th>
          <th>${hoursArray[3].hour}</th>
          <th>${hoursArray[4].hour}</th>
          <th>${hoursArray[5].hour}</th>
          <th>${hoursArray[6].hour}</th>
          <th>${hoursArray[7].hour}</th>
          <th>${hoursArray[8].hour}</th>
          <th>${hoursArray[9].hour}</th>
          <th>${hoursArray[10].hour}</th>
          <th>${hoursArray[11].hour}</th>
        </tr>
        <tr>
          <td>Temperature [&deg;C]</td>
          <td>${hoursArray[0].temperature}</td>
          <td>${hoursArray[1].temperature}</td>
          <td>${hoursArray[2].temperature}</td>
          <td>${hoursArray[3].temperature}</td>
          <td>${hoursArray[4].temperature}</td>
          <td>${hoursArray[5].temperature}</td>
          <td>${hoursArray[6].temperature}</td>
          <td>${hoursArray[7].temperature}</td>
          <td>${hoursArray[8].temperature}</td>
          <td>${hoursArray[9].temperature}</td>
          <td>${hoursArray[10].temperature}</td>
          <td>${hoursArray[11].temperature}</td>
        </tr>
      </table>

    <div class="option">
      <p class="title">1 day forecast:</p>
      <p class="content">Maximum: ${oneDayForecast.DailyForecasts[0].Temperature.Maximum.Value}<spam>&deg;C</spam></p>
      <p class="content">Minimum: ${oneDayForecast.DailyForecasts[0].Temperature.Minimum.Value}<spam>&deg;C</spam></p>
    </div>

    <div class="option">
          <p class="title">5 days forecast:</p>
    </div>

    <table style="width:85%">
          <tr>
            <th>Date</th>
            <th>${daysArray[0].date}</th>
            <th>${daysArray[1].date}</th>
            <th>${daysArray[2].date}</th>
            <th>${daysArray[3].date}</th>
            <th>${daysArray[4].date}</th>
          </tr>
          <tr>
            <td>Max temperature [&deg;C]</td>
            <td>${daysArray[0].maxTemperature}</td>
            <td>${daysArray[1].maxTemperature}</td>
            <td>${daysArray[2].maxTemperature}</td>
            <td>${daysArray[3].maxTemperature}</td>
            <td>${daysArray[4].maxTemperature}</td>
          </tr>
          <tr>
            <td>Min temperature [&deg;C]</td>
            <td>${daysArray[0].minTemperature}</td>
            <td>${daysArray[1].minTemperature}</td>
            <td>${daysArray[2].minTemperature}</td>
            <td>${daysArray[3].minTemperature}</td>
            <td>${daysArray[4].minTemperature}</td>
          </tr>
        </table>
  `;
}

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  const oneDayForecast = await getOneDayForecast(cityDets.Key);
  const oneHourForecast = await getOneHourForecast(cityDets.Key);
  const twelveHourForecast = await getTwelveHourForecast(cityDets.Key);
  const fiveHourForecast = await getFiveDayForecast(cityDets.Key);

  return { cityDets, weather, oneDayForecast, oneHourForecast, twelveHourForecast, fiveHourForecast };
};

cityForm.addEventListener('submit', e => {
  e.preventDefault();
  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
  .then(data => updateData(data))
  .catch(err => console.log(err));
})