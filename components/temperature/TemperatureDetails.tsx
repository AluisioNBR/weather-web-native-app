import type {
  Rain,
  Snow,
} from "../../types/submitCity/weatherStateReducer.types";
import type * as TemperatureDetailsTypes from "../../types/temperature/TemperatureDetails.types";

import { Stack, Text } from "@chakra-ui/react";
import { colors } from "../../styles/colors";

export function TemperatureDetails(
  props: TemperatureDetailsTypes.TemperatureDetailsProps
) {
  if (props.rain.rainy === "rain") {
    const rain = props.rain as Rain;
    return (
      <DetailsOnPreciptation
        humidity={props.humidity}
        uvi={props.uvi}
        pop={rain.rain}
      >
        Chuva
      </DetailsOnPreciptation>
    );
  } else if (props.snow.snowed === "snow") {
    const snow = props.snow as Snow;
    return (
      <DetailsOnPreciptation
        humidity={props.humidity}
        uvi={props.uvi}
        pop={snow.snow}
      >
        Neve
      </DetailsOnPreciptation>
    );
  } else return <Details humidity={props.humidity} uvi={props.uvi} />;
}

function DetailsOnPreciptation(
  props: TemperatureDetailsTypes.DetailsOnPreciptationProps
) {
  return (
    <Details humidity={props.humidity} uvi={props.uvi}>
      <Stack align="center">
        <Text
          color={colors.white.main}
          textAlign="center"
          fontWeight="400"
          m="0"
        >
          {props.children}: {`${props.pop}mm`}
        </Text>
      </Stack>
    </Details>
  );
}

function Details(props: TemperatureDetailsTypes.DetailsProps) {
  return (
    <Stack
      direction="column"
      align="center"
      justify="center"
      p="1rem"
      borderRadius="2rem"
      bg={colors.black["1"]}
      color={colors.white.main}
      w="20rem"
      h="4rem"
    >
      <Stack direction="row" align="center" justify="space-between" w="100%">
        <Text
          color={colors.white.main}
          textAlign="center"
          fontWeight="400"
          m="0"
        >
          Umidade: {`${props.humidity}%`}
        </Text>
        <Text
          color={colors.white.main}
          textAlign="center"
          fontWeight="400"
          m="0"
        >
          Índice UV: {`${props.uvi}%`}
        </Text>
      </Stack>

      {props.children == undefined ? null : props.children}
    </Stack>
  );
}
