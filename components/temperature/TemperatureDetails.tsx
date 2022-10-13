import { AdditionalInformations } from './AdditionalInformations'

import type { Rain, Snow } from '../../types/submitCity/weatherStateReducer.types'
import type * as TemperatureDetailsTypes from '../../types/temperature/TemperatureDetails.types'

import { Stack } from "@chakra-ui/react";
import { AppColors } from "../../styles/AppColors";

export function TemperatureDetails(props: TemperatureDetailsTypes.TemperatureDetailsProps) {
  if(props.rain.rainy === "rain"){
    const rain = props.rain as Rain
    return (
      <DetailsOnPreciptation
        humidity={props.humidity} uvi={props.uvi}
        pop={rain.rain}
      >
        Chuva
      </DetailsOnPreciptation>
    )
  }
  else if(props.snow.snowed === "snow"){
    const snow = props.snow as Snow
    return (
      <DetailsOnPreciptation 
        humidity={props.humidity} uvi={props.uvi}
        pop={snow.snow}
      >
        Neve
      </DetailsOnPreciptation>
    )
  }
  else
    return <Details humidity={props.humidity} uvi={props.uvi} />
}

function DetailsOnPreciptation(props:  TemperatureDetailsTypes.DetailsOnPreciptationProps) {
  return (
    <Details humidity={props.humidity} uvi={props.uvi}>
        <Stack align='center'>
          <AdditionalInformations value={`${props.pop}mm`}>{props.children}</AdditionalInformations>
        </Stack>
    </Details>
    )
}

function Details(props: TemperatureDetailsTypes.DetailsProps) {
  return (
    <Stack
      direction='column' align='center' justify='center'
      p='1rem' borderRadius='2rem' bg={AppColors.Black1}
      color={AppColors.MainWhite} w='20rem' h='4rem'
    >
      <Stack direction='row' align='center' justify='space-between' w='100%'>
        <AdditionalInformations value={`${props.humidity}%`}>
          Umidade
        </AdditionalInformations>
        <AdditionalInformations value={`${props.uvi}%`}>
          Índice UV
        </AdditionalInformations>
      </Stack>

      {props.children == undefined ? null: props.children}
    </Stack>
  )
}
