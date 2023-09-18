import { DataToUse, DataFailed } from "../../types/api/dataReqs.types";
import {
  FoundDataOfRequest,
  NotFoundDataOfRequest,
} from "../../types/submitCity/data.types";
import {
  formatCurrentWeather,
  formatHourWeather,
  formatDayWeather,
} from "./dataFormatting";

export function foundDataOfRequest(data: DataToUse): FoundDataOfRequest {
  return {
    cod: 200,
    city: `${data.localization.city}`,
    state: `${data.localization.state}`,
    current: formatCurrentWeather(data.weather.current),
    hourly: formatHourWeather(data.weather.hourly),
    daily: formatDayWeather(data.weather.daily),
  };
}

export function notFoundDataOfRequest(): NotFoundDataOfRequest {
  return {
    cod: 404,
    msg: "Cidade não encontrada! Tente outra cidade!",
  };
}
