import axios from 'axios'

const API_KEY = 'ec4848803800938c0a59e3ee392f2761'

const getWeather = (city) =>
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(res => res.data)

export default { getWeather }