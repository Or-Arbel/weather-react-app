import React, {useState, useEffect} from 'react';
const api = {
  key: "5bbef51022497c255e42917ba61335f0",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [greeting, setGreeting] = useState('');

  //Check time and define greeting : good morning / good afternoon / good evening
  useEffect(()=>{
    let today = new Date();
    let currentHour = today.getHours();
    setGreeting(currentHour<12 ? 'Good Morning!' : (currentHour<18 ? 'Good Afternoon!' : 'Good evening!'));
  },[]);

  const search = evt => {
    if(evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result =>{
        
        setWeather(result);
        setQuery('');
        // console.log(result);
      });
    }
  }

  const dateBuilder  = (d) =>  {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16)? 'app warm' : 'app') : 'app'}>
      <main>
        <div className='search-box'>
          <input 
            type='text'
            className='search-bar'
            placeholder='Search city...'
            onChange = {e => setQuery(e.target.value)}
            value = {query}
            onKeyPress = {search}
            />
        </div>


        {(typeof weather.main != "undefined") ? (
          <div>
              <div className='location-box'>
                  <div className='location'>
                    {weather.name}, {weather.sys.country}
                  </div>
                  <div className='date'>
                    {dateBuilder(new Date())}
                  </div>
              </div>
              <div className='weather-box'>
                  <div className='temp'> {Math.round(weather.main.temp)}°C </div>   
                  <div className='weather'> {weather.weather[0].main} </div>        
              </div>      
          </div>
        ) : (
          <div>
              <div className='first-sceen-box'>
              <div className='date'>
                    {dateBuilder(new Date())}
                  </div>
                  <h2>{greeting}</h2>
                  <h5>Please enter a city name and press Enter to get the city's current temperature </h5>
              </div>      
          </div>
        )
        }
      </main>
      
    </div>
  )
}

export default App;