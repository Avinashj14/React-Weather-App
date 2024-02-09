// Dashboard.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Temperature from "./Temperature";
import Highlights from "./Highlights";
import { fetchWeather } from "../actions/weatherActions";

function Dashboard() {
  const dispatch = useDispatch();
  const { loading, weather, error } = useSelector((state) => state.weather);

  useEffect(() => {
    const fetchInitialWeather = async () => {
      try {
        await dispatch(fetchWeather('gwalior'));
      } catch (error) {
        console.error("Error fetching initial weather:", error);
      }
    };

    fetchInitialWeather();
  }, [dispatch]);


  const handleCityChange = (newCity) => {
    dispatch(fetchWeather(newCity)); 
  };
 
useEffect(() => {
  if (weather) {
    console.log("Weather Dashboard:", weather);
  }
}, [weather]);

  if (loading) {
    return  <div className="h-screen flex items-center justify-center" role="status">
    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="bg-[#1F213A] h-screen flex justify-center align-top">
        <div className=" mt-40 w-1/5 h-1/3">
         
         
         {weather && (
           < Temperature
           initialCity="gwalior" 
            onCityChange={handleCityChange}
            stats={{
              temp: weather.current.temp_c,
              condition: weather.current.condition.text,
              day: weather.current.is_day,
              location: weather.location.name,
              time: weather.location.localtime
            }}
          />
        )}
        </div>
        <div className="w-1/3 h-1/3 mt-40 p-10 grid grid-cols-2 gap-6">
          <h1 className="text-slate-200 text-2xl col-span-2">
            Today's Highlights
          </h1>
          {weather && (
            <>
          <Highlights
              stats={{
                title: "Wind Status",
                value: weather.current.wind_mph,
                unit: "mph",
                direction: weather.current.wind_dir,
              }}
            />
            <Highlights
              stats={{
                title: "Humidity",
                value: weather.current.humidity,
                unit: "%",
              }}
            />
            <Highlights
              stats={{
                title: "Visibility",
                value: weather.current.vis_miles,
                unit: "miles",
              }}
            />
            <Highlights
              stats={{
                title: "Air Pressure",
                value: weather.current.pressure_mb,
                unit: "mb",
              }}
            />
          </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
