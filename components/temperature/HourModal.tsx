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
} from '@chakra-ui/react'

import { MainTemperature } from './MainTemperature';
import { TemperatureDetails } from './TemperatureDetails';
import { AppColors } from '../../styles/AppColors';

import { HourWeather } from '../../types/submitCity/weatherStateReducer.types'

interface HourModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: HourWeather
}

export function HourModal(props:  HourModalProps ) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay/>

      <ModalContent>
      <ModalHeader>
        <Heading as='h3' color={AppColors.MainWhite} textAlign='center'>
          {props.children.hour}
        </Heading>
      </ModalHeader>

      <ModalBody>
        <Stack align='center' justify='center'>
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
        <ModalCloseButton>
          Fechar
        </ModalCloseButton>
      </ModalFooter>
      </ModalContent>
    </Modal>
  )
}