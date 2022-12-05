//Estilos de Inputs para as páginas

import {StyleSheet, Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;
export const InputStyles = StyleSheet.create({
  inputBox: {
    borderRadius: 17,
    width: '100%',
    height: windowHeight * 0.09,
    alignSelf: 'center',
    fontSize: windowHeight * 0.02,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputBox2: {
    borderRadius: 34,
    width: '100%',
    height: '103%',
    fontSize: windowHeight * 0.02,

    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  inputBox3: {
    borderRadius: 34,
    width: '100%',
    height: '105%',
    fontSize: windowHeight * 0.02,

    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputArea: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  iconEye: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -35
  }
  
});
