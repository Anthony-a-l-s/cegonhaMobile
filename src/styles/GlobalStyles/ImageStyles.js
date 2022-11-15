//Estilos de Imagens para as páginas

import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const ImageStyles = StyleSheet.create({
  //Tela inicial - Imagens
  imageInitial: {
    height: windowHeight * 0.45,
    width: windowWidth * 0.78,
    alignSelf: 'center',
  },
  //
});
