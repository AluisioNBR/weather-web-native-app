import type { FoundDataOfRequest } from '../../types/submitCity/data.types'
import type { CitySelectionProps } from '../../types/CitySelection.types';

function renderErr(msg: string, citySelectionProps: CitySelectionProps){
  citySelectionProps.setMsgValue(msg);
  citySelectionProps.setTemperatureVisibility(false);
}
  
function renderInformations(information: FoundDataOfRequest, citySelectionProps: CitySelectionProps){
  citySelectionProps.setLocalization(
    information.city,
    information.state
  )

  citySelectionProps.setCurrentWeather(information.current)
  citySelectionProps.setHourlyWeather(information.hourly)
  citySelectionProps.setDailyWeather(information.daily)

  citySelectionProps.setTemperatureVisibility(true);
}

export { renderInformations, renderErr }