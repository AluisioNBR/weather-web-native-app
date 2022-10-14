import { Stack, useMediaQuery } from "@chakra-ui/react";
import { DayWeather } from "../types/submitCity/weatherStateReducer.types";
import { TemperaturesContainerProps } from "../types/TemperaturesContainer.types";
import { DayTemperature } from "./temperature/DayTemperature";
import { DayNames } from "../types/temperature/DayTemperatures.types";
import type { ReturnDateFunctionParams, TypeDayName } from "../types/temperature/DayTemperatures.types";

export function DayTemperaturesContainer({ isVisible, children }: TemperaturesContainerProps) {
  const [isLowerThan720] = useMediaQuery('(max-width: 720px)')
  const temperaturesByDay = children as DayWeather[]

  let [
    baseYear,
    baseNumberMonth,
    baseNumberDay
  ] = getCurrentDate()

  const temperatures = temperaturesByDay.map(mapTemperatureHours)

  function mapTemperatureHours(day: DayWeather) {
    const dateToReturn = returnDate({
      baseYear: baseYear,
      baseMonth: (baseNumberMonth - 1),
      day: baseNumberDay
    })
    baseNumberDay += 1
    
    return (
      <DayTemperature key={dateToReturn} date={dateToReturn}>
        {day}
      </DayTemperature>
    )
  }
  
  if((!isVisible) || temperatures.length == 0)
    return null

  else
    return (
      <Stack
        align='center' overflow='scroll'
        w={isLowerThan720 ? '24rem': '36rem'}
      >
        {temperatures}
      </Stack>
    )
}

function getCurrentDate() {
  const currentDate: string[] = []
  const dateToAnalysis = new Date()
  const dateArray = getDateArray(dateToAnalysis)
  
  dateArray.forEach((item) => checkDate(item, currentDate))

  const Base = {
    year: Number(currentDate[2]),
    month: (dateToAnalysis.getMonth()) + 1,
    day: Number(currentDate[0])
  }

  return [Base.year, Base.month, Base.day]
}

function returnDate(params: ReturnDateFunctionParams) {
  const date = new Date(
    params.baseYear,
    params.baseMonth,
    params.day
  )

  const currentDate: string[] = []
  const dateArray = getDateArray(date)
  
  dateArray.forEach((item) => checkDate(item, currentDate))

  const dayName = `${date}`.split(' ')[0] as TypeDayName
  const dayNumber = getDayOrMonth(currentDate[0])
  const monthNumber = getDayOrMonth(date.getMonth() + 1)

  return `${DayNames[dayName]}, ${dayNumber}/${monthNumber}/${currentDate[2]}`
}

function getDateArray(date: Date) {
  return date.toLocaleString().split(' ')[0].split('/')
}

function checkDate (item: string, currentDate: string[]) {
  if(itemIsNotEmptyAndZero(item))
  currentDate.push(item)
}

function itemIsNotEmptyAndZero(item: string){
  return item != "" && item != "00:00:00"
}

function getDayOrMonth(number: string | number): string {
  return dayOrMonthNumberIsLessThan10(number) ? `0${number}`: `${number}`
}

function dayOrMonthNumberIsLessThan10(number: string | number) {
  return Number(number) < 10
}
