import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Androw from 'react-native-androw';
//import Arrow from '../../images/arrow-left-curved.svg';

import LinearGradient from 'react-native-linear-gradient';
import {TextInput, Button, Checkbox, Snackbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ButtonStyles,
  ComponentStyles,
  ContainerStyles,
  InputStyles,
  TextStyles,
  ViewStyles,
} from '../../styles';
import api from '../../services/api';
import { login } from '../../services/auth2';
const windowHeight = Dimensions.get('window').height;

export default class LoginScreen extends React.Component {
  state = {
    placeholderEmailColor: '#D0DAD1',
    placeholderTextColor: '#282a36',
    visible: false,
    color: '#e83f5b',
    activateSnack: false,
    snackMessage: '',
    placeholderPasswordColor: '#D0DAD1',
    outlineEmailColor: '#7BE495',
    outlinePasswordColor: '#7BE495',
    snackColor: '',
    setVisible: false,
    upColor: '#7BE495',
    downColor: '#329D9C',
    textColor: 'white',
    buttonText: 'ENTRAR',
    buttonDisabler: false,
    checked: false,
    loginuser: '',
    loginsenha: '',
    securetext: true,
    rightemail: 0,
    outlinecolor: '#7BE495',
    placeholdercolor: '#D0DAD1',
    passwordicon: 'eye',
    passwordicon1: 'eye',
    passwordicon2: 'eye-off',
    loading: false,
  };

  onToggleSnackBar = () => this.setState({visible: true});
  onDismissSnackBar = () => this.setState({visible: false});

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

  /*componentDidMount() {
    Dimensions.removeEventListener('change', this.onChange);
  }*/

  onToggle() {
    setTimeout(() => {
      this.setState({
        on: false,
      });
    }, 500);
    return this.state.on;
  }
  doReturn() {
    this.props.navigation.push('InicialScreen');
  }

