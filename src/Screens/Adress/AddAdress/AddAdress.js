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
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import api from '../../../services/api';
//import Arrow from '../../images/arrow-left-curved.svg';
import {Button, TextInput} from 'react-native-paper';
import Androw from 'react-native-androw';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {
  ButtonStyles,
  ContainerStyles,
  InputStyles,
  TextStyles,
  ViewStyles,
} from '../../../styles';
const windowHeight = Dimensions.get('window').height;

export default class AddAdressScreen extends React.Component {
  state = {
    street: '',
    number: null,
    district: '',
    city: '',
    uf: '',
    cep: '',
    option: '',
    errorMessageCep: '',
    errorMessageStreet: '',
    errorMessageNumber: '',
    errorMessageDistrict: '',
    errorMessageCity: '',
    errorMessageUf: '',
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

  onChangeCep(value) {
    if (value.length === 8) {
      this.setState({
        cep: value,
      });
      this.pesquisacep(value);
    } else {
      this.setState({
        cep: value,
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
            alert('CEP inválido, tente outro CEP!');
            this.setState({
              cep: '',
            });
          });
      } //end if.
      else {
        //cep é inválido.
        this.limpa_formulário_cep();

        alert('Formato de CEP inválido.');
      }
    } //end if.
    else {
      //cep sem valor, limpa formulário.
      this.limpa_formulário_cep();
    }
  }
  goBack = async () => {
     if(await AsyncStorage.getItem('type') === '1'){
      this.props.navigation.navigate('AdminEditUserScreen')
        this.props.navigation.navigate('AdressScreen')
     }
     else{
        this.props.navigation.navigate('UserScreen')
        this.props.navigation.navigate('UserListAdressScreen')
     }
  }

  checkFieldEmpty(cep, street,number, district, city, uf) {
    var errors = 0;
    if (!cep) {
      this.setState({
        errorMessageCep: 'Campo obrigatório!',
      });
      errors++;
    }
    if (!street) {
      this.setState({
        errorMessageStreet: 'Campo obrigatório!',
      });
      errors++;
    }
    if (!number) {
      this.setState({
        errorMessageNumber: 'Campo obrigatório!',
      });
      errors++;
    }
    if (!district) {
      this.setState({
        errorMessageDistrict: 'Campo obrigatório!',
      });
      errors++;
    }
    if (!city) {
      this.setState({
        errorMessageCity: 'Campo obrigatório!',
      });
      errors++;
    }
    if (!uf) {
      this.setState({
        errorMessageUf: 'Campo obrigatório!',
      });
      errors++;
    }
    if (errors > 0) {
      return true;
    } else {
      return false;
    }
  }

  doSignup = async () => {
      var cpf
    if(await AsyncStorage.getItem('type') === '1'){
      cpf = await AsyncStorage.getItem('AdminCpfUser');
     }
     else{
      cpf = await AsyncStorage.getItem('cpfUser');
     }
    const {
    street,
    number,
    district,
    city,
    uf,
    cep
    } = this.state;
    
    if (
      this.checkFieldEmpty(
        this.state.cep,
        this.state.street,
        this.state.number,
        this.state.district,
        this.state.city,
        this.state.uf,
      ) === false
    ) {
      const req = {
        cpfUser:  cpf,
        street: street,
        number: number,
        district: district,
        city: city,
        uf: this.state.uf,
        cep: cep
      };
      console.log(req)
      api.post("/adress", req)
        .then(res => {
           alert('Endereço cadastrado!');
           this.goBack()
        })
        .catch((err) => {
          alert('Algo deu errado!');
          console.log(err)
        });
    } 
  }

