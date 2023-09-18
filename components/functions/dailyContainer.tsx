import { DayNames } from "../../types/DayNames.enum";
import {
  ReturnDateFunctionParams,
  TypeDayName,
} from "../../types/temperature/DayTemperatures.types";

export function getCurrentDate() {
  const currentDate: string[] = [];
  const dateToAnalysis = new Date();
  const dateArray = getDateArray(dateToAnalysis);

  dateArray.forEach((item) => checkDate(item, currentDate));

  const Base = {
    year: Number(currentDate[0]),
    month: dateToAnalysis.getMonth() + 1,
    day: Number(currentDate[2]),
  };

  return [Base.year, Base.month, Base.day];
}

export function returnDate(params: ReturnDateFunctionParams) {
  const date = new Date(params.baseYear, params.baseMonth, params.day);

  const currentDate: string[] = [];
  const dateArray = getDateArray(date);

  dateArray.forEach((item) => checkDate(item, currentDate));

  const dayName = `Day${date.getDay()}` as TypeDayName;
  const dayNumber = getDayOrMonth(currentDate[0]);
  const monthNumber = getDayOrMonth(date.getMonth() + 1);

  return `${DayNames[dayName]}, ${dayNumber}/${monthNumber}/${currentDate[2]}`;
}

function getDateArray(date: Date) {
  return date.toLocaleString().split(" ")[0].split("/");
}

function checkDate(item: string, currentDate: string[]) {
  if (itemIsNotEmptyAndZero(item)) currentDate.push(item);
}

function itemIsNotEmptyAndZero(item: string) {
  return item != "" && item != "00:00:00";
}

function getDayOrMonth(number: string | number): string {
  return dayOrMonthNumberIsLessThan10(number) ? `0${number}` : `${number}`;
}

function dayOrMonthNumberIsLessThan10(number: string | number) {
  return Number(number) < 10;
}
