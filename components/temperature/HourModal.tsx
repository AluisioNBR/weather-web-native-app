import {
  Stack,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { MainTemperature } from "./MainTemperature";
import { TemperatureDetails } from "./TemperatureDetails";
import { colors } from "../../styles/colors";

import type { HourModalProps } from "../../types/temperature/HourTemperature.types";

export function HourModal(props: HourModalProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />

      <ModalContent bg={colors.black.main} borderRadius="2rem">
        <ModalHeader>
          <Heading as="h3" color={colors.white.main} textAlign="center">
            {props.children.hour}
          </Heading>
        </ModalHeader>

        <ModalBody>
          <Stack align="center" justify="center">
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
        </ModalBody>

        <ModalFooter>
          <ModalCloseButton color={colors.white.main}>Fechar</ModalCloseButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
