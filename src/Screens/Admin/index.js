/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Dimensions,ScrollView} from 'react-native';
import ExitIcon from 'react-native-vector-icons/AntDesign';
/*import Development from '../../../images/webdevelopment.svg';
import HospitalIcon from '../../../images/hhospital.svg';
import Hospital from '../../../images/hospitalicon.svg';
import Group from '../../../images/groupicon.svg';*/
import {ContainerStyles, TextStyles, ViewStyles} from '../../styles';

const windowHeight = Dimensions.get('window').height;
export default class AdminScreen extends React.Component {
  componentDidMount() {
    Dimensions.addEventListener('change', this.onChange);
  }
  /*componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange);
  }*/
  render() {
    return (
      <ScrollView style={ContainerStyles.containerAdmin}>
        <View style={ContainerStyles.welcomeContainerInfo2}>
          {/*<Development height={windowHeight * 0.23} />*/}
        </View>
        <Text style={TextStyles.middleMainText}>
          Página do Administrador
        </Text>

        <View style={[ViewStyles.separator, {marginTop: 10}]} />
      
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddUserScreen')}>
          <View style={ContainerStyles.infoContainer}>
            <View style={ContainerStyles.containerIcons}>
              {/*<HospitalIcon width={40} height={40} />*/}
            </View>
            <View style={ContainerStyles.textContainer}>
              <Text style={TextStyles.text1}>Usuários</Text>
              <Text style={TextStyles.text2}>Adicionar usuário</Text>
              <Text style={TextStyles.text3}>Adicione um usuário</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={ViewStyles.separator} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ListUsersScreen')}>
          <View style={ContainerStyles.infoContainer}>
            <View style={ContainerStyles.containerIcons}>
              {/*<HospitalIcon width={40} height={40} />*/}
            </View>
            <View style={ContainerStyles.textContainer}>
              <Text style={TextStyles.text1}>Informações de usuários</Text>
              <Text style={TextStyles.text2}>Usuários</Text>
              <Text style={TextStyles.text3}>Editar e excluir usuários</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={ViewStyles.separator} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AdminHospitalScreen')}>
          <View style={ContainerStyles.infoContainer}>
            <View style={ContainerStyles.containerIcons}>
              {/*<HospitalIcon width={40} height={40} />*/}
            </View>
            <View style={ContainerStyles.textContainer}>
              <Text style={TextStyles.text1}>Centros médicos</Text>
              <Text style={TextStyles.text2}>Cadastrar centro médico</Text>
              <Text style={TextStyles.text3}>Cadastre um centro médico</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={ViewStyles.separator} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('CenterMedicalScreen')}>
          <View style={ContainerStyles.infoContainer}>
            <View style={ContainerStyles.containerIcons}>
              {/*<Hospital width={40} height={40} />*/}
            </View>
            <View style={ContainerStyles.textContainer}>
              <Text style={TextStyles.text1}>Informações de Centros Médicos</Text>
              <Text style={TextStyles.text2}>Centros médicos</Text>
              <Text style={TextStyles.text3}>
                Editar e excluir Centros Médicos
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={ViewStyles.separator} />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('AdminChooseTypeCover')
          }>
          <View style={ContainerStyles.infoContainer}>
            <View style={ContainerStyles.containerIcons}>
              {/*<Group width={40} height={40} />*/}
            </View>
            <View style={ContainerStyles.textContainer}>
              <Text style={TextStyles.text1}>Cobertura de endereços</Text>
              <Text style={TextStyles.text2}>Cadastrar endereços</Text>
              <Text style={TextStyles.text3}>Cadastre endereços com dados</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={ViewStyles.separator} />

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AdminEditAddress')}>
          <View style={ContainerStyles.infoContainer}>
            <View style={ContainerStyles.containerIcons}>
              {/*<Group width={40} height={40} />*/}
            </View>
            <View style={ContainerStyles.textContainer}>
              <Text style={TextStyles.text1}>Cobertura de endereços</Text>
              <Text style={TextStyles.text2}>Endereços</Text>
              <Text style={TextStyles.text3}>Gerencie seus endereços</Text>
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

        
     
      </ScrollView>
    );
  }
}
