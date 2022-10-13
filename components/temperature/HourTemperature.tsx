import { useCallback } from 'react'
import { AppColors } from '../../styles/AppColors'
import { HourModal } from './HourModal'
import type { HourlyTemperatureProps } from '../../types/temperature/HourlyTemperature.types'

import { Stack, Button, Image, Heading, Text, useDisclosure } from '@chakra-ui/react'

export function HourlyTemperature({ children }: HourlyTemperatureProps){
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Button
			onClick={onOpen}
			bg={AppColors.Black1}
			_hover={{ 'background-color': AppColors.Black2 }}
			_active={{ 'background-color': AppColors.Black3 }}
			w='6rem' h='6rem'
			p={20} m={2} borderRadius='2.5rem'
		>
			<HourModal isOpen={isOpen} onClose={onClose}>
				{children}
			</HourModal>

			<Stack w='100%' h='100%' align='center' justify='center'>
				<Heading as='h3' color={AppColors.MainWhite} fontSize='20px'>
					{children.hour}
				</Heading>

				<Stack direction='row' align='center' justify='space-evenly'>
					<Image
						src={children.icon} alt={children.description}
						w='32px' h='32px'
					/>

					<Text color={AppColors.MainWhite} fontSize='32px' fontFamily='Poppins'>
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
