import { Stack, useMediaQuery } from "@chakra-ui/react";
import { DayWeather } from "../types/submitCity/weatherStateReducer.types";
import { TemperaturesContainerProps } from "../types/TemperaturesContainer.types";
import { DayTemperature } from "./temperature/DayTemperature";
import { getCurrentDate, returnDate } from "./functions/dailyContainer";

export function DayTemperaturesContainer({
  isVisible,
  children,
}: TemperaturesContainerProps) {
  const [isLowerThan720] = useMediaQuery("(max-width: 720px)");
  const temperaturesByDay = children as DayWeather[];

  let [baseYear, baseNumberMonth, baseNumberDay] = getCurrentDate();

  const temperatures = temperaturesByDay.map(mapTemperatureDate);

  function mapTemperatureDate(day: DayWeather) {
    const dateToReturn = returnDate({
      baseYear: baseYear,
      baseMonth: baseNumberMonth - 1,
      day: baseNumberDay,
    });
    baseNumberDay += 1;

    return (
      <DayTemperature key={dateToReturn} date={dateToReturn}>
        {day}
      </DayTemperature>
    );
  }

  if (!isVisible || temperatures.length == 0) return null;
  else
    return (
      <Stack
        align="center"
        overflow="scroll"
        w={isLowerThan720 ? "24rem" : "36rem"}
      >
        {temperatures}
      </Stack>
    );
}
