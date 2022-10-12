import { useCallback, useState } from 'react'
import { AppColors } from '../../styles/AppColors'
import { HourModal } from './HourModal'
import type { HourlyTemperatureProps } from '../../types/temperature/HourlyTemperature.types'

import { Stack, Button, Image, Heading, Text, useDisclosure } from '@chakra-ui/react'

export function HourlyTemperature({ children }: HourlyTemperatureProps){
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [backgroundColor, setBackgroundColor] = useState(AppColors.Black1)
	const pointerDown = () => setBackgroundColor(AppColors.Black3)
	const pointerUp = () => setBackgroundColor(AppColors.Black1)

	return (
		<Button
			onPointerDown={pointerDown}
			onClick={onOpen}
			onPointerUp={pointerUp}
			bg={backgroundColor}
			w='10.3125rem' h='10.3125rem'
			p={12} m={8} borderRadius='2.5rem'
		>
			<HourModal isOpen={isOpen} onClose={onClose}>
				{children}
			</HourModal>

			<Stack direction='row' align='center' justify='center'>
				<Heading as='h3' color={AppColors.MainWhite} fontSize='20px'>
					{children.hour}
				</Heading>

				<Stack direction='row' align='center' justify='space-evenly'>
					<Image
						src={children.icon} alt={children.description}
						w='32px' h='32px'
					/>

					<Text color={AppColors.MainWhite} fontSize='32px' fontFamily='Poppins'>
						{children.temp}॰C
					</Text>
				</Stack>

				<Text color={AppColors.Gray1} textAlign='center' fontFamily='Poppins'>
					{children.feels_like}॰C
				</Text>
			</Stack>
		</Button>
	)
}