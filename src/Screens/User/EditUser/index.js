/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Androw from 'react-native-androw';
//import Arrow from '../../images/arrow-left-curved.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInputMask} from 'react-native-masked-text';
import api from '../../../services/api';
import {Button} from 'react-native-paper';
import {
  ButtonStyles,
  ContainerStyles,
  InputStyles,
  TextStyles,
  ViewStyles,
} from '../../../styles';
const windowHeight = Dimensions.get('window').height;
export default class EditHospitalPage extends React.Component {
  constructor(props) {
    super(props);

    this.getData();
  }
  state = {
    name: '',
    username: '',
    email: '',
    cpf: '',
    errorMessageCpf: '',
    errorMessageEmail: '',
    errorMessageName: '',
    errorMessageUserName: '',
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({screenHeight: contentHeight});
  };
  onChangeHandle(state, value) {
    this.setState({
      [state]: value,
    });
  }
  onChange = ({window, screen}) => {
    this.setState({dimensions: {window, screen}});
  };

  componentDidMount() {
    Dimensions.addEventListener('change', this.onChange);
  }

  /*componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange);
  }*/
  goBack = async () => {
    this.setState({
      name: '',
      username: '',
      email: '',
      cpf: '',
    });
    this.props.navigation.push('Admin');
  };

  back = async () => {
    if(AsyncStorage.getItem('type') === 1){
      this.props.navigation.navigate('Admin')
    }else{
      this.props.navigation.navigate('UserScreen')
    }
  };
  getData = async () => {
    try {
      const valCpf = await AsyncStorage.getItem('cpfUser');
      if (valCpf != null) {
        api
          .get('userCpf/' + valCpf)
          .then(async res => {
            await AsyncStorage.setItem('idUser', res.data[0].id.toString());
            this.setState({
              name: res.data[0].name,
              username: res.data[0].username,
              email: res.data[0].email,
              cpf: res.data[0].cpf,
            });
          })
          .catch(err => {
            alert('Algo deu errado!' + err);
          });
      }
      //valor armazenado
    } catch (e) {
      //mensagem de erro
    }
  };

