import { HourlyTemperature } from './temperature/HourTemperature'

import type { HourWeather } from '../types/submitCity/weatherStateReducer.types'
import type { TemperaturesContainerProps } from '../types/TemperaturesContainer.types'
import { Stack, useMediaQuery } from '@chakra-ui/react'

function HourlyTemperaturesContainer({ isVisible, children }: TemperaturesContainerProps){
  const [isLowerThan720] = useMediaQuery('(max-width: 720px)')
  const temperaturesByHour = children as HourWeather[]

  let numberKey = 0
  const temperatures = temperaturesByHour.map((hour: HourWeather) => {
    numberKey += 1
    return (
      <HourlyTemperature key={`${hour.hour}=${numberKey}`}>{hour}</HourlyTemperature>
    )
  })

  if((!isVisible) || children.length == 0)
    return null
  
  else
    return (
      <Stack
        direction='row' align='center' overflow='scroll'
        w={isLowerThan720 ? '24rem': '36rem'}
      >
        {temperatures}
      </Stack>
    )
}

export { HourlyTemperaturesContainer }
