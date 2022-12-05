//File que checa se o usuário está logado ou não e redireciona para a devida página
import React from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ContainerStyles, TextStyles} from '../styles';
class auth extends React.Component {
  constructor() {
    super();
    this.checkToken();
  }
  checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    const type = await AsyncStorage.getItem('type');
    const remember = await AsyncStorage.getItem('remember');
    setTimeout(() => {
      if (token && type === '2' && remember === 'true') {
        this.props.navigation.navigate('MainScreen');
      } else if (token && type === '1' && remember === 'true') {
        this.props.navigation.navigate('Admin');
      } else {
        this.props.navigation.navigate('InitialScreen');
      }
    }, 2000);
  };
  render() {
    return (
      <View style={ContainerStyles.container}>
        <Text style={TextStyles.cText2}> c </Text>
      </View>
    );
  }
}

export default auth;
