import {
  CityFound,
  CityNotFound,
  DataFailed,
  DataToUse,
  Local,
} from "../../types/api/dataReqs.types";
import { returnWeatherData } from "./dataReqs";
import {
  foundDataOfRequest,
  notFoundDataOfRequest,
} from "./dataOfRequestFunctions";

export async function verifyInformations(
  localization: CityFound | CityNotFound
) {
  const data = await verifyCity(localization);
  return verifyApiData(data);
}

async function verifyCity(localization: CityFound | CityNotFound) {
  try {
    if (localization.found == "notFound") throw new Error(`City not found!`);
    else {
      const local: CityFound = localization as CityFound;
      return await returnWeatherData(local.local as Local);
    }
  } catch (error) {
    return { cod: 404 };
  }
}

function verifyApiData(data: DataToUse | DataFailed) {
  const ifNotFound = data.cod === 404 || data.cod === 400;
  return ifNotFound
    ? notFoundDataOfRequest()
    : foundDataOfRequest(data as DataToUse);
}
