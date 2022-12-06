/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Development from '../../images/webdevelopment.svg';
import HospitalIcon from '../../images/hhospital.svg';
import Hospital from '../../images/hospitalicon.svg';
import Group from '../../images/groupicon.svg';
import {ContainerStyles, TextStyles, ViewStyles} from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExitIcon from 'react-native-vector-icons/AntDesign';

const windowHeight = Dimensions.get('window').height;
export default class UserScreen extends React.Component {
  componentDidMount() {
    Dimensions.addEventListener('change', this.onChange);
  }
  /*componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange);
  }*/
  render() {
    return (
      <View style={ContainerStyles.containerAdmin}>
        <View style={ContainerStyles.welcomeContainerInfo2}>
          {/*<Development height={windowHeight * 0.23} />*/}
        </View>
        <Text style={TextStyles.middleMainText}>
          Menu do Usuário
        </Text>

        <View style={[ViewStyles.separator, {marginTop: 10}]} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('EditUserScreen')}>
          <View style={ContainerStyles.infoContainer}>
            <View style={ContainerStyles.containerIcons}>
              {/*<HospitalIcon width={40} height={40} />*/}
            </View>
            <View style={ContainerStyles.textContainer}>
              <Text style={TextStyles.text1}>Usuário</Text>
              <Text style={TextStyles.text2}>Editar meus dados</Text>
              <Text style={TextStyles.text3}>Edite seus dados</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <View style={ViewStyles.separator} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AdressScreen')}>
          <View style={ContainerStyles.infoContainer}>
            <View style={ContainerStyles.containerIcons}>
              {/*<Group width={40} height={40} />*/}
            </View>
            <View style={ContainerStyles.textContainer}>
              <Text style={TextStyles.text1}>Cobertura de endereços</Text>
              <Text style={TextStyles.text2}>Meus endereços</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={ViewStyles.separator} />

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('LoginScreen')}>
          <View style={ContainerStyles.infoContainer}>
            <View>
             <ExitIcon name="close" size={40} color='#7BE495'/>
            </View>
            <View style={ContainerStyles.textContainer}>
              <Text style={TextStyles.text2}>Sair</Text>
              <Text style={TextStyles.text3}>Voltar para a tela de login</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={ViewStyles.separator} />
      </View>
    );
  }
}  

