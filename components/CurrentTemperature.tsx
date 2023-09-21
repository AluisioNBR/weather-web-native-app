import { colors } from "../styles/colors";

import { MainTemperature } from "./temperature/MainTemperature";
import { TemperatureDetails } from "./temperature/TemperatureDetails";

import { Heading, Stack } from "@chakra-ui/react";

import type { CurrentTemperatureProps } from "../types/CurrentTemperature.types";

export function CurrentTemperature(props: CurrentTemperatureProps) {
  if (props.visibility)
    return (
      <Stack align="center" justify="center">
        <MainTemperature
          icon={props.children.icon}
          temperature={props.children.temp}
          description={props.children.description}
        />

        <TemperatureDetails
          feels_like={props.children.feels_like}
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
        as="h2"
        fontSize="1.8rem"
        color={colors.white.main}
        textAlign="center"
      >
        {props.msg}
      </Heading>
    );
}
