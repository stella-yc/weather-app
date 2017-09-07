const weatherApp = {
  info: {
    latitude: null,
    longitude: null,
    Fahrenheit: null,
    Celsius: null,
    degreeUnit: null,
    weather: null,
    city: null,
    timeOfDay: null,
    timestamp: null
  },

  // getLocation is synchronous, no request for geolocation
  // initialize: function () {
  //   let {latitude, longitude} = this.getLocation();
  //   this.info.latitude = latitude;
  //   this.info.longitude = longitude;
  //   const address = this.generateApiAddress(apiKey, latitude, longitude);
  //   this.getWeather(address);
  // },

  initialize: function () {
    if (!navigator.geolocation) {
      let msg = "Sorry, looks like your browser doesn't support geolocation";
      $('.coordinates').html(msg);
    } else {
      this.getPosition()
        .then(({latitude, longitude}) => {
          this.info.latitude = latitude;
          this.info.longitude = longitude;
          const address = this.generateApiAddress(latitude, longitude);
          this.getWeather(address);
        })
        .catch(console.error);
    }
  },

  getLocation: function () {

    const location = { latitude: 40.4477468, longitude: -79.9483855 };
    return location;
  },
  // const geolocationReq = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCq_RyPHWu6hZMFpMeYF4PtrVuDchYDhbg';

  getPosition: function () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        let coord = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        resolve(coord);
      }, (err) => {
        console.log('geolocation not working');
        reject(err);
      },
      {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000});
    });
  },

  generateApiAddress: function (latitude, longitude) {
    const apiKey = '0b0f37359b3ff36d';
    return `https://api.wunderground.com/api/${apiKey}/conditions/astronomy/q/${latitude},${longitude}.json`;
  },

  // using $.getJSON callback
  // getWeather: function (address) {
  //   $.getJSON(address, (json) => {
  //       this.info.Fahrenheit = json.current_observation.temp_f;
  //       this.info.Celsius = json.current_observation.temp_c;
  //       this.info.weather = json.current_observation.weather.toLowerCase();
  //       this.info.city = json.current_observation.display_location.city;
  //       this.getTimeOfDay(json);
  //       this.weatherIcon();
  //       this.displayWeather();
  //   });
  // },

  // using fetch promise
  getWeather: function (address) {
    fetch(address, {method: 'get'})
      .then(response => {
        return response.json();
      })
      .then((data) => {
        this.info.Fahrenheit = data.current_observation.temp_f;
        this.info.Celsius = data.current_observation.temp_c;
        this.info.weather = data.current_observation.weather.toLowerCase();
        this.info.city = data.current_observation.display_location.city;
        this.getTimeOfDay(data);
        this.weatherIcon();
        this.displayWeather();
      })
      .catch(err => {
        console.log('fetch error', err);
      });
  },

  getTimeOfDay: function (data) {
    let {sunriseH, sunriseM} = data.sun_phase.sunrise;
    let {sunsetH, sunsetM} = data.sun_phase.sunset;
    let {currentH, currentM} = data.moon_phase.current_time;

    let sunriseMinutes = this.hoursToMinutes(sunriseH, sunriseM);
    let sunsetMinutes = this.hoursToMinutes(sunsetH, sunsetM);
    let currentMin = this.hoursToMinutes(currentH, currentM);

    if (currentMin >= sunriseMinutes && currentMin <= sunsetMinutes) {
      this.info.timeOfDay = 'day';
    } else {
      this.info.timeOfDay = 'night';
    }
  },

  hoursToMinutes: function (hours, minutes) {
    return hours * 60 + minutes;
  },

  weatherIcon: function () {
    this.setDog(this.dogType(this.info.weather));
  },

  setDog: function (type) {
    $('.icon').html(dogs[type].url);
    $('.img-attribution').html(dogs[type].attribution);
  },

  dogType: function (weather) {
    const types = Object.keys(dogs);
    for (let i = 0; i < types.length; i++) {
      let type = types[i];
      if (weather.includes(type)) {
        if (type === 'drizzle') {
          return 'rain';
        }
        return type;
      }
    }
    return 'default';
  },

  displayWeather: function () {
    $('.temp').html(this.info.Fahrenheit + '&deg;F');
    $('.main').html(this.info.weather);
    $('.city').html(this.info.city);
    this.info.degreeUnit = 'Fahrenheit';
    this.tempButton();
    $('#loading-text').hide();   //Hide initial loading text
    $('.weatherdiv').show();    //Show weather information
  },

  tempButton: function () {
    $('.temp-button').click(this.toggleDegree.bind(this));
  },

  toggleDegree: function () {
    let prevUnit = this.info.degreeUnit;
    let displayUnit = this.info.degreeUnit === 'Fahrenheit' ? 'Celsius' : 'Fahrenheit';
    let initial = displayUnit[0];
    $('.temp').html(`${this.info[displayUnit]}&deg;${initial}`);
    $('.temp-button').html(prevUnit);
    this.info.degreeUnit = displayUnit;
  }
};

$(function() {
    weatherApp.initialize();
});
