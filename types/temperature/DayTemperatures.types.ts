import { AppColors } from "../../styles/colors";
import type { DayWeather } from "../submitCity/weatherStateReducer.types";

type TypeDayName = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

enum DayNames {
  Sun = "Domingo",
  Mon = "Segunda",
  Tue = "Terça",
  Wed = "Quarta",
  Thu = "Quinta",
  Fri = "Sexta",
  Sat = "Sábado",
}

interface ReturnDateFunctionParams {
  baseYear: number;
  baseMonth: number;
  day: number;
}

interface DayTemperaturesContainerProps {
  children: any[] | DayWeather[];
}

interface DayTemperatureProps {
  children: DayWeather;
  date: string;
}

interface DayModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  children: DayWeather;
}

interface DayModalInformationsProps {
  children: DayWeather;
  date: string;
}

type instantsType = "morn" | "day" | "eve" | "night";

enum InstantsEnum {
  morn = "Manhã",
  day = "Dia",
  eve = "Tarde",
  night = "Noite",
}

interface InformationByDayInstantsProps {
  children: instantsType;
  dayWeather: DayWeather;
}

interface DayButtonProps {
  children: DayWeather;
  background: AppColors;
  date: string;
}

interface ModalTemperaturesContainerProps {
  children: DayWeather;
}

interface MinMaxContainerProps {
  max: number;
  min: number;
}

interface MinMaxTextProps {
  value: number;
  children: string;
}

export { DayNames, InstantsEnum };

export type {
  TypeDayName,
  ReturnDateFunctionParams,
  DayTemperaturesContainerProps,
  DayTemperatureProps,
  DayButtonProps,
  DayModalProps,
  DayModalInformationsProps,
  ModalTemperaturesContainerProps,
  MinMaxContainerProps,
  MinMaxTextProps,
  instantsType,
  InformationByDayInstantsProps,
};
