import { AppColors } from "../styles/AppColors";

import { MainTemperature } from './temperature/MainTemperature'
import { TemperatureDetails } from './temperature/TemperatureDetails'

import Image from "next/image"
import PinImage from "../assets/pin-localization.png";

import { Heading, Stack } from "@chakra-ui/react";

import type { CurrentTemperatureProps, LocalizationProps } from '../types/CurrentTemperature.types'

export function CurrentTemperature(props: CurrentTemperatureProps) {
  if (props.visibility)
    return (
      <Stack align='center' justify='center'>
        <Localization
          city={props.city}
          state={props.state}
        />

        <MainTemperature
          icon={props.children.icon}
          temperature={props.children.temp}
          feels_like={props.children.feels_like}
          description={props.children.description}
        />

        <TemperatureDetails
          humidity={props.children.humidity}
          uvi={props.children.uvi}
          rain={props.children.rain}
          snow={props.children.snow}
        />
      </Stack>
    );
  else
    return (
      <Heading
        as='h2' fontSize='1.8rem'
        color={AppColors.MainWhite} textAlign='center'
      >
        {props.msg}
      </Heading>
    )
}

function Localization(props: LocalizationProps) {
  const { city, state } = props
  return(
    <Stack direction='row' align='center'>
      <Image
        width='32'
        height='32'
        src={PinImage}
        alt='Pin de Localização'
      />
      
      <Heading as='h2' fontSize='1.8rem' color={AppColors.MainWhite} textAlign='center'>
        {city}, {state}
      </Heading>
    </Stack>
  )
}