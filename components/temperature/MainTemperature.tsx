import { colors } from "../../styles/colors";
import type {
  MainTemperatureProps,
  MainDescriptionProps,
} from "../../types/temperature/MainTemperature.types";

import { Stack, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

function MainTemperature(props: MainTemperatureProps) {
  return (
    <Stack align="center" justify="center">
      <Stack
        direction="column"
        align="center"
        justify="center"
        p="1.5rem"
        borderRadius="10%"
      >
        <MainDescription icon={props.icon}>{props.description}</MainDescription>

        <Text color={colors.white.main} textAlign="center" fontSize="4rem">
          {props.temperature}°C
        </Text>

        <Text color={colors.gray["2"]} textAlign="center" fontSize="1.2rem">
          Sensação Térmica: {props.feels_like}°C
        </Text>
      </Stack>
    </Stack>
  );
}

function MainDescription(props: MainDescriptionProps) {
  const imgSize = props.size == undefined || props.size == 1 ? 34 : 36;
  const fontSize = props.size == undefined || props.size == 1 ? 22 : 24;

  return (
    <Stack direction="row" align="center" justify="center">
      <Image
        src={props.icon}
        alt="Clima Atual"
        boxSize={imgSize}
        objectFit="cover"
      />
      <Text color={colors.white.main} textAlign="center" fontSize={fontSize}>
        {props.children}
      </Text>
    </Stack>
  );
}

export { MainTemperature, MainDescription };
