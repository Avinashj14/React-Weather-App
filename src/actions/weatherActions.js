export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

export const fetchWeather = (city) => async (dispatch) => {
  dispatch({ type: FETCH_WEATHER_REQUEST });

  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=128296f88b584ba7ab6162121240702&q=${city}&aqi=no`);
    const data = await response.json();
    console.log("Fetched weather data:", data);
    dispatch({ type: FETCH_WEATHER_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    dispatch({ type: FETCH_WEATHER_FAILURE, payload: error.message });
  }
};
