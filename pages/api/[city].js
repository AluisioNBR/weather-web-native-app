async function WeatherInf(req, res) {
  const cityReq = req.query.city;

  const APIdata = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityReq},BR&appid=${process.env.API_KEY}&lang=pt_br`
  );
  const APIdataJSON = await APIdata.json();

  if (APIdataJSON.cod === 200) {
    const city = `${APIdataJSON.name}`;
    const temperature = Math.floor(Number(APIdataJSON.main.temp) - 273);
    const feels_like = Math.floor(Number(APIdataJSON.main.feels_like) - 273);
    const temp_min = Math.floor(Number(APIdataJSON.main.temp_min) - 273);
    const temp_max = Math.floor(Number(APIdataJSON.main.temp_max) - 273);
    const humidity = APIdataJSON.main.humidity;
    const icon = `http://openweathermap.org/img/w/${APIdataJSON.weather[0].icon}.png`;
    const description = APIdataJSON.weather[0].description;

    res.status(200).json({
      cod: 200,
      msg: "Cidade encontrada!",
      city: city,
      country: "BR",
      main: {
        temperature: temperature,
        feels_like: feels_like,
        temp_min: temp_min,
        temp_max: temp_max,
        humidity: humidity
      },
      icon: icon,
      description: description
    });
  } else if (APIdataJSON.cod === 404) {
    res.status(200).json({
      cod: 404,
      msg: "Cidade não encontrada! Tente outra cidade!"
    });
  } else {
    res.status(APIdataJSON.cod).json({
      cod: APIdataJSON.cod,
      msg: "Ocorreu um problema em nosso servidor! Tente novamente mais tarde!"
    });
  }
}

export default WeatherInf;
