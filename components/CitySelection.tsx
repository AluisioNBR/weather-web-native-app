import { useState, useCallback } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useMediaQuery
} from '@chakra-ui/react'

import { StatusAlert } from "./StatusAlert";
import { submitCity } from "./submitCity/submitCity";
import { AppColors } from "../styles/AppColors";

import type { FormEvent, ChangeEvent } from 'react'
import type { CitySelectionProps } from '../types/CitySelection.types'
import type {
  StatusType,
  StatusState,
  TitleState
} from "../types/StatusAlert.types";

export function CitySelection(props: CitySelectionProps) {
  const [isLowerThan720] = useMediaQuery('(max-width: 720px)')
  const [cityValue, setCityValue] = useState("")

  const [alertStatus, setAlertStatus]: StatusState = useState(undefined as StatusType)
  const [alertTitle, setAlertTitle]: TitleState = useState('')
  const [alertIsOpen, setAlertIsOpen] = useState(false)
  
  const submitFormByEvent = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault()
    submitForm()
  }
  const submitForm = async () => {
    setAlertIsOpen(true)
    setAlertStatus('loading')
    setAlertTitle("Buscando cidade!")
    submitCity({
      cityValue,
      setCityValue,
      citySelectionProps: props,
      setAlertStatus,
      setAlertTitle,
      setAlertIsOpen
    })
  }
  const onCityValueChange = useCallback( (event: ChangeEvent<HTMLInputElement>) => setCityValue(event.target.value), [])

  return (
    <>
      <FormControl as='form' onSubmit={submitFormByEvent}>
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
            onClick={submitForm}
            as='button' variant='solid' p='0.5' bgColor={AppColors.Black1}
            fontFamily='Poppins' fontSize='1.1rem' color={AppColors.MainWhite}
            _hover={{ backgroundColor: AppColors.Black2 }} _active={{ backgroundColor: AppColors.Black3 }}
          >
            Selecionar
          </Button>
        </Stack>
      </FormControl>

      <StatusAlert status={alertStatus} title={alertTitle} isOpen={alertIsOpen}/>
    </>
  );
}
