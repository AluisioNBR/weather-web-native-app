import { HourlyTemperature } from './temperature/HourTemperature'

import type { HourWeather } from '../types/submitCity/weatherStateReducer.types'
import type { HourlyTemperaturesProps } from '../types/HourlyTemperatures.types'
import { Stack } from '@chakra-ui/react'

function HourlyTemperaturesContainer({ children }: HourlyTemperaturesProps){
  let numberKey = 0
  const temperatures = children.map((hour: HourWeather) => {
    numberKey += 1
    return (
      <HourlyTemperature key={`${hour.hour}=${numberKey}`}>{hour}</HourlyTemperature>
    )
  })

  if(children.length == 0)
    return null
  
  else
    return (
      <Stack direction='row' align='center' overflow='scroll' w='36rem'>
        {temperatures}
      </Stack>
    )
}

export { HourlyTemperaturesContainer }
