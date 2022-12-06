import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import Androw from 'react-native-androw';
import api from '../../../services/api';
import axios from 'axios';
const windowWidth = Dimensions.get('window').width;
import Arrow from '../../../images/arrow-left-curved.svg';
//import TextInputMask from 'react-native-text-input-mask';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowHeight = Dimensions.get('window').height;
import {
  ButtonStyles,
  ContainerStyles,
  InputStyles,
  TextStyles,
  ViewStyles,
} from '../../../styles';
export default class GuestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.getData();
  }
  state = {
    placeholderCEPColor: '#D0DAD1',
    placeholderNumberColor: '#D0DAD1',
    placeholderDistrictColor: '#D0DAD1',
    placeholderStreetColor: '#D0DAD1',
    placeholderCityColor: '#D0DAD1',
    placeholderUFColor: '#D0DAD1',
    outlineCEPColor: '#7BE495',
    outlineNumberColor: '#7BE495',
    outlineDistrictColor: '#7BE495',
    outlineStreetColor: '#7BE495',
    outlineCityColor: '#7BE495',
    outlineUFColor: '#7BE495',
    upColor: '#7BE495',
    downColor: '#329D9C',
    textColor: 'white',
    visible: false,
    buttonText: 'PROCURAR',
    loading: false,
    buttonDisabler: false,
    street: '',
    number: null,
    cep: '',
    district: '',
    name: '',
    city: '',
    uf: '',
  };
  onChange = ({window, screen}) => {
    this.setState({dimensions: {window, screen}});
  };
  onChangeHandle(state, value) {
    this.setState({
      [state]: value,
    });
  }
  componentDidMount() {
    Dimensions.addEventListener('change', this.onChange);
  }

  /*componentDidMount() {
    Dimensions.removeEventListener('change', this.onChange);
  }*/
  getData = async () => {
    const namestorage = await AsyncStorage.getItem('name');
    this.setState({
      name: namestorage,
    });
  };

  doFind = async () => {
    Keyboard.dismiss();
    const {street, number, district, cep, city, uf} = this.state;
    const req = {
      street: street,
      number: number,
      district: district,
      city: city,
      uf: uf,
      cep: cep,
    };

    if (street && number && city && uf && district && cep) {
      this.setState({
        upColor: '#282a36',
        downColor: '#000000',
        textColor: '#7BE495',
        buttonDisabler: true,
        buttonText: '',
        loading: true,
      });
      api.post('find-center-medical', req)
        .then(res => {
          this.setState({
            loading: false,
            upColor: '#7BE495',
            downColor: '#329D9C',
            textColor: 'white',
            buttonText: 'PROCURAR',
            buttonDisabler: false,
          });
          const idPreNatal = res.data[0].id_addres_pre_natal;
          const stringIdPreNatal = '' + idPreNatal;
          const idParto = res.data[0].id_addres_parto;
          const stringIdParto = '' + idParto;
          AsyncStorage.setItem('idPreNatalGuest', stringIdPreNatal);
          AsyncStorage.setItem('idPartoGuest', stringIdParto);
          this.props.navigation.push('FoundHospitalScreen');
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          this.setState({
            upColor: '#7BE495',
            downColor: '#329D9C',
            textColor: 'white',
            buttonText: 'PROCURAR',

            placeholderCEPColor: cep ? '#e83f5b' : '#D0DAD1',
            placeholderNumberColor: number ? '#e83f5b' : '#D0DAD1',
            placeholderDistrictColor: district ? '#e83f5b' : '#D0DAD1',
            placeholderStreetColor: street ? '#e83f5b' : '#D0DAD1',
            placeholderCityColor: city ? '#e83f5b' : '#D0DAD1',
            placeholderUFColor: uf ? '#e83f5b' : '#D0DAD1',
            outlineCEPColor: cep ? '#e83f5b' : '#7BE495',
            outlineNumberColor: number ? '#e83f5b' : '#7BE495',
            outlineDistrictColor: district ? '#e83f5b' : '#7BE495',
            outlineStreetColor: street ? '#e83f5b' : '#7BE495',
            outlineCityColor: city ? '#e83f5b' : '#7BE495',
            outlineUFColor: uf ? '#e83f5b' : '#7BE495',
            snackColor: '#e83f5b',
            snackMessage: 'Endereço não encontrado, verifique seus dados!',
            visible: true,
            loading: false,
          });
          setTimeout(() => {
            this.setState({
              placeholderCEPColor: '#D0DAD1',
              placeholderNumberColor: '#D0DAD1',
              placeholderDistrictColor: '#D0DAD1',
              placeholderStreetColor: '#D0DAD1',
              placeholderCityColor: '#D0DAD1',
              placeholderUFColor: '#D0DAD1',
              outlineCEPColor: '#7BE495',
              outlineNumberColor: '#7BE495',
              outlineDistrictColor: '#7BE495',
              outlineStreetColor: '#7BE495',
              outlineCityColor: '#7BE495',
              outlineUFColor: '#7BE495',
              visible: false,
            });
          }, 1000);
        });
    } else {
      // eslint-disable-next-line no-alert
      this.setState({
        upColor: '#7BE495',
        downColor: '#329D9C',
        textColor: 'white',
        buttonText: 'PROCURAR',
        placeholderCEPColor: cep ? '#D0DAD1' : '#ffc524',
        placeholderNumberColor: number ? '#D0DAD1' : '#ffc524',
        placeholderDistrictColor: district ? '#D0DAD1' : '#ffc524',
        placeholderStreetColor: street ? '#D0DAD1' : '#ffc524',
        placeholderCityColor: city ? '#D0DAD1' : '#ffc524',
        placeholderUFColor: uf ? '#D0DAD1' : '#ffc524',
        outlineCEPColor: cep ? '#7BE495' : '#ffc524',
        outlineNumberColor: number ? '#7BE495' : '#ffc524',
        outlineDistrictColor: district ? '#7BE495' : '#ffc524',
        outlineStreetColor: street ? '#7BE495' : '#ffc524',
        outlineCityColor: city ? '#7BE495' : '#ffc524',
        outlineUFColor: uf ? '#7BE495' : '#ffc524',
        snackColor: '#ffc524',
        snackMessage: 'Preencha todos os campos!',
        visible: true,
        loading: false,
      });
      setTimeout(() => {
        this.setState({
          placeholderCEPColor: '#D0DAD1',
          placeholderNumberColor: '#D0DAD1',
          placeholderDistrictColor: '#D0DAD1',
          placeholderStreetColor: '#D0DAD1',
          placeholderCityColor: '#D0DAD1',
          placeholderUFColor: '#D0DAD1',
          outlineCEPColor: '#7BE495',
          outlineNumberColor: '#7BE495',
          outlineDistrictColor: '#7BE495',
          outlineStreetColor: '#7BE495',
          outlineCityColor: '#7BE495',
          outlineUFColor: '#7BE495',
          visible: false,
        });
      }, 1000);
    }
  };

  onChangeCep(value) {
    if (value.length === 8) {
      this.setState({cep: value});
      this.pesquisacep(value);
    } else {
      this.setState({
        cep: value,
        street: '',
        district: '',
        city: '',
        uf: '',
      });
    }
  }
  limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    this.setState({
      street: '',
      district: '',
    });
  }

  pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep !== '') {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        this.setState({
          street: '...',
          district: '...',
          city: '...',
          uf: '...',
        });
        axios
          .get('https://viacep.com.br/ws/' + cep + '/json/')
          .then(res => {
            this.setState({
              street: res.data.logradouro,
              district: res.data.bairro,
              city: res.data.localidade,
              uf: res.data.uf,
            });
          })
          .catch(() => {
            // eslint-disable-next-line no-alert
            alert('CEP inválido, tente outro CEP!');
            this.setState({
              cep: '',
              street: '',
              district: '',
              city: '',
              uf: '',
            });
          });
      } //end if.
      else {
        //cep é inválido.
        this.setState({
          cep: '',
          street: '',
          district: '',
          city: '',
          uf: '',
        });
        this.limpa_formulário_cep();
        // eslint-disable-next-line no-alert
        alert('Formato de CEP inválido.');
      }
    } //end if.
    else {
      this.setState({
        cep: '',
        street: '',
        district: '',
        city: '',
        uf: '',
      });
      //cep sem valor, limpa formulário.
      this.limpa_formulário_cep();
    }
  }
  render() {
    const {street, cep, district, uf, city, number} = this.state;
    return (
        <KeyboardAvoidingView
        behavior="position"
        style={ContainerStyles.containerNoJustify}>
        <View style={ContainerStyles.welcomeContainer}>
          <View style={ViewStyles.circle4}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('InitialScreen')}
              hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
              {/*<Arrow />*/}
            </TouchableOpacity>
          </View>
          <Snackbar
            visible={this.state.visible}
            style={{
              backgroundColor: this.state.snackColor,
              left: 15,
              top: 15,
              width: windowWidth * 0.7,
              alignSelf: 'center',
            }}>
            {this.state.snackMessage}
          </Snackbar>
        </View>

        <Text style={TextStyles.middleBlueText2}>Digite seus dados</Text>
        <Text style={TextStyles.middleGreenText2}>Comece sua procura</Text>

        <View style={ContainerStyles.doubleInputContainer}>
          <Androw style={ViewStyles.shadow}>
            <LinearGradient
              colors={['#FFFFFF', '#FFFFFF']}
              style={ViewStyles.linearGradientFind5}>
              <TextInput
                mode="outlined"
                placeholder="CEP"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.number.focus();
                }}
                style={InputStyles.inputBox}
                value={cep}
                maxLength={8}
                keyboardType="numeric"
                underlineColor="#FFFFFF"
                theme={{
                  colors: {
                    text: '#282a36',
                    primary: this.state.outlineCEPColor,
                    placeholder: this.state.placeholderCEPColor,
                  },
                  fonts: {regular: ''},
                  roundness: 18,
                }}
                placeholderTextColor="#D0DAD1"
                fontFamily={'Montserrat-Medium'}
                onChangeText={value => this.onChangeCep(value)}
              />
            </LinearGradient>
          </Androw>
          <Androw style={ViewStyles.shadow}>
            <LinearGradient
              colors={['#FFFFFF', '#FFFFFF']}
              style={ViewStyles.linearGradientFind6}>
              <TextInput
                mode="outlined"
                placeholder="Número"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.district.focus();
                }}
                ref={input => {
                  this.number = input;
                }}
                style={InputStyles.inputBox}
                value={number}
                keyboardType="numeric"
                underlineColor="#FFFFFF"
                theme={{
                  colors: {
                    text: '#282a36',
                    primary: this.state.outlineNumberColor,
                    placeholder: this.state.placeholderNumberColor,
                  },
                  fonts: {regular: ''},
                  roundness: 18,
                }}
                placeholderTextColor="#D0DAD1"
                fontFamily={'Montserrat-Medium'}
                onChangeText={value => this.onChangeHandle('number', value)}
              />
            </LinearGradient>
          </Androw>
        </View>
        <Androw style={ViewStyles.shadow}>
          <LinearGradient
            mode="outlined"
            colors={['#FFFFFF', '#FFFFFF']}
            style={ViewStyles.linearGradientFind2}>
            <TextInput
              mode="outlined"
              placeholder="Bairro"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.street.focus();
              }}
              ref={input => {
                this.district = input;
              }}
              style={InputStyles.inputBox}
              value={district}
              underlineColor="#FFFFFF"
              theme={{
                colors: {
                  text: '#282a36',
                  primary: this.state.outlineDistrictColor,
                  placeholder: this.state.placeholderDistrictColor,
                },
                roundness: 18,
                fonts: {regular: ''},
              }}
              placeholderTextColor="#D0DAD1"
              fontFamily={'Montserrat-Medium'}
              onChangeText={value => this.onChangeHandle('district', value)}
            />
          </LinearGradient>
        </Androw>
        <Androw style={ViewStyles.shadow}>
          <LinearGradient
            colors={['#FFFFFF', '#FFFFFF']}
            style={ViewStyles.linearGradientFind2}>
            <TextInput
              mode="outlined"
              placeholder="Rua"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.city.focus();
              }}
              ref={input => {
                this.street = input;
              }}
              style={InputStyles.inputBox}
              underlineColor="#FFFFFF"
              value={street}
              theme={{
                colors: {
                  text: '#282a36',
                  primary: this.state.outlineStreetColor,
                  placeholder: this.state.placeholderStreetColor,
                },
                fonts: {regular: ''},
                roundness: 18,
              }}
              placeholderTextColor="#D0DAD1"
              fontFamily={'Montserrat-Medium'}
              onChangeText={value => this.onChangeHandle('street', value)}
            />
          </LinearGradient>
        </Androw>

        <View style={ContainerStyles.doubleInputContainer}>
          <Androw style={ViewStyles.shadow}>
            <LinearGradient
              colors={['#FFFFFF', '#FFFFFF']}
              style={ViewStyles.linearGradientFind3}>
              <TextInput
                mode="outlined"
                placeholder="Cidade"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.uf.focus();
                }}
                ref={input => {
                  this.city = input;
                }}
                style={InputStyles.inputBox}
                value={city}
                underlineColor="#FFFFFF"
                theme={{
                  colors: {
                    text: '#282a36',
                    primary: this.state.outlineCityColor,
                    placeholder: this.state.placeholderCityColor,
                  },
                  fonts: {regular: ''},
                  roundness: 18,
                }}
                placeholderTextColor="#D0DAD1"
                fontFamily={'Montserrat-Medium'}
                onChangeText={value => this.onChangeHandle('city', value)}
              />
            </LinearGradient>
          </Androw>
          <Androw style={ViewStyles.shadow}>
            <LinearGradient
              colors={['#FFFFFF', '#FFFFFF']}
              style={ViewStyles.linearGradientFind4}>
              <TextInput
                mode="outlined"
                placeholder="Estado"
                ref={input => {
                  this.uf = input;
                }}
                style={InputStyles.inputBox}
                underlineColor="#FFFFFF"
                theme={{
                  colors: {
                    text: '#282a36',
                    primary: this.state.outlineUFColor,
                    placeholder: this.state.placeholderUFColor,
                  },
                  fonts: {regular: ''},
                  roundness: 18,
                }}
                placeholderTextColor="#D0DAD1"
                value={uf}
                onChangeText={value => this.onChangeHandle('uf', value)}
                fontFamily={'Montserrat-Medium'}
              />
            </LinearGradient>
          </Androw>
        </View>

        <Androw style={ViewStyles.shadow}>
          <LinearGradient
            colors={[this.state.upColor, this.state.downColor]}
            style={[
              ViewStyles.linearGradient,
              {marginTop: windowHeight * 0.08},
            ]}>
            <TouchableOpacity
              style={ButtonStyles.customButton}
              onPress={() => this.doFind()}>
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
      </KeyboardAvoidingView>
    );
  }
}
