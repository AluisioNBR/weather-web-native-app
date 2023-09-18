import axios from "axios";
import type { AxiosRequestConfig } from "axios";

import { renderInformations, renderErr } from "./render";

import type {
  FoundDataOfRequest,
  NotFoundDataOfRequest,
} from "../../types/submitCity/data.types";

import type {
  submitCityParams,
  FetchWeatherInformationReturn,
  FetchWeatherInformationParams,
  VerifyResponseParams,
} from "../../types/submitCity/submitCity.types";

export async function submitCity(params: submitCityParams) {
  const information = await fetchWeatherInformation({
    cityValue: params.cityValue,
    setLoadingWeather: params.citySelectionProps.setLoadingWeather,
    myApiSecret: params.myApiSecret,
  });

  verifyResponse({
    information,
    citySelectionProps: params.citySelectionProps,
    setAlertStatus: params.setAlertStatus,
    setAlertTitle: params.setAlertTitle,
    setAlertIsOpen: params.setAlertIsOpen,
  });
  params.setCityValue("");
}

async function fetchWeatherInformation(
  params: FetchWeatherInformationParams
): Promise<FetchWeatherInformationReturn> {
  let fetchResponse: FetchWeatherInformationReturn;

  const endpoint = `/api/${params.cityValue}`;
  const requestParams = { myApiSecret: params.myApiSecret };
  const config: AxiosRequestConfig<any> = { params: requestParams };

  try {
    const data = await axios.get(endpoint, config);
    setTimeout(() => params.setLoadingWeather(false), 5000);
    fetchResponse = await data.data;
  } catch (error) {
    fetchResponse = {
      cod: 502,
      msg: "Ocorreu um problema com a conexão com o servidor. Aguarde um pouco e tente novamente!",
    };
  }

  return fetchResponse;
}

function verifyResponse(params: VerifyResponseParams) {
  if (params.information.cod === 200) {
    params.setAlertStatus("success");
    params.setAlertTitle("Cidade encontrada!");
    renderInformations(
      params.information as FoundDataOfRequest,
      params.citySelectionProps
    );
  } else {
    params.setAlertStatus("error");
    params.setAlertTitle("Cidade não encontrada!");
    const informationFailed = params.information as NotFoundDataOfRequest;
    renderErr(informationFailed.msg, params.citySelectionProps);
  }

  setTimeout(() => params.setAlertIsOpen(false), 5000);
}
