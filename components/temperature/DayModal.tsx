import {
  Stack,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
} from '@chakra-ui/react'
import { MainDescription } from './MainTemperature';
import { CompostTemperatureDetails } from './CompostTemperatureDetails';
import { InstantsEnum } from '../../types/temperature/DayTemperatures.types';
import { AppColors } from '../../styles/AppColors';
import type * as DayTemperatureTypes from '../../types/temperature/DayTemperatures.types';

export function DayModal(props: DayTemperatureTypes.DayModalProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay/>
      <ModalContent bg={AppColors.MainBlack} borderRadius='2rem'>
        <ModalHeader>
          <Heading as='h3' color={AppColors.MainWhite} textAlign='center'>
            {props.date}
          </Heading>
        </ModalHeader>

        <ModalBody>
          <Stack direction='column' align='center'>
            <MainDescription icon={props.children.icon}>
              {props.children.description}
            </MainDescription>

            <TemperaturesContainer>
              {props.children}
            </TemperaturesContainer>

            <CompostTemperatureDetails>
              {props.children}
            </CompostTemperatureDetails>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <ModalCloseButton color={AppColors.MainWhite}>
            Fechar
          </ModalCloseButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function TemperaturesContainer({ children }: DayTemperatureTypes.ModalTemperaturesContainerProps) {
	const instants: DayTemperatureTypes.instantsType[] = ['morn', 'day', 'eve', 'night']
	const temps = instants.map((instant: DayTemperatureTypes.instantsType) => {
		return (
			<InformationByDayInstants key={instant} dayWeather={children}>
				{instant}
			</InformationByDayInstants>
		)
	})

	return (
		<Box m='2px'>
			<MinMaxTemps
				max={children.temp.max}
				min={children.temp.min}
			/>

			<Stack direction='row'>
				{temps}
			</Stack>
		</Box>
	)
}

function MinMaxTemps(props: DayTemperatureTypes.MinMaxContainerProps){
	return (
		<Stack direction='row' justify='space-evenly'>
			<MinMaxText value={props.max}>Máxima</MinMaxText>
			<MinMaxText value={props.min}>Mínima</MinMaxText>
		</Stack>
	)
}

function MinMaxText(props: DayTemperatureTypes.MinMaxTextProps){
	return (
		<Text
      color={AppColors.MainWhite} fontSize='20px'
      textAlign='center' fontFamily='Poppins'
    >
			{props.children}: {props.value}°C
		</Text>
	)
}

function InformationByDayInstants(props: DayTemperatureTypes.InformationByDayInstantsProps){
	return (
		<Box m='0 12px'>
			<Text
        color={AppColors.MainWhite}
        fontSize='20px' fontFamily='Poppins'
      >
				{InstantsEnum[props.children]}
			</Text>

			<Text
        color={AppColors.MainWhite} fontSize='18px'
        textAlign='center' fontFamily='Poppins'
      >
				{props.dayWeather.temp[props.children]}°C
			</Text>

			<Text
        color={AppColors.Gray1} fontSize='16px'
        textAlign='center' fontFamily='Poppins'
      >
				{props.dayWeather.feels_like[props.children]}°C
			</Text>
		</Box>
	)
}
