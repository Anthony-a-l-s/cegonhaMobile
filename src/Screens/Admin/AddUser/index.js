/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import api from '../../../services/api';
//import Arrow from '../../images/arrow-left-curved.svg';
import {Button} from 'react-native-paper';
import {TextInputMask} from 'react-native-masked-text';
import Androw from 'react-native-androw';
import VisibilityIcon from 'react-native-vector-icons/MaterialIcons';
import BackIcon from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';

import {
  ButtonStyles,
  ContainerStyles,
  ComponentStyles,
  InputStyles,
  TextStyles,
  ViewStyles,
} from '../../../styles';
const windowHeight = Dimensions.get('window').height;

export default class AddUserScreen extends React.Component {
  state = {
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    cpf: '',
    street: '',
    number: null,
    securetextPassword: true,
    securetextPasswordConfirmation: true,
    visiblePassword: 'visibility',
    visiblePasswordConfirmation: 'visibility',
    checked: false,
    district: '',
    city: '',
    uf: '',
    cep: '',
    admin: '',
    errorMessageCpf: '',
    errorMessageEmail: '',
    errorMessageName: '',
    errorMessageUserName: '',
    errorMessagePassword: '',
    errorMessagePasswordConfirmation: '',
    errorMessageValidPassword: '',
    errorMessageAdmin: '',
    passwordicon: 'eye',
    passwordicon1: 'eye',
    passwordicon2: 'eye-off',
  };

