//Estilos de Textos para as páginas

import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const TextStyles = StyleSheet.create({
  welcomeText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: windowWidth * windowHeight * 0.00008,
    color: '#205072',
    position: 'absolute',
    marginTop: 10,
    marginLeft: windowWidth * 0.055,
  },
  welcomeSubText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: windowWidth * windowHeight * 0.00006,
    color: '#7BE495',
    position: 'absolute',
    marginTop: 30,
    marginLeft: windowWidth * 0.07,
  },

  //Textos Tela de Perfil
  welcomeText2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: windowWidth * windowHeight * 0.00008,
    color: '#205072',
    position: 'absolute',
    marginTop: 10,
    width: '100%',
    marginLeft: windowWidth * 0.8,
  },
  welcomeSubText2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: windowWidth * windowHeight * 0.00006,
    color: '#7BE495',
    width: '100%',
    position: 'absolute',
    marginTop: 30,
    marginLeft: windowWidth * 0.82,
  },
  //

  //Textos Tela de Perfil
  welcomeText3: {
    fontFamily: 'Montserrat-Bold',
    fontSize: windowWidth * windowHeight * 0.00008,
    color: '#205072',
    width: '100%',
    position: 'absolute',
    marginTop: 10,
    marginLeft: windowWidth * 0.92,
  },
  welcomeSubText3: {
    fontFamily: 'Montserrat-Bold',
    fontSize: windowWidth * windowHeight * 0.00006,
    width: '100%',
    color: '#7BE495',
    marginLeft: windowWidth * 0.93,
    position: 'absolute',
    marginTop: 30,
  },
  //
  cText: {
    fontSize: windowHeight * 0.06,
    height: windowHeight * 0.1,
    marginTop: 10,
    fontFamily: 'MrsSheppards-Regular',
    color: '#56C596',
    alignSelf: 'center',
  },
  cText2: {
    fontFamily: 'MrsSheppards-Regular',
    color: '#56C596',

    fontSize: 288,
    marginBottom: 100,
  },

  cText3: {
    fontFamily: 'MrsSheppards-Regular',
    color: '#56C596',
    width: 20,
    height: 20,
    fontSize: 18,
  },
  mainBlueText: {
    fontSize: windowHeight * 0.025,
    fontFamily: 'Montserrat-Bold',
    color: '#282a36',
    alignSelf: 'center',
  },
  mainBlueText2: {
    fontSize: windowHeight * 0.025,
    marginBottom: windowHeight * 0.02,
    fontFamily: 'Montserrat-Bold',
    color: '#282a36',
    alignSelf: 'center',
  },
  mainBlueText3: {
    fontSize: windowHeight * 0.025,
    width: windowWidth * 0.9,
    fontFamily: 'Montserrat-Bold',
    color: '#282a36',
    alignSelf: 'center',
  },
  subBlueText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: windowHeight * 0.02,
    color: '#282a36',
    alignSelf: 'center',
    marginTop: windowHeight * 0.03,
    marginBottom: windowHeight * 0.01,
  },
  mainGreenText: {
    fontSize: windowHeight * 0.02,
    fontFamily: 'Montserrat-Bold',
    marginTop: '2%',
    color: '#7BE495',
    alignSelf: 'center',
  },

  mainWhiteText: {
    fontSize: windowHeight * 0.02,
    fontFamily: 'Montserrat-Bold',
    marginTop: '2%',
    color: '#FFFFFF',
    alignSelf: 'center',
  },

  mainGreenText2: {
    fontSize: windowHeight * 0.025,
    fontFamily: 'Montserrat-Bold',
    marginTop: '2%',
    color: '#7BE495',
    alignSelf: 'center',
  },
  subGreenText2: {
    fontSize: windowHeight * 0.025,
    fontFamily: 'Montserrat-Bold',
    color: '#7BE495',
    alignSelf: 'center',
  },
  subGreenText: {
    fontSize: windowHeight * 0.02,
    fontFamily: 'Montserrat-Bold',
    color: '#7BE495',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: windowHeight * 0.018,

    fontFamily: 'Montserrat-Bold',
    marginTop: '3%',
  },
  whiteButtonText: {
    fontSize: windowWidth * 0.04,
    fontFamily: 'Montserrat-Bold',
    color: 'red',
    alignSelf: 'center',
    marginTop: windowHeight * 0.02,
  },
  bottomText: {
    fontSize: windowHeight * 0.02,
    fontFamily: 'Montserrat-Bold',
    marginTop: '3%',
    color: '#68B2A0',
    alignSelf: 'center',
  },
  bottomRowText: {
    fontSize: windowHeight * 0.02,
    fontFamily: 'Montserrat-Bold',
    color: '#282a36',
    alignSelf: 'center',
  },
  middleBlueText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: windowHeight * 0.025,
    color: '#282a36',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 2,
  },
  middleGreenText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: windowHeight * 0.02,
    color: '#7BE495',
    alignSelf: 'center',
    marginTop: 2,
    marginBottom: 10,
  },
  middleBlueText2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: windowWidth * 0.06,
    color: '#282a36',
    marginLeft: windowWidth * 0.09,
    marginTop: windowHeight * 0.04,
  },
  middleBlueText3: {
    fontFamily: 'Montserrat-Regular',
    fontSize: windowWidth * 0.035,
    width: '80%',
    color: '#282a36',
    opacity: 0.5,
    marginLeft: windowWidth * 0.06,
    textAlign: 'justify',
  },
  middleGreenText2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: windowWidth * 0.04,
    color: '#7BE495',
    marginLeft: windowWidth * 0.09,

    marginBottom: windowHeight * 0.02,
  },

  middleGreenText3: {
    fontFamily: 'Montserrat-Bold',
    fontSize: windowWidth * 0.04,
    color: '#7BE495',
    marginLeft: windowWidth * 0.06,
    marginTop: '5%',
  },

  coloredButtonText: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    fontSize: windowWidth * 0.023,
  },
  text1: {
    fontFamily: 'Montserrat-Medium',
    color: '#205072',
    opacity: 0.34,
    fontSize: windowHeight * 0.018,
  },
  text2: {
    fontFamily: 'Montserrat-Regular',
    color: '#282a36',
    fontSize: windowHeight * 0.021,
    marginTop: windowHeight * 0.005,
  },
  text3: {
    fontFamily: 'Montserrat-Medium',
    color: '#205072',
    opacity: 0.34,
    fontSize: windowHeight * 0.015,
    marginTop: windowHeight * 0.005,
  },
  text4: {
    fontFamily: 'Montserrat-Regular',
    color: '#205072',
    fontSize: windowWidth * 0.033,
    alignSelf: 'center',
    marginTop: windowHeight * 0.03,
  },
  text5: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#282a36',
    fontSize: windowHeight * 0.021,
    marginTop: windowHeight * 0.005,
  },
  middleMainText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: windowWidth * 0.045,
    color: '#282a36',
    alignSelf: 'center',
    marginTop: windowHeight * 0.025,
    marginBottom: windowHeight * 0.03,
  },

  //Texto Hospital/UBS Achado
  speciality: {
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    color: '#205072',
  },
  mainTextHospital: {
    fontSize: windowWidth * 0.05,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Bold',
    color: '#282a36',
    marginTop: 15,
  },
  subTextHospital: {
    fontSize: windowWidth * 0.04,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'justify',
    color: '#282a36',
  },
  subTextHospital2: {
    color: '#7BE495',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'justify',
    marginTop: windowHeight * 0.005,
  },
  specialitySubText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#7BE495',
    marginTop: 10,
  },
  score: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#7BE495',
  },
  //

  //Texto Admin
  dataText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: windowHeight * 0.02,
    color: '#205072',
    alignSelf: 'center',
    marginTop: 5,
  },
  dataText2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    color: '#7BE495',
    alignSelf: 'center',
  },
  textError: {
    color: '#FF0000',
    fontSize: 15,
    alignSelf: 'flex-start',
    marginLeft: 50,
    marginTop: 5
  },
  textError2: {
    color: '#FF0000',
    fontSize: 15,
    alignSelf: 'flex-start',
    marginLeft: 50,
    margin: 10
  }
  //
});
