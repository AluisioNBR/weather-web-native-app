import axios from "axios";
import { splitWeatherDataType } from "./formatGenericalData";
import type { Data } from "../../types/api/formatGenericalData.types";
import type {
  CityFound,
  CityNotFound,
  Local,
  DataToUse,
  DataFailed,
} from "../../types/api/dataReqs.types";

async function returnGeocodingLocalization(
  city: string
): Promise<CityFound | CityNotFound> {
  try {
    const localization = await axios.get(
      "http://api.openweathermap.org/geo/1.0/direct?",
      {
        params: {
          q: `${city},BR`,
          limit: 1,
          appid: process.env.API_KEY,
        },
      }
    );
    return {
      found: "found",
      local: await localization.data[0],
    };
  } catch (err) {
    return { found: "notFound" };
  }
}

export async function returnLocationInfo(
  lat: number,
  lon: number
): Promise<CityFound | CityNotFound> {
  try {
    const localization = await axios.get(
      "http://api.openweathermap.org/geo/1.0/reverse",
      { params: { lat: lat, lon: lon, limit: 1, appid: process.env.API_KEY } }
    );
    return {
      found: "found",
      local: await localization.data[0],
    };
  } catch (err) {
    return { found: "notFound" };
  }
}

async function returnWeatherData(
  local: Local
): Promise<DataToUse | DataFailed> {
  try {
    const data = await axios.get(
      "https://api.openweathermap.org/data/2.5/onecall?",
      {
        params: {
          lat: local.lat,
          lon: local.lon,
          lang: "pt_br",
          units: "metric",
          exclude: "minutely,alerts",
          appid: process.env.API_KEY,
        },
      }
    );
    const weatherData = splitWeatherDataType((await data.data) as Data);
    return {
      cod: 200,
      weather: weatherData,
      localization: { city: local.name, state: local.state },
    };
  } catch (error) {
    return { cod: 404 };
  }
}

export { returnGeocodingLocalization, returnWeatherData };