  doLogin = async () => {
    Keyboard.dismiss();
    const {loginuser, loginsenha} = this.state;
    this.setState({
      upColor: '#282a36',
      downColor: '#000000',
      textColor: '#7BE495',
      buttonDisabler: true,
      buttonText: '',
    });

    if (loginuser && loginsenha) {
      const req = {
        username: loginuser,
        password: loginsenha,
      };
      this.setState({
        loading: true,
      });
         api.post("/login", req)
        .then(res => {
          login(res.data.token)
          if (res.data.admin === true ) {
            console.log('admin')
            AsyncStorage.removeItem('type');
            AsyncStorage.setItem('type', '1');
            this.props.navigation.push('AdminScreen');
            this.setState({
              upColor: '#7BE495',
              loginuser: '',
              loginsenha: '',
              downColor: '#329D9C',
              textColor: 'white',
              buttonText: 'ENTRAR',
              buttonDisabler: false,
              loading: false,
            });
          } else {
            this.setState({
              loading: false,
            });
            console.log('não é admin')
             AsyncStorage.setItem('token', res.data.token);
             AsyncStorage.removeItem('type');
             AsyncStorage.setItem('type', '2');
             AsyncStorage.setItem('nome', res.data.name);
             AsyncStorage.setItem('cpfUser', res.data.cpf);

            this.props.navigation.push('UserScreen');
            this.setState({
              loginuser: '',
              loginsenha: '',
              upColor: '#7BE495',
              downColor: '#329D9C',
              textColor: 'white',
              buttonText: 'ENTRAR',
              buttonDisabler: false,
              loading: false,
            });
          }
        })
        .catch(err => {
          this.setState({
            upColor: '#7BE495',
            downColor: '#329D9C',
            textColor: 'white',
            buttonText: 'ENTRAR',
            buttonDisabler: false,
            snackColor: '#e83f5b',
            visible: true,
            placeholderEmailColor: '#e83f5b',
            placeholderPasswordColor: '#e83f5b',
            placeholderTextColor: '#e83f5b',
            loading: false,
            snackMessage: 'Dados incorretos, verifique sua senha e/ou email!',
            color: 'blue',
          });
          setTimeout(() => {
            this.setState({
              placeholderEmailColor: '#D0DAD1',
              placeholderPasswordColor: '#D0DAD1',
              placeholderTextColor: '#282a36',
              visible: false,
            });
          }, 1000);
          console.log('Erro', err.response);
          //alert('Senha ou email estão errados'); // eslint-disable-line no-alert
        });
    } else {
      if (loginsenha) {
        this.setState({
          upColor: '#7BE495',
          downColor: '#329D9C',
          textColor: 'white',
          buttonText: 'ENTRAR',
          snackColor: '#ffc524',
          outlineEmailColor: '#ffc524',
          placeholderEmailColor: '#ffc524',
          snackMessage: 'Preencha seu email!',
          visible: true,
          buttonDisabler: false,
        });
        setTimeout(() => {
          this.setState({
            placeholderPasswordColor: '#D0DAD1',
            placeholderEmailColor: '#D0DAD1',
            outlineEmailColor: '#7BE495',
            visible: false,
          });
        }, 1000);
      } else if (loginuser) {
        this.setState({
          upColor: '#7BE495',
          downColor: '#329D9C',
          textColor: 'white',
          buttonText: 'ENTRAR',
          snackColor: '#ffc524',
          outlinePasswordColor: '#ffc524',
          placeholderPasswordColor: '#ffc524',
          snackMessage: 'Preencha sua senha!',
          visible: true,
          buttonDisabler: false,
        });
        setTimeout(() => {
          this.setState({
            placeholderPasswordColor: '#D0DAD1',
            placeholderEmailColor: '#D0DAD1',
            outlinePasswordColor: '#7BE495',
            visible: false,
          });
        }, 1000);
      } else {
        this.setState({
          upColor: '#7BE495',
          downColor: '#329D9C',
          textColor: 'white',
          buttonText: 'ENTRAR',
          snackColor: '#ffc524',
          placeholderEmailColor: '#ffc524',
          outlineEmailColor: '#ffc524',
          outlinePasswordColor: '#ffc524',
          placeholderPasswordColor: '#ffc524',
          snackMessage: 'Preencha todos os campos!',
          visible: true,
          buttonDisabler: false,
        });
        setTimeout(() => {
          this.setState({
            placeholderPasswordColor: '#D0DAD1',
            placeholderEmailColor: '#D0DAD1',
            outlineEmailColor: '#7BE495',
            outlinePasswordColor: '#7BE495',
            visible: false,
          });
        }, 1000);
      }

      //alert('Digite o email e a senha'); // eslint-disable-line no-alert
    }
  };
  a;
  changeicon() {
    this.setState({
      securetext: !this.state.securetext,
    });
    if (this.state.passwordicon === this.state.passwordicon2) {
      this.setState({
        passwordicon: this.state.passwordicon1,
      });
    } else {
      this.setState({
        passwordicon: this.state.passwordicon2,
      });
    }
  }

