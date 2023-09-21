import { HStack, useMediaQuery } from "@chakra-ui/react";
import { DayWeather } from "../types/submitCity/weatherStateReducer.types";
import { TemperaturesContainerProps } from "../types/TemperaturesContainer.types";
import { getCurrentDate, returnDate } from "./functions/dailyContainer";
import { TemperatureButton } from "./temperature/TemperatureButton";

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
    console.log(dateToReturn);

    return (
      <TemperatureButton type="day" title={dateToReturn} key={dateToReturn}>
        {day}
      </TemperatureButton>
    );
  }

  if (!isVisible || temperatures.length == 0) return null;
  else
    return (
      <HStack
        align="center"
        overflow="auto"
        paddingY={4}
        w={isLowerThan720 ? "24rem" : "36rem"}
      >
        {temperatures}
      </HStack>
    );
}
