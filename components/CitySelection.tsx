import { useState, useCallback } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useMediaQuery
} from '@chakra-ui/react'

import type { FormEvent, ChangeEvent } from 'react'

import { CitySelectionProps } from '../types/CitySelection.types'
import { submitCity } from "./submitCity/submitCity";
import { AppColors } from "../styles/AppColors";

export function CitySelection(props: CitySelectionProps) {
  const [isLowerThan720] = useMediaQuery('(max-width: 720px)')
  const [cityValue, setCityValue] = useState("")
  
  const submitByEnterCallback = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault()
    submitCity({ cityValue, setCityValue, citySelectionProps: props })
  }
  const submitByButtonCallback = async () => {
    submitCity({ cityValue, setCityValue, citySelectionProps: props })
  }
  const onCityValueChange = useCallback( (event: ChangeEvent<HTMLInputElement>) => setCityValue(event.target.value), [])

  return (
    <FormControl as='form' onSubmit={submitByEnterCallback}>
      <FormLabel
        htmlFor='city-input' color={AppColors.MainWhite}
        textAlign='center' fontFamily='Poppins' fontSize='1.5rem'
      >
        Informe sua cidade:
      </FormLabel>

      <Stack
        direction={isLowerThan720 ? 'column': 'row'}
        align='center' justify='center'
      >
        <Input
          name='city-input' type='text' required={true}
          defaultValue={cityValue} onChange={onCityValueChange}

          fontFamily='Poppins' fontSize='1.1rem' p='0.5'
          bgColor={AppColors.MainWhite} w={isLowerThan720 ? '20rem': '30rem'}
        />

        <Button
          onClick={submitByButtonCallback}
          as='button' variant='solid' p='0.5' bgColor={AppColors.Black1}
          fontFamily='Poppins' fontSize='1.1rem' color={AppColors.MainWhite}
          _hover={{ backgroundColor: AppColors.Black2 }} _active={{ backgroundColor: AppColors.Black3 }}
        >
          Selecionar
        </Button>
      </Stack>
    </FormControl>
    
  );
}
