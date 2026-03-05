import { useEffect, useState, useMemo } from "react";
import "../assets/Weather.css";
export default function Weather() {
  let dates = new Date();
  let date = dates.getDate();
  let month = dates.getMonth() + 1;
  let year = dates.getFullYear();
  let day = dates.toLocaleDateString("en-IN", { 
    weekday: "long",
  });
  const [perception, setperception] = useState("0%");
  const [humidity, sethumidity] = useState("0%");
  const [wind, setwind] = useState("0%");
  const [city, setcity] = useState("Mumbai");
  const [type, settype] = useState(" ");
  const [celcius, setcelcius] = useState("");
  const countrylist = useMemo(() => {
    return {
      japan: "Tokyo",
      india: "New Delhi",
      unitedStates: "Washington, D.C.",
      unitedKingdom: "London",
      canada: "Ottawa",
      australia: "Canberra",
      germany: "Berlin",
      france: "Paris",
      italy: "Rome",
      china: "Beijing",
    };
  }, []);
  const API_KEY = "c924ae6f01d75e3b8bb986575bc5945b";
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    fetch(api)
      .then((Response) => {
        if (!Response.ok) {
          throw new Error("API Request Accept nahi kiya : (");
        }
        console.log(Response);
        return Response.json();
      })
      .then((data) => {
        const countryCode = data.sys.country;
        const fullcountryName = countrylist[countryCode] || countryCode;
        setcity(" " + fullcountryName + " " + data.name);
        setperception(data.main.feels_like + " °C");
        sethumidity(data.main.humidity + " %");
        setwind(data.wind.speed + " Km/h");
        settype(
          data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1)
        );
        setcelcius(data.main.temp + " °C");
      })
      .catch((error) => {
        console.log("Error Occured", error);
      });
  }, [api, countrylist, city]);

  const click = () => {
    const countryin = prompt("Enter Country Name :");
    if (countryin) {
      const contryID = countrylist[countryin.trim()].toLowerCase();
      if (contryID) {
        setcity(contryID);
      } else {
        alert("Sorry ! We Can't Fetch That Country Weather ");
      }
    }
  };
  return (
    <>
      
      <div className="body">
      <h1 className="head">Weather Application Using React-Js</h1>
      <div className="body-main">
        <div className="first-div">
          <h3 className="day">{day}</h3>
          <h4 className="daate">
            {date}/{month}/{year}
          </h4>
          <h5 className="location ">
            <i className="fa fa-map-marker">{city}</i>
          </h5>
          <h3 className="sun">
            <i className="fa fa-sun-o sunn"></i>
          </h3>
          <h1 className="celcius">{celcius}</h1>
          <p className="weather-type">{type}</p>
        </div>
        <div className="second-div">
          <h3 className="heading-div2">Perception</h3>
          <p> {perception}</p>
          <h3 className="heading-div2">Humidity</h3>
          <p> {humidity}</p>
          <h3 className="heading-div2">Wind</h3>
          <p> {wind}</p>
          <button className="main" onClick={click}>
            Change Location
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
