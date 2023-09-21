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
        feels_like={props.feels_like}
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
        feels_like={props.feels_like}
        humidity={props.humidity}
        uvi={props.uvi}
        pop={snow.snow}
      >
        Neve
      </DetailsOnPreciptation>
    );
  } else
    return (
      <Details
        feels_like={props.feels_like}
        pop={props.pop}
        humidity={props.humidity}
        uvi={props.uvi}
      />
    );
}

function DetailsOnPreciptation(
  props: TemperatureDetailsTypes.DetailsOnPreciptationProps
) {
  return (
    <Details
      feels_like={props.feels_like}
      humidity={props.humidity}
      uvi={props.uvi}
    >
      <Stack direction="row" width="100%" justifyContent="space-between">
        <Text
          color={colors.white.main}
          textAlign="center"
          fontWeight="400"
          m="0"
        >
          {props.children}:
        </Text>
        <Text>{`${props.pop}mm`}</Text>
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
      borderRadius="1rem"
      bg={colors.black.opacity}
      color={colors.white.main}
      w="22rem"
      h="8rem"
    >
      <Stack align="center" justify="space-between" w="100%">
        {props.feels_like ? (
          <Text
            color={colors.white.main}
            display="flex"
            justifyContent="space-between"
            width="100%"
            textAlign="center"
            fontWeight="400"
            m="0"
          >
            Sensação Térmica:{" "}
            <Text display="flex">
              {props.feels_like}
              <Text position="relative" insetY={1} fontSize=".5rem">
                °C
              </Text>
            </Text>
          </Text>
        ) : null}
        <Text
          color={colors.white.main}
          display="flex"
          justifyContent="space-between"
          width="100%"
          textAlign="center"
          fontWeight="400"
          m="0"
        >
          Umidade: <Text>{`${props.humidity}%`}</Text>
        </Text>
        <Text
          color={colors.white.main}
          display="flex"
          justifyContent="space-between"
          width="100%"
          textAlign="center"
          fontWeight="400"
          m="0"
        >
          Índice UV: <Text>{`${props.uvi}%`}</Text>
        </Text>
        {props.pop ? (
          <Text
            color={colors.white.main}
            display="flex"
            justifyContent="space-between"
            width="100%"
            textAlign="center"
            fontWeight="400"
            m="0"
          >
            Precipitação: <Text>{`${props.pop}%`}</Text>
          </Text>
        ) : null}
      </Stack>

      {props.children == undefined ? null : props.children}
    </Stack>
  );
}