  render() {
    const {securetext, loginuser, loginsenha} = this.state;

    return (
      <View
        style={[
          ContainerStyles.containerNoAlign,
          {justifyContent: 'flex-start'},
        ]}>
        <View style={ContainerStyles.welcomeContainer}>
          <View style={ViewStyles.circle4}>
            <TouchableOpacity
              onPress={() => this.doReturn()}
              hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
              {/*<Arrow />*/}
            </TouchableOpacity>
          </View>
        </View>

        <View style={ContainerStyles.container}>
          <View
            style={[
              ContainerStyles.containerLogin,
              {marginTop: windowHeight * 0.2},
            ]}>
            <Snackbar
              visible={this.state.visible}
              style={{
                backgroundColor: this.state.snackColor,
                top: windowHeight * -0.675,
                width: '80%',
                alignSelf: 'center',
              }}>
              {this.state.snackMessage}
            </Snackbar>

            <Text style={TextStyles.mainBlueText2}>Login</Text>
            <Text
              style={[
                TextStyles.mainGreenText,
                {marginTop: windowHeight * 0.01},
              ]}>
              Entre com os dados da sua conta
            </Text>
            <Text style={TextStyles.subGreenText}>para acessá-la</Text>
            <Androw style={ViewStyles.shadow}>
              <LinearGradient
                colors={['#FFFFFF', '#FFFFFF']}
                style={ViewStyles.linearGradient2}>
                <TextInput
                  mode="outlined"
                  placeholder="Email"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.loginsenha.focus();
                  }}
                  style={InputStyles.inputBox}
                  underlineColor="#FFFFFF"
                  theme={{
                    colors: {
                      text: this.state.placeholderTextColor,
                      primary: this.state.outlineEmailColor,
                      placeholder: this.state.placeholderEmailColor,
                    },
                    fonts: {regular: ''},
                    roundness: 18,
                  }}
                  placeholderTextColor="#D0DAD1"
                  value={loginuser}
                  onChangeText={value =>
                    this.onChangeHandle('loginuser', value)
                  }
                  fontFamily={'Montserrat-Medium'}
                />
              </LinearGradient>
            </Androw>
            <View>
              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="Senha"
                    ref={input => {
                      this.loginsenha = input;
                    }}
                    style={InputStyles.inputBox}
                    secureTextEntry={securetext}
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
                    right={
                      <TextInput.Icon
                        onPress={() => {
                          this.changeicon();
                        }}
                        name={this.state.passwordicon}
                        color="#CDE0C9"
                        style={ComponentStyles.EyeIcon}
                      />
                    }
                    value={loginsenha}
                    onChangeText={value =>
                      this.onChangeHandle('loginsenha', value)
                    }
                    fontFamily={'Montserrat-Medium'}
                  />
                </LinearGradient>
              </Androw>

              <TouchableOpacity
                style={ContainerStyles.checkboxContainer}
                onPress={() => {
                  this.setState({checked: !this.state.checked});
                }}>
                <Checkbox
                  status={this.state.checked ? 'checked' : 'unchecked'}
                  uncheckedColor={'#7BE495'}
                  color={'#7BE495'}
                />

                <Text style={TextStyles.subGreenText}>Lembrar de mim</Text>
              </TouchableOpacity>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={[this.state.upColor, this.state.downColor]}
                  style={ViewStyles.linearGradient}>
                  <TouchableOpacity
                    disabled={this.state.buttonDisabler}
                    style={ButtonStyles.customButton}
                    onPress={() => this.doLogin()}>
                    <Button color={this.state.textColor}>
                      <Text style={TextStyles.buttonText}>
                        {this.state.buttonText}
                      </Text>
                    </Button>
                    <ActivityIndicator
                      animating={this.state.loading}
                      size="large"
                      color="#7BE495"
                      style={{position: 'absolute', alignSelf: 'center'}}
                    />
                  </TouchableOpacity>
                </LinearGradient>
              </Androw>
              <View
                style={[
                  ContainerStyles.rowContainer,
                  {marginTop: windowHeight * 0.04},
                ]}>
                <Text style={TextStyles.bottomText}>Não tem uma conta? </Text>
                <TouchableOpacity
                  style={TextStyles.buttonText}
                  onPress={() => this.props.navigation.push('SignupScreen')}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                  <Text style={TextStyles.bottomRowText}>Criar agora</Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  ContainerStyles.rowContainer,
                  {marginTop: windowHeight * 0.01, marginBottom: '5%'},
                ]}>
                <Text style={TextStyles.bottomText}>Esqueceu a senha? </Text>
                <TouchableOpacity
                  style={TextStyles.buttonText}
                  onPress={() => this.props.navigation.push('PasswordScreen')}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                  <Text style={TextStyles.bottomRowText}>Recuperar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