  render() {
    const scrollEnabled = this.state.screenHeight > windowHeight;
    const {
      street,
      number, 
      district, 
      city,
      uf, 
      cep
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
                  onPress={() =>this.goBack()}
                  hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
                  {/*<Arrow />*/}
                </TouchableOpacity>
              </View>
            </View>
              <Text style={TextStyles.mainBlueText}>
                Cadastro de Endereço
              </Text>
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
                <Icon name="user" size={65} color="#282a36" />
            
              </View>
              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="CEP"
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
                    value={cep}
                    onChangeText={value => (
                      this.onChangeCep(value),
                      this.setState({
                        errorMessageCep: null,
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageCep}
              </Text>
              
              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="Rua"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    ref={input => {
                      this.street = input;
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
                    value={street}
                    onChangeText={value => (
                      this.onChangeHandle('street', value),
                      this.setState({
                        errorMessageStreet: null,
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageStreet}
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="Número"
                    keyboardType="numeric"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    ref={input => {
                      this.number = input;
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
                    value={number}
                    onChangeText={value => (
                      this.onChangeHandle('number', value),
                      this.setState({
                        errorMessageNumber: null,
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageNumber}
              </Text>
              
              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="Bairro"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    ref={input => {
                      this.district = input;
                    }}
                    style={InputStyles.inputBox}
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
                    value={district}
                    onChangeText={value => (
                      this.onChangeHandle('district', value),
                      this.setState({
                        errorMessageDistrict: null,
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageDistrict}
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="Cidade"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    ref={input => {
                      this.city = input;
                    }}
                    style={InputStyles.inputBox}
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
                    value={city}
                    onChangeText={value => (
                      this.onChangeHandle('city', value),
                      this.setState({
                        errorMessageCity: null,
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageCity}
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
                    selectedValue={this.state.uf}
                    style={{
                      marginLeft: 5,
                      width: 280,
                      height: 50,
                      color: '#000000',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        uf: itemValue,
                        errorMessageUf: ''
                      })
                    }>
                    <Picker.Item label="Selecione um estado" value=" " />
                    <Picker.Item label="Acre (AC)" value="AC" />
                    <Picker.Item label="Alagoas (AL)" value="AL" />
                    <Picker.Item label="Amazonas (AM)" value="AM" />
                    <Picker.Item label="Bahia (BA)" value="BA" />
                    <Picker.Item label="Ceará (CE)" value="CE" />
                    <Picker.Item
                      label="Distrito Federal (DF)"
                      value="DF"
                    />
                    <Picker.Item
                      label="Espírito Santo (ES)"
                      value="ES"
                    />
                    <Picker.Item label="Goiás	(GO)" value="GO" />
                    <Picker.Item label="Maranhão (MA)" value="MA" />
                    <Picker.Item label="Mato Grosso	(MT)" value="MT" />
                    <Picker.Item
                      label=" Mato Grosso do Sul	(MS)"
                      value="MS"
                    />
                    <Picker.Item
                      label="Minas Gerais (MG)"
                      value="MG"
                    />
                    <Picker.Item label="Pará (PA)" value="PA" />
                    <Picker.Item label="Paraíba (PB)" value="PB" />
                    <Picker.Item label="Paraná (PR)" value="PR" />
                    <Picker.Item label="Pernambuco (PE)" value="PE" />
                    <Picker.Item label="Piauí	(PI)" value="PI" />
                    <Picker.Item
                      label="Rio de Janeiro (RJ)"
                      value="RJ"
                    />
                    <Picker.Item
                      label="Rio Grande do Norte	(RN)"
                      value="RN"
                    />
                    <Picker.Item
                      label="Rio Grande do Sul (RS)"
                      value="RS"
                    />
                    <Picker.Item label="Rondônia (RO)" value="Rondônia" />
                    <Picker.Item
                      label="Santa Catarina (SC)"
                      value="SC"
                    />
                    <Picker.Item label="São Paulo (SP)" value="SP" />
                    <Picker.Item label="Sergipe	(SE)" value="SE" />
                    <Picker.Item label="Tocantins	(TO)" value="TO" />
                  </Picker>
                  <Text style={{width: '100%', height: 60, position: 'absolute', bottom: 0, left: 0}}>{' '}</Text>
                </View>
                  </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageUf}
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
                        ADICIONAR ENDEREÇO
                      </Text>
                    </Button>
                  </TouchableOpacity>
                </LinearGradient>
              </Androw>
            </View>
            <View style={ContainerStyles.containerSignupBottom} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
