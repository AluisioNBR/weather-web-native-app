import type {
  NoRain,
  Rain,
  NoSnow,
  Snow,
} from "../../types/submitCity/weatherStateReducer.types";
import type { Data } from "../../types/api/formatGenericalData.types";

function formatMoonPhase(id: number) {
  if (id == 0 || id == 1) return "lua nova";
  else if (id == 0.5) return "lua cheia";
  else if (id < 0.5) return "lua crescente";
  else return "lua minguante";
}

function formatTemperature(temp: number) {
  let [intPartNumber, floatPartNumber] = `${temp}`.split("."),
    numberToReturn = Number(intPartNumber);
  if (Number(floatPartNumber) >= 50) numberToReturn += 1;
  return numberToReturn;
}

function ifRainy(main: string, rain: number): NoRain | Rain {
  return main === "Rain"
    ? {
        rainy: "rain",
        rain: rain,
      }
    : { rainy: "no-rain" };
}

function ifSnowed(main: string, snow: number): NoSnow | Snow {
  return main === "Snow"
    ? {
        snowed: "snow",
        snow: snow,
      }
    : { snowed: "no-snow" };
}

function splitWeatherDataType(data: Data) {
  return {
    current: data.current,
    hourly: data.hourly,
    daily: data.daily,
  };
}

export {
  formatMoonPhase,
  formatTemperature,
  ifRainy,
  ifSnowed,
  splitWeatherDataType,
};
