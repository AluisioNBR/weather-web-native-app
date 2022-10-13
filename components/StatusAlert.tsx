import * as React from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { StatusAlertProps } from '../types/StatusAlert.types'

export function StatusAlert(props: StatusAlertProps) {
  if(props.isOpen)
    return (
      <Alert
      	status={props.status} variant='left-accent' w='20rem'
      	pos='absolute' bottom='2rem' right='0'
      >
        <AlertIcon />
        <AlertTitle>
          {props.title}
        </AlertTitle>
        {props.children == undefined ? null:
        <AlertDescription>{props.children}</AlertDescription>}
      </Alert>
    )
  else
    return null
}
