import React from 'react';
import styles from "../styles/components/AnimatedLoading.module.css";
import { AppColors } from '../styles/AppColors';

import { Box, Stack, Text } from '@chakra-ui/react';

export function AnimatedLoading(){
  return (
    <Stack
      align='center' justify='center'
      bg={AppColors.MainBlack}
      w='100vw' h='100vh'
    >
      <Text
        pos='absolute' zIndex={3} color={AppColors.MainWhite}
        fontWeight='bold' fontSize='2rem'
      >
        Carregando...
      </Text>

      <LoadingBar />
    </Stack>
  )
}

function LoadingBar() {
  return (
    <Box className={styles.LoadingBar}>
        <Stack
          bgGradient={`linear(to-b, ${AppColors.Gray2}, ${AppColors.Black1})`}
          w='16.1rem' h='16.1rem' borderRadius='100%' align='center' justify='center'
        >
          <Box
            w='15rem' h='15rem'
            borderRadius='100%'
            bg={AppColors.MainBlack}
          ></Box>
        </Stack>
      </Box>
  )
}
