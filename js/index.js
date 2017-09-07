const weatherApp = {
  info: {
    Fahrenheit: null,
    Celsius: null,
    degreeUnit: null,
    weather: null,
    city: null,
    timeOfDay: null
  },

  initialize: function () {
    this.getGeolocation()
      .then(coords => this.getWeather(this.generateApiAddress(coords)))
      .then(data => {
        this.setData(data);
        this.weatherDog();
        this.displayWeather();
      })
      .catch(console.error);
  },

  getGeolocation: function () {
    const googleApi = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCq_RyPHWu6hZMFpMeYF4PtrVuDchYDhbg';
    return fetch(googleApi, { method: 'post' })
      .then(data => data.json())
      .then(response => {
        const coord = {
          latitude: response.location.lat,
          longitude: response.location.lng
        };
        return coord;
      })
      .catch(err => console.log('fetch geolocation error', err));
  },

  generateApiAddress: function ({latitude, longitude}) {
    const apiKey = '0b0f37359b3ff36d';
    return `https://api.wunderground.com/api/${apiKey}/conditions/astronomy/q/${latitude},${longitude}.json`;
  },

  getWeather: function (address) {
    return fetch(address, { method: 'get' })
      .then(response => response.json())
      .catch(err => console.log('fetch error', err));
  },

  setData: function (data) {
    this.info.Fahrenheit = data.current_observation.temp_f;
    this.info.Celsius = data.current_observation.temp_c;
    this.info.weather = data.current_observation.weather.toLowerCase();
    this.info.city = data.current_observation.display_location.city;
    this.info.timeOfDay = this.getTimeOfDay(data);
  },

  getTimeOfDay: function (data) {
    // convert from {hour: 5, minute: 45} to (5 * 60 + 45) minutes
    // check what if its day or night by comparing minutes
    let sunrise = this.hoursToMinutes(data.sun_phase.sunrise);
    let sunset = this.hoursToMinutes(data.sun_phase.sunset);
    let current = this.hoursToMinutes(data.moon_phase.current_time);
    return current >= sunrise && current <= sunset ? 'day' : 'night';
  },

  hoursToMinutes: function (time) {
    let hour = parseInt(time.hour, 10);
    let minute = parseInt(time.minute, 10);
    return hour * 60 + minute;
  },

  weatherDog: function () {
    // this.setDog(this.dogType('default'));
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
