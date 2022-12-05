//Estilos de View para as páginas

import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const ViewStyles = StyleSheet.create({
  shadow: {
    width: windowWidth * 0.75,
    shadowColor: '#2C6975',
    shadowOffset: {
      width: 34,
      height: 34,
    },
    shadowOpacity: 0.28,
    shadowRadius: 89,
    alignSelf: 'center',
  },
  shadow2: {
    width: '100%',
    height: '100%',
    shadowColor: '#2C6975',
    shadowOffset: {
      width: 34,
      height: 34,
    },
    shadowOpacity: 0.28,
    shadowRadius: 89,
    alignSelf: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  rowContainer2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  linearGradient: {
    width: windowWidth * 0.75,
    alignSelf: 'center',
    backgroundColor: '#329D9C',
    borderRadius: 34,
    height: windowHeight * 0.075,
    justifyContent: 'center',
    maxWidth: 400,
  },
  linearGradient2: {
    width: windowWidth * 0.75,
    alignSelf: 'center',
    marginTop: windowHeight * 0.04,
    borderRadius: 18,
    height: windowHeight * 0.075,
    justifyContent: 'center',
  },
  linearGradient3: {
    width: windowWidth * 0.35,
    alignSelf: 'center',
    marginTop: '7%',
    borderRadius: 18,
    height: windowHeight * 0.075,
    justifyContent: 'center',
  },
  linearGradient12: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '7%',
    borderRadius: 18,
  },
  linearGradient13: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '7%',
    borderRadius: 18,
  },
  linearGradient14: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '7%',
    borderRadius: 18,
  },
  goBack: {
    marginTop: 10,
    marginLeft: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: '#E0ECDE',
    alignSelf: 'center',
  },
  separator2: {
    width: '90%',
    height: 1,
    backgroundColor: '#E0ECDE',
    marginTop: windowHeight * 0.015,
    marginBottom: windowHeight * 0.015,
  },
  circle: {
    height: 50,
    width: 50,
    marginLeft: windowHeight * 0.35,
    borderRadius: 50,
    backgroundColor: 'transparent',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle2: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginRight: windowWidth * 0.8,
  },
  circle3: {
    height: windowHeight * 0.08,
    width: windowWidth * 0.14,
    borderRadius: 50,
    backgroundColor: 'white',
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: windowWidth * 0.035,
  },
  circle4: {
    height: 50,
    width: 50,
    marginLeft: windowWidth * 0.025,
    borderRadius: 50,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Gradients de procura
  linearGradientFind: {
    width: windowWidth * 0.9,
    alignSelf: 'center',
    marginTop: '6%',
    borderRadius: 18,
    height: windowHeight * 0.07,
    justifyContent: 'center',
  },
  linearGradientFind2: {
    width: windowWidth * 0.88,
    alignSelf: 'center',
    marginTop: windowHeight * 0.05,
    borderRadius: 18,
    height: windowHeight * 0.07,
    justifyContent: 'center',
    marginLeft: 10,
  },
  linearGradientFind3: {
    width: windowWidth * 0.5,
    alignSelf: 'center',
    marginTop: windowHeight * 0.05,
    borderRadius: 18,
    height: windowHeight * 0.07,
    justifyContent: 'center',
    marginLeft: windowWidth * 0.4,
  },
  linearGradientFind4: {
    width: windowWidth * 0.35,
    marginLeft: windowWidth * 0.1,
    marginTop: windowHeight * 0.05,
    borderRadius: 18,
    height: windowHeight * 0.07,
    justifyContent: 'center',
  },
  linearGradientFind5: {
    width: windowWidth * 0.5,
    alignSelf: 'center',
    marginTop: windowHeight * 0.05,
    borderRadius: 18,
    height: windowHeight * 0.07,
    justifyContent: 'center',
    marginLeft: windowWidth * 0.4,
  },
  linearGradientFind6: {
    width: windowWidth * 0.35,
    marginLeft: windowWidth * 0.1,
    marginTop: windowHeight * 0.05,
    borderRadius: 18,
    height: windowHeight * 0.07,
    justifyContent: 'center',
  },
  linearGradientFind7: {
    width: windowWidth * 0.5,
    alignSelf: 'center',

    borderRadius: 18,
    height: windowHeight * 0.07,
    justifyContent: 'center',
    marginLeft: windowWidth * 0.4,
  },
  linearGradientFind8: {
    width: windowWidth * 0.35,
    marginLeft: windowWidth * 0.1,

    borderRadius: 18,
    height: windowHeight * 0.07,
    justifyContent: 'center',
  },
  linearGradientFind9: {
    width: windowWidth * 0.5,
    alignSelf: 'center',
    marginTop: windowHeight * 0.02,
    borderRadius: 18,
    height: windowHeight * 0.07,
    justifyContent: 'center',
    marginLeft: windowWidth * 0.4,
  },
  linearGradientFind10: {
    width: windowWidth * 0.35,
    marginLeft: windowWidth * 0.1,
    marginTop: windowHeight * 0.02,
    borderRadius: 18,
    height: windowHeight * 0.07,
    justifyContent: 'center',
  },
  //

  //Gradient de Support - Tela inteira
  linearGradientSupport: {
    width: '100%',
    alignSelf: 'center',
    marginTop: windowHeight * 0.015,
    height: windowHeight * 0.065,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //

  //Tela de Hospital Achado
  scoreView: {
    marginLeft: 20,
  },
  square: {
    height: windowHeight * 0.15,
    width: windowWidth * 0.55,
    marginTop: 20,

    elevation: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreStars: {
    marginTop: 10,
    marginRight: 20,
  },
  multiSelectContainer:{
  

  }
  //
});
