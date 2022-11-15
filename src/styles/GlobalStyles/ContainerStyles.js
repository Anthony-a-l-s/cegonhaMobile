//Estilos de Containers para as páginas

import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const ContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F0EDED',
    alignItems: 'center',
    height: 500
  },
  container2: {
    flex: 1,
    backgroundColor: '#F0EDED',
  },
  containerNoAlign: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F0EDED',
  },
  containerNoJustify: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  sContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: windowHeight * 0.015,
  },
  checkboxContainer: {
    marginTop: windowHeight * 0.03,
    flexDirection: 'row',
    width: windowWidth * 0.75,
    marginBottom: windowHeight * 0.03,
  },
  upContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: windowHeight * 0.1,
    alignItems: 'center',
  },
  upContainer2: {
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: windowHeight * 0.007,
    alignItems: 'center',
  },
  containerIcons: {
    height: windowHeight * 0.07,
    width: windowWidth * 0.12,
    marginTop: windowHeight * 0.01,
    marginLeft: windowWidth * 0.02,
  },
  //Tela Inicial - Containers
  containerInitialScreenTop: {
    flex: 3,
    backgroundColor: '#F0EDED',
  },
  carouselDots: {
    flex: 0.5,
    marginBottom: 10,
  },
  //

  //Tela de Login - Containers
  containerLogin: {
    backgroundColor: '#F0EDED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 140,
  },
  //Tela de Cadastro - Containers
  containerSignup: {
    backgroundColor: '#F0EDED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSignupBottom: {
    backgroundColor: '#F0EDED',
    marginBottom: 55,
  },
  //

  //Tela de Senha - Containers
  containerPassword: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F0EDED',
  },
  containerInformation: {
    flex: 1,
    backgroundColor: '#F0EDED',
  },
  containerPasswordBottom: {
    backgroundColor: '#F0EDED',
    alignItems: 'center',
    marginTop: 5,
  },
  //

  //Tela de Procura - Containers
  welcomeContainer: {
    backgroundColor: '#F0EDED',
    marginTop: 20,
  },
  doubleInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: windowWidth,
  },
  //

  //Tela de Informações - Containers
  welcomeContainerInfo: {
    backgroundColor: 'white',
    marginTop: 5,
    alignItems: 'center',
    marginLeft: 40,
  },
  welcomeContainerInfo2: {
    backgroundColor: 'white',
    marginTop: 15,
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: windowWidth * 0.04,
    marginTop: windowHeight * 0.01,
    width: windowWidth * 0.55,
  },
  textContainer2: {
    marginLeft: windowWidth * 0.04,
    marginTop: windowHeight * 0.01,
  },

  infoContainer: {
    flexDirection: 'row',
    marginTop: '2%',
    marginBottom: 2,
    width: '90%',
    height: windowHeight * 0.12,
    alignSelf: 'center',
  },

  infoContainer2: {
    flexDirection: 'column',
    marginTop: '2%',
    marginBottom: 2,
    width: '90%',
    height: '100%',

    alignSelf: 'center',
  },


  infoContainer3: {
    flexDirection: 'row',
    marginTop: '2%',
    marginBottom: 2,
  
    alignSelf: 'center',
  },

  //

  //Tela de Suporte - Containers
  welcomeContainerSupport: {
    backgroundColor: 'white',
    marginTop: 5,
    alignItems: 'center',
  },
  //

  //Tela de Hospital/UBS - Achado
  middleContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: windowWidth * 0.8,
    marginTop: windowHeight * 0.015,
    marginBottom: windowHeight * 0.015,
  },
  //

  // Tela de Admin - Find Screen
  containerAdmin: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  //
});
