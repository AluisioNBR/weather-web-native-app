import { colors } from "../../styles/colors";
import type {
  MainTemperatureProps,
  MainDescriptionProps,
} from "../../types/temperature/MainTemperature.types";

import { Box, Stack, Text } from "@chakra-ui/react";
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

        <Stack direction="row" alignItems="flex-start">
          <Text
            display="flex"
            color={colors.white.main}
            textAlign="center"
            fontSize="4rem"
          >
            {props.temperature}
            <Text position="relative" insetY={5} fontSize="1.2rem">
              °C
            </Text>
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
}

function MainDescription(props: MainDescriptionProps) {
  const imgSize = props.imgSize ? props.imgSize : 34;
  const descriptionSize = props.descriptionSize ? props.imgSize : 22;

  return (
    <Stack align="center" justify="center">
      <Image
        src={props.icon}
        alt="Clima Atual"
        boxSize={imgSize}
        objectFit="cover"
      />
      <Text
        fontFamily={"Poppins"}
        color={colors.white.main}
        textAlign="center"
        fontSize={descriptionSize}
      >
        {props.children}
      </Text>
    </Stack>
  );
}

export { MainTemperature, MainDescription };
