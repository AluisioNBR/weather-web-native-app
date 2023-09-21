import { colors } from "../../styles/colors";
import {
  DayWeather,
  HourWeather,
} from "../../types/submitCity/weatherStateReducer.types";
import { DayModal } from "./DayModal";
import { HourModal } from "./HourModal";

import {
  Stack,
  Button,
  Image,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

interface TemperatureButtonProps {
  children: HourWeather | DayWeather;
  title: string;
  type: "hour" | "day";
}

export function TemperatureButton({
  children,
  title,
  type,
}: TemperatureButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { min, max } = (children as DayWeather).temp;

  return (
    <Button
      onClick={onOpen}
      bg={colors.black.opacity}
      _hover={{ "background-color": colors.gray.opacity }}
      _active={{ "background-color": colors.black.opacity }}
      w="10rem"
      h="12rem"
      p="4rem"
      m="0 2px"
      borderRadius="5"
    >
      {type == "hour" ? (
        <HourModal isOpen={isOpen} onClose={onClose}>
          {children as HourWeather}
        </HourModal>
      ) : (
        <DayModal isOpen={isOpen} onClose={onClose} date={title}>
          {children as DayWeather}
        </DayModal>
      )}

      <Stack w="100%" h="100%" align="center" justify="center">
        <Heading as="h3" color={colors.white.main} fontSize="18px">
          {title}
        </Heading>

        <Stack align="center" justify="space-evenly">
          <Image
            src={children.icon}
            alt={children.description}
            w="54px"
            h="54px"
          />

          <Text color={colors.white.main} fontSize="22px" fontFamily="Poppins">
            {type == "hour" ? `${children.temp}°C` : `${min}°C - ${max}°C`}
          </Text>
        </Stack>
      </Stack>
    </Button>
  );
}