  doDelete = async () => {
    const valID = await AsyncStorage.getItem('idHospitalEdit');
    api
      .delete('hospital/' + valID)
      .then(res => {
        this.setState({
          cep: '',
          number: null,
          district: '',
          street: '',
          city: '',
          uf: '',
          name: '',
          phone: '',
          image: '',
          latitude: '',
          longitude: '',
        });
        AsyncStorage.removeItem('idHospitalEdit');
        this.props.navigation.push('MedicalCenterMain');
      })
      .catch(() => {
        alert('Algo deu errado!');
      });
  };
  checkFieldEmpty(name, username) {
    var errors = 0;
    if (!name) {
      this.setState({
        errorMessageName: 'Campo obrigatório!',
      });
      errors++;
    }
    if (!username) {
      this.setState({
        errorMessageUserName: 'Campo obrigatório!',
      });
      errors++;
    }
    if (errors > 0) {
      return false;
    } else {
      return true;
    }
  };
  doEdit = async () => {
    let errors = false;
    if (!this.cpf.isValid()) {
      errors = true;
      this.setState({
        errorMessageCpf: 'Digite um CPF valido!',
      });
      
    }
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(this.state.email).toLowerCase())) {
      errors = true;
      this.setState({
        errorMessageEmail: 'Digite um email valido!',
      });
      
    }

    if (this.checkFieldEmpty(this.state.name, this.state.username) === false) {
      errors = true;
    }

   console.log(errors)
    if (errors === false) {
      const valID = await AsyncStorage.getItem('idUser');
      const {name, username, email, cpf} = this.state;
      const req = {
        name: name,
        username: username,
        email: email,
        cpf: cpf.replaceAll('.', '').replaceAll('-', ''),
      };
      if (name && username && email && cpf) {
        api
          .put('user2/' + valID, req)
          .then(() => {
            alert('Mudança realizada com sucesso!');
            this.props.navigation.navigate('UserScreen');
          })
          .catch(() => {
            alert('Mudança deu errada!');
          });
      } else {
        alert('Preencha todos os campos de dados!');
      }
    }
  };
  render() {
    const scrollEnabled = this.state.screenHeight > windowHeight;
    const {name, username, email, cpf} = this.state;
    return (
      <SafeAreaView style={ContainerStyles.sContainer}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={ContainerStyles.scrollView}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}>
          <View
            style={[
              ContainerStyles.containerNoAlign,
              {justifyContent: 'flex-start'},
            ]}>
            <View style={ContainerStyles.welcomeContainer}>
              <View style={ViewStyles.circle4}>
                <TouchableOpacity
                  onPress={() => this.back()}
                  hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
                  {/*<Arrow />*/}
                </TouchableOpacity>
              </View>
            </View>

            <View style={ContainerStyles.container}>
              <Text
                style={[
                  TextStyles.mainBlueText3,
                  {alignSelf: 'center', width: '80%'},
                ]}>
                {name}
              </Text>
              <Text style={TextStyles.mainGreenText}>
                Altere os campos com dados válidos{' '}
              </Text>
              <Text style={TextStyles.subGreenText}>
                do Usuário para alterá-lo leleklek
              </Text>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 20,
                  width: 120,
                  height: 120,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  elevation: 5,
                }}>
                <Icon name="user" size={65} color="#282a36" />
              </View>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="Nome"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    style={InputStyles.inputBox}
                    placeholderTextColor="#D0DAD1"
                    underlineColor="#FFFFFF"
                    theme={{
                      colors: {
                        text: '#282a36',
                        primary: '#7BE495',
                        placeholder: '#D0DAD1',
                      },
                      fonts: {regular: ''},
                      roundness: 18,
                    }}
                    value={name}
                    onChangeText={value => (
                      this.onChangeHandle('name', value),
                      this.setState({
                        errorMessageName: null,
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageName}
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="Username"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    ref={input => {
                      this.username = input;
                    }}
                    style={InputStyles.inputBox}
                    placeholderTextColor="#D0DAD1"
                    underlineColor="#FFFFFF"
                    theme={{
                      colors: {
                        text: '#282a36',
                        primary: '#7BE495',
                        placeholder: '#D0DAD1',
                      },
                      fonts: {regular: ''},
                      roundness: 18,
                    }}
                    value={username}
                    onChangeText={value => (
                      this.onChangeHandle('username', value),
                      this.setState({
                        errorMessageUserName: null,
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageUserName}
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="Email"
                    keyboardType="numeric"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    ref={input => {
                      this.email = input;
                    }}
                    style={InputStyles.inputBox}
                    placeholderTextColor="#D0DAD1"
                    underlineColor="#FFFFFF"
                    theme={{
                      colors: {
                        text: '#282a36',
                        primary: '#7BE495',
                        placeholder: '#D0DAD1',
                      },
                      fonts: {regular: ''},
                      roundness: 18,
                    }}
                    value={email}
                    onChangeText={value => (
                      this.onChangeHandle('email', value),
                      this.setState({
                        errorMessageEmail: null,
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageEmail}
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInputMask
                    mode="outlined"
                    placeholder="CPF"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    ref={input => {
                      this.cpf = input;
                    }}
                    style={InputStyles.inputBox}
                    placeholderTextColor="#D0DAD1"
                    underlineColor="#000000"
                    theme={{
                      fonts: {regular: ''},
                      roundness: 18,
                    }}
                    type={'cpf'}
                    value={cpf}
                    onChangeText={value => (
                      this.onChangeHandle('cpf', value),
                      this.setState({
                        errorMessageCpf: null,
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageCpf}
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#282a36', '#161616']}
                  style={[ViewStyles.linearGradient, {marginTop: 40}]}>
                  <TouchableOpacity
                    style={ButtonStyles.customButton}
                    onPress={() => this.doEdit()}>
                    <Button color="white">
                      <Text style={TextStyles.buttonText}>EDITAR USUÁRIO</Text>
                    </Button>
                  </TouchableOpacity>
                </LinearGradient>
              </Androw>
            </View>
            <View style={ContainerStyles.containerSignupBottom} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