  onChangeHandle(state, value) {
    this.setState({
      [state]: value,
    });
  }
  onChange = ({window, screen}) => {
    this.setState({dimensions: {window, screen}});
  };
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({screenHeight: contentHeight});
  };
  componentDidMount() {
    Dimensions.addEventListener('change', this.onChange);
  }
  
  /*componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange);
  }*/
  changeIconPassword() {
    if (this.state.visiblePassword === 'visibility-off') {
      this.setState({
        visiblePassword: 'visibility',
        securetextPassword: true,
      });
    } else {
      this.setState({
        visiblePassword: 'visibility-off',
        securetextPassword: false,
      });
    }
  }
  changeIconPasswordConfirmation() {
    if (this.state.visiblePasswordConfirmation === 'visibility-off') {
      this.setState({
        visiblePasswordConfirmation: 'visibility',
        securetextPasswordConfirmation: true,
      });
    } else {
      this.setState({
        visiblePasswordConfirmation: 'visibility-off',
        securetextPasswordConfirmation: false,
      });
    }
  }

   validationPassword(password) {
    var validation = false;
    var letrasMaiusculas = /[A-Z]/;
    var letrasMinusculas = /[a-z]/;
    var numeros = /[0-9]/;
    var caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    if (password.length < 8) {
      return validation;
    }
    var auxMaiuscula = 0;
    var auxMinuscula = 0;
    var auxNumero = 0;
    var auxEspecial = 0;
    for (var i = 0; i < password.length; i++) {
      if (letrasMaiusculas.test(password[i])) auxMaiuscula++;
      else if (letrasMinusculas.test(password[i])) auxMinuscula++;
      else if (numeros.test(password[i])) auxNumero++;
      else if (caracteresEspeciais.test(password[i])) auxEspecial++;
    }
    if (auxMaiuscula > 0) {
      if (auxMinuscula > 0) {
        if (auxNumero > 0) {
          if (auxEspecial) {
            validation = true;
          }
        }
      }
    }

    return validation;
  }

  checkFieldEmpty(name, username, password, passwordConfirmation,admin) {
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
    if (!password) {
      this.setState({
        errorMessagePassword: 'Campo obrigatório!',
      });
      errors++;
    }
    if (!passwordConfirmation) {
      this.setState({
        errorMessagePasswordConfirmation: 'Campo obrigatório!',
      });
      errors++;
    }

    if (admin === '') {
      this.setState({
        errorMessageAdmin: 'Campo obrigatório!',
      });
      errors++;
    }
    if (errors > 0) {
      return true;
    } else {
      return false;
    }
  }

  doSignup() {
    const {
      name,
      username,
      email,
      password,
      cpf,
    } = this.state;
    let errors = false;

    if (!this.cpf.isValid()) {
      errors = true;
      this.setState({
        errorMessageCpf: 'Digite um CPF valido!',
      });
    }

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(email).toLowerCase())) {
      errors = true;
      this.setState({
        errorMessageEmail: 'Digite um email valido!',
      });
    }

    if (
      this.checkFieldEmpty(
        this.state.name,
        this.state.username,
        this.state.password,
        this.state.passwordConfirmation,
        this.state.admin,
      ) === true
    ) {
      errors = true;
    }

    if (this.validationPassword(this.state.password) === false) {
      this.setState({
        errorMessagePassword: 'Senha inválida!',
      });
      errors = true;
    }

    if (
      this.state.passwordConfirmation != '' &&
      this.state.passwordConfirmation != password
    ) {
      errors = true
      this.setState({
        errorMessagePasswordConfirmation: 'Senhas diferentes',
      });
    }
    if (errors === false) {
      const req = {
        name: name,
        username: username,
        email: email,
        password: password,
        cpf: cpf.replaceAll('.', '').replaceAll('-', ''),
        admin: this.state.admin
      };
      api
        .post('/user2', req)
        .then(res => {
          alert('Usuário cadastrado!');
          this.props.navigation.navigate('AdminScreen');
        })
        .catch(err => {
          alert('Algo deu errado!');
          console.log(err);
        });
    }
  }

  render() {
    const scrollEnabled = this.state.screenHeight > windowHeight;
    const {
      name,
      username,
      email,
      password,
      passwordConfirmation,
      cpf,
      street,
      number,
      district,
      city,
      uf,
      cep,
    } = this.state;
    return (
      <SafeAreaView style={ContainerStyles.sContainer}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={ContainerStyles.scrollView}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}>
          <View style={ContainerStyles.containerNoAlign}>
            <View style={ContainerStyles.welcomeContainer}>
              <View style={ViewStyles.circle4}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('AdminScreen')
                  }
                  hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
                    <BackIcon name="back" size={30} color='#7BE495' />
                  {/*<Arrow />*/}
                </TouchableOpacity>
              </View>
            </View>
              <Text style={TextStyles.mainBlueText}>Cadastro de usuário</Text>
              <Text style={TextStyles.mainGreenText}>
                Preencha todos os campos com
              </Text>
              <Text style={TextStyles.subGreenText}>dados válidos</Text>
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
                <Icon name="adduser" size={65} color="#282a36" />
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
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <View style={InputStyles.inputArea}>
                    <TextInput
                      mode="outlined"
                      placeholder="Senha"
                      ref={input => {
                        this.password = input;
                      }}
                      style={InputStyles.inputBox}
                      secureTextEntry={this.state.securetextPassword}
                      placeholderTextColor="#D0DAD1"
                      underlineColor="transparent"
                      theme={{
                        colors: {
                          text: '#282a36',
                          primary: '#7BE495',
                          placeholder: '#D0DAD1',
                        },
                        fonts: {regular: ''},
                        roundness: 18,
                      }}
                      value={password}
                      onChangeText={value => (
                        this.onChangeHandle('password', value),
                        this.setState({
                          errorMessagePassword: null,
                          errorMessageValidPassword: null,
                        })
                      )}
                      fontFamily={'Montserrat-Medium'}
                    />
                    <TouchableOpacity
                      style={InputStyles.iconEye}
                      onPress={() => this.changeIconPassword()}>
                      <VisibilityIcon
                        name={this.state.visiblePassword}
                        color="#D7CFCF"
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessagePassword}
              </Text>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageValidPassword}
              </Text>
              

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <View style={InputStyles.inputArea}>
                    <TextInput
                      mode="outlined"
                      placeholder="Confirmação de senha"
                      ref={input => {
                        this.passwordConfirmation = input;
                      }}
                      style={InputStyles.inputBox}
                      secureTextEntry={this.state.securetextPasswordConfirmation}
                      placeholderTextColor="#D0DAD1"
                      underlineColor="#FFFFFF"
                      theme={{
                        colors: {
                          text: this.state.placeholderTextColor,
                          primary: this.state.outlinePasswordColor,
                          placeholder: this.state.placeholderPasswordColor,
                        },

                        fonts: {regular: ''},
                        roundness: 18,
                      }}
                      value={passwordConfirmation}
                      onChangeText={value => (
                        this.onChangeHandle('passwordConfirmation', value),
                        this.setState({
                          errorMessagePasswordConfirmation: null,
                        })
                      )}
                      fontFamily={'Montserrat-Medium'}
                    />
                    <TouchableOpacity
                      style={InputStyles.iconEye}
                      onPress={() => this.changeIconPasswordConfirmation()}>
                      <VisibilityIcon
                        name={this.state.visiblePasswordConfirmation}
                        color="#D7CFCF"
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessagePasswordConfirmation}
              </Text>

              <Androw style={ViewStyles.shadow}>
                <View
                  style={[
                    ViewStyles.linearGradient2,
                    {
                      height: 68,

                      backgroundColor: '#FFFFFF',
                      borderColor: '#d9e1d9',
                      borderWidth: 1,
                    },
                  ]}>
                  <Picker
                    selectedValue={this.state.admin}
                    style={{
                      marginLeft: 5,
                      width: 280,
                      height: 50,
                      color: '#000000',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        admin: itemValue,
                        errorMessageAdmin: null
                      })
                    }>
                    <Picker.Item
                      label="Tipo de usuário"
                      value=""
                    />
                    <Picker.Item
                      label="Administrador"
                      value="true"
                    />
                    <Picker.Item
                      label="Usuário comum"
                      value="false"
                    />
                  </Picker>
                  <Text style={{width: '100%', height: 60, position: 'absolute', bottom: 0, left: 0}}>{' '}</Text>
                </View>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageAdmin}
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#282a36', '#000000']}
                  style={[ViewStyles.linearGradient, {marginTop: 40}]}>
                  <TouchableOpacity
                    style={ButtonStyles.customButton}
                    onPress={() => this.doSignup()}>
                    <Button color="white">
                      <Text style={TextStyles.buttonText}>
                        ADICIONAR USUÁRIO
                      </Text>
                    </Button>
                  </TouchableOpacity>
                </LinearGradient>
              </Androw>
       
            <View style={ContainerStyles.containerSignupBottom} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}