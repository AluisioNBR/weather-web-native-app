import { AppColors } from "../../styles/AppColors";
import type { MainTemperatureProps } from "../../types/temperature/MainTemperature.types";

import { Stack, Text } from "@chakra-ui/react";
import { Image } from '@chakra-ui/react'

export function MainTemperature(props: MainTemperatureProps) {
  return (
    <Stack align='center' justify='center'>
      <Stack
        direction='column' align='center' justify='center'
        p='1.5rem' borderRadius='10%'
      >
        <Stack direction='row' align='center' justify='center'>
          <Image
            src={props.icon} alt='Clima Atual'
            boxSize='48px' objectFit='cover'
          />
          <Text color={AppColors.MainWhite} textAlign='center' fontSize='1.5rem'>
            {props.description}
          </Text>
        </Stack>

        <Text color={AppColors.MainWhite} textAlign='center' fontSize='4rem'>
          {props.temperature}°C
        </Text>

        <Text color={AppColors.Gray2} textAlign='center' fontSize='1.2rem'>
          Sensação Térmica: {props.feels_like}°C
        </Text>
      </Stack>
    </Stack>
  );
}