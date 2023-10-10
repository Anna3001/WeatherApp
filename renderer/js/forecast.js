// const key = 'Put your API Key here';

const getOneHourForecast = async (id) => {

  const base_url = 'http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/';
  const query = `${id}?apikey=${key}&metric=${true}`;

  const response = await fetch(base_url + query);
  const data = await response.json();

  return data[0];
};

const getTwelveHourForecast = async (id) => {

  const base_url = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/';
  const query = `${id}?apikey=${key}&metric=${true}`;

  const response = await fetch(base_url + query);
  const data = await response.json();

  return data;
};

const getOneDayForecast = async (id) => {

  const base_url = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/';
  const query = `${id}?apikey=${key}&metric=${true}`;

  const response = await fetch(base_url + query);
  const data = await response.json();

  return data;
};

const getFiveDayForecast = async (id) => {

  const base_url = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  const query = `${id}?apikey=${key}&metric=${true}`;

  const response = await fetch(base_url + query);
  const data = await response.json();

  return data;
};

const getWeather = async (id) => {

  const base_url = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base_url + query);
  const data = await response.json();

  return data[0];
}; 

const getCity = async (city) => {

  const base_url = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base_url + query);
  const data = await response.json();

  return data[0];
};


