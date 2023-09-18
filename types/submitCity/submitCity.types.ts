import type { CitySelectionProps } from "../CitySelection.types";
import type { FoundDataOfRequest, NotFoundDataOfRequest } from "./data.types";
import * as React from "react";
import type { StatusType } from "../StatusAlert.types";

interface submitCityParams {
  cityValue: string;
  setCityValue: React.Dispatch<React.SetStateAction<string>>;
  myApiSecret: string;
  citySelectionProps: CitySelectionProps;
  setAlertStatus: (value: React.SetStateAction<StatusType>) => void;
  setAlertTitle: (value: React.SetStateAction<string>) => void;
  setAlertIsOpen: (value: React.SetStateAction<boolean>) => void;
}

type FetchWeatherInformationReturn = FoundDataOfRequest | NotFoundDataOfRequest;

interface FetchWeatherInformationParams {
  myApiSecret: string;
  cityValue: string;
  setLoadingWeather: React.Dispatch<React.SetStateAction<boolean>>;
}

interface VerifyResponseParams {
  information: FetchWeatherInformationReturn;
  citySelectionProps: CitySelectionProps;
  setAlertStatus: (value: React.SetStateAction<StatusType>) => void;
  setAlertTitle: (value: React.SetStateAction<string>) => void;
  setAlertIsOpen: (value: React.SetStateAction<boolean>) => void;
}

export type {
  submitCityParams,
  FetchWeatherInformationReturn,
  FetchWeatherInformationParams,
  VerifyResponseParams,
};
