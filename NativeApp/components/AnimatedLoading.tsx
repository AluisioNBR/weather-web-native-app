import React from 'react';
import { View, Text } from 'react-native';

import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from './colors';

export function AnimatedLoading(){
  return (
    <View 
      style={{
        flex: 1,
        backgroundColor: colors.mainBlack,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={{
        position: 'absolute',
        zIndex: 3,
        color: colors.mainWhite,
        fontWeight: 'bold',
        fontSize: 30
      }}>
        Carregando...
      </Text>

      <LoadingBar />
    </View>
  )
}

function LoadingBar() {
  const rotate = {
    from: {
      transform: [{ rotate: `${0}deg` }],
    },
    to: {
      transform: [{ rotate: `${360}deg` }],
    },
  }
  return (
    <Animatable.View
        animation={rotate}
        iterationCount={Infinity}
        duration={1000}
        style={{ padding: 32 }}
      >
        <LinearGradient
          colors={[colors.gray2, colors.black2]}
          style={{
            width: 220,
            height: 220,
            borderRadius: 200,

            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View style={{
            width: 200,
            height: 200,
            borderRadius: 200,

            backgroundColor: colors.mainBlack,
            
            alignItems: 'center',
            justifyContent: 'center'
          }}></View>
        </LinearGradient>
      </Animatable.View>
  )
}