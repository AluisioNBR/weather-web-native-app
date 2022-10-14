import { TemperatureDetails } from './TemperatureDetails'
import { AppColors } from '../../styles/AppColors';
import { CompostTemperatureDetailsProps } from '../../types/temperature/TemperatureDetails.types';
import { Box, Stack, Text } from '@chakra-ui/react';

export function CompostTemperatureDetails({ children }: CompostTemperatureDetailsProps){
	return(
		<Box>
			<TemperatureDetails
				humidity={children.humidity}
        uvi={children.uvi}
        rain={children.rain}
        snow={children.snow}
			/>
			
			<Stack align='center'>
        <Text
					fontSize='14' color={AppColors.Gray1}
					m='8' fontFamily='Poppins'
				>
          Precipitação: {`${children.pop}%`}
        </Text>
			</Stack>
		</Box>
	)
}