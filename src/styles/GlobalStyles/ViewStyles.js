import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export const ViewStyles = StyleSheet.create({
  loginBackground: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',

  },
  ViewLogo: {
    backgroundColor: '#E7E7E7',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  loginBox: {
    width: width / 1.25,
    height: width / 1.1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  },
  ImputContainer: {
    flexDirection: 'row'
  }

});
