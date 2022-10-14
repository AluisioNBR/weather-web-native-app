import { AppColors } from '../../styles/AppColors'
import { HourModal } from './HourModal'
import type { HourlyTemperatureProps } from '../../types/temperature/HourTemperature.types'

import { Stack, Button, Image, Heading, Text, useDisclosure } from '@chakra-ui/react'

export function HourlyTemperature({ children }: HourlyTemperatureProps){
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Button
			onClick={onOpen} bg={AppColors.Black1}
			_hover={{ 'background-color': AppColors.Black2 }}
			_active={{ 'background-color': AppColors.Black3 }}
			w='8rem' h='8rem' p='4rem' m='0 2px' borderRadius='2.5rem'
		>
			<HourModal isOpen={isOpen} onClose={onClose}>
				{children}
			</HourModal>

			<Stack w='100%' h='100%' align='center' justify='center'>
				<Heading as='h3' color={AppColors.MainWhite} fontSize='18px'>
					{children.hour}
				</Heading>

				<Stack direction='row' align='center' justify='space-evenly'>
					<Image
						src={children.icon} alt={children.description}
						w='24px' h='24px'
					/>

					<Text color={AppColors.MainWhite} fontSize='24px' fontFamily='Poppins'>
						{children.temp}°C
					</Text>
				</Stack>

				<Text color={AppColors.Gray1} textAlign='center' fontFamily='Poppins'>
					{children.feels_like}°C
				</Text>
			</Stack>
		</Button>
	)
}
