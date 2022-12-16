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
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import api from '../../../services/api';
//import Arrow from '../../../../../images/arrow-left-curved.svg';
import {Button,TextInput} from 'react-native-paper';
import Androw from 'react-native-androw';
import {Picker} from '@react-native-picker/picker';
import {TextInputMask} from 'react-native-masked-text';
import {
  ButtonStyles,
  ContainerStyles,
  InputStyles,
  TextStyles,
  ViewStyles,
} from '../../../styles';
const windowHeight = Dimensions.get('window').height;

export default class AddCenterMedicalScreen extends React.Component {
  state = {
    name: '',
    latitude: 0,
    longitude: 0,
    telefone: '',
    image: '',
    rua: '',
    numero: null,
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    errorMessageCep: '',
    errorMessageStreet: '',
    errorMessageNumero: '',
    errorMessageDistrict: '',
    errorMessageCity: '',
    errorMessageUf: '',
    errorMessageLatitude: '',
    errorMessageLongitude: '',
    errorMessageTelefone: '',
    errorMessageImage: '',
    errorMessageName: '',
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
      rua: '',
      bairro: '',
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
          rua: '...',
          bairro: '...',
        });
        axios
          .get('https://viacep.com.br/ws/' + cep + '/json/')
          .then(res => {
            this.setState({
              rua: res.data.logradouro,
              bairro: res.data.bairro,
              cidade: res.data.localidade,
              estado: res.data.uf,
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

  checkFieldEmpty(
    name,
    image,
    latitude,
    longitude,
    telefone,
    cep,
    street,
    district,
    city,
    uf,
  ) {
    var errors = 0;
    if (!name) {
      this.setState({
        errorMessageName: 'Campo obrigatório!',
      });
      errors++;
    }
    if (!image) {
      this.setState({
        errorMessageImage: 'Campo obrigatório!',
      });
      errors++;
    }
    if (!latitude) {
      this.setState({
        errorMessageLatitude: 'Campo obrigatório!',
      });
      errors++;
    }
    if (!longitude) {
      this.setState({
        errorMessageLongitude: 'Campo obrigatório!',
      });
      errors++;
    }
    if (!telefone) {
      this.setState({
        errorMessageTelefone: 'Campo obrigatório!',
      });
      errors++;
    }
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
  checkNumberValid(number) {
    if (isNaN(number) == false) {
      if (parseInt(number) > 0) {
        return true;
      }
    } else {
      if (number == 's/n') return true;
    }
    this.setState({
      errorMessageNumero:
        'Digite apenas números positivos ou s/n para endereço sem número',
    });
    return false;
  }

  doSignup() {
    const {
      name,
      image,
      latitude,
      longitude,
      telefone,
      cep,
      estado,
      cidade,
      bairro,
      rua,
      numero,
    } = this.state;

    var errors = false;

    if (
      this.checkFieldEmpty(
        this.state.name,
        this.state.image,
        this.state.latitude,
        this.state.longitude,
        this.state.telefone,
        this.state.cep,
        this.state.rua,
        this.state.numero,
        this.state.bairro,
        this.state.cidade,
        this.state.estado,
      ) == true ||
      this.checkNumberValid(this.state.numero) == false
    )
      errors = true;

    if (errors === false) {
      const req = {
        name: name,
        phone: telefone,
        latitude: latitude,
        longitude: longitude,
        image: image,
        cep: cep,
        uf: this.state.estado,
        city: cidade,
        district: bairro,
        street: rua,
        number: numero,
      };
      console.log(req);
      api
        .post(`medical-center`, req)
        .then(res => {
          alert('Centro Médico cadastrado!');
          this.props.navigation.push('AdminScreen');
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
      telefone,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      cep,
      latitude,
      longitude,
      image,
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
            
              <Text style={TextStyles.mainBlueText}>
                Cadastro de Centro Médico
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
                <Icon name="local-hospital" size={65} color="#282a36" />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    backgroundColor: '#56c596',
                    elevation: 10,
                    top: -5,
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    right: -5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{position: 'absolute', color: 'white', right: 7}}>
                    +
                  </Text>
                  <Icon name="image" size={20} color="white" />
                </TouchableOpacity>
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
                    placeholder="Imagem"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.image.focus();
                    }}
                    ref={input => {
                      this.image = input;
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
                    value={image}
                    onChangeText={value => (
                      this.onChangeHandle('image', value),
                      this.setState({
                        errorMessageImage: '',
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageImage}
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="Telefone"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    ref={input => {
                      this.telefone = input;
                    }}
                    style={InputStyles.inputBox}
                    placeholderTextColor="#D0DAD1"
                    underlineColor="#000000"
                    theme={{
                      colors: {
                        text: '#282a36',
                        primary: '#7BE495',
                        placeholder: '#D0DAD1',
                      },
                      fonts: {regular: ''},
                      roundness: 18,
                    }}
                    fontFamily={'Montserrat-Medium'}
                    render={(props) => (
                      <TextInputMask
                        {...props}
                        value={telefone}
                        type={'cel-phone'}
                        options={{
                          maskType: 'BRL',
                          withDDD: true,
                          dddMask: '(99) ',
                        }}
                        onChangeText={value => (
                          this.onChangeHandle('telefone', value),
                          this.setState({
                            errorMessageTelefone: null,
                          })
                        )}
                      />
                    )}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageTelefone}
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="Latidude"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.latitude.focus();
                    }}
                    ref={input => {
                      this.latitude = input;
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
                    value={latitude}
                    onChangeText={value => (
                      this.onChangeHandle('latitude', value),
                      this.setState({
                        errorMessageLatitude: '',
                      })
                    )}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageLatitude}
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="Longitude"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.longitude.focus();
                    }}
                    ref={input => {
                      this.longitude = input;
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
                    value={longitude}
                    onChangeText={value => (
                      this.onChangeHandle('longitude', value),
                      this.setState({
                        errorMessageLongitude: '',
                      })
                    )}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageLongitude}
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="CEP"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.cep.focus();
                    }}
                    ref={input => {
                      this.cep = input;
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
                    value={cep}
                    onChangeText={value => (
                      this.onChangeCep(value),
                      this.setState({
                        errorMessageCep: '',
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
                    onSubmitEditing={() => {
                      this.bairro.focus();
                    }}
                    ref={input => {
                      this.rua = input;
                    }}
                    style={InputStyles.inputBox}
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
                    placeholderTextColor="#D0DAD1"
                    value={rua}
                    onChangeText={value => (
                      this.onChangeHandle('rua', value),
                      this.setState({
                        errorMessageStreet: '',
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
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.numero.focus();
                    }}
                    ref={input => {
                      this.numero = input;
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
                    value={numero}
                    onChangeText={value => (
                      this.onChangeHandle('numero', value),
                      this.setState({
                        errorMessageNumero: '',
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageNumero}
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
                    onSubmitEditing={() => {
                      this.bairro.focus();
                    }}
                    ref={input => {
                      this.bairro = input;
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
                    value={bairro}
                    onChangeText={value => (
                      this.onChangeHandle('bairro', value),
                      this.setState({
                        errorMessageDistrict: '',
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
                    onSubmitEditing={() => {
                      this.cidade.focus();
                    }}
                    ref={input => {
                      this.cidade = input;
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
                    value={cidade}
                    onChangeText={value => (
                      this.onChangeHandle('cidade', value),
                      this.setState({
                        errorMessageCity: '',
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
                    selectedValue={this.state.estado}
                    style={{
                      marginLeft: 5,
                      width: 280,
                      height: 50,
                      color: '#000000',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        estado: itemValue,
                        errorMessageUf: '',
                      })
                    }>
                    <Picker.Item label="Selecione um estado" value=" " />
                    <Picker.Item label="Acre (AC)" value="AC" />
                    <Picker.Item label="Alagoas (AL)" value="AL" />
                    <Picker.Item label="Amazonas (AM)" value="AM" />
                    <Picker.Item label="Bahia (BA)" value="BA" />
                    <Picker.Item label="Ceará (CE)" value="CE" />
                    <Picker.Item label="Distrito Federal (DF)" value="DF" />
                    <Picker.Item label="Espírito Santo (ES)" value="ES" />
                    <Picker.Item label="Goiás	(GO)" value="GO" />
                    <Picker.Item label="Maranhão (MA)" value="MA" />
                    <Picker.Item label="Mato Grosso	(MT)" value="MT" />
                    <Picker.Item label=" Mato Grosso do Sul	(MS)" value="MS" />
                    <Picker.Item label="Minas Gerais (MG)" value="MG" />
                    <Picker.Item label="Pará (PA)" value="PA" />
                    <Picker.Item label="Paraíba (PB)" value="PB" />
                    <Picker.Item label="Paraná (PR)" value="PR" />
                    <Picker.Item label="Pernambuco (PE)" value="PE" />
                    <Picker.Item label="Piauí	(PI)" value="PI" />
                    <Picker.Item label="Rio de Janeiro (RJ)" value="RJ" />
                    <Picker.Item label="Rio Grande do Norte	(RN)" value="RN" />
                    <Picker.Item label="Rio Grande do Sul (RS)" value="RS" />
                    <Picker.Item label="Rondônia (RO)" value="Rondônia" />
                    <Picker.Item label="Santa Catarina (SC)" value="SC" />
                    <Picker.Item label="São Paulo (SP)" value="SP" />
                    <Picker.Item label="Sergipe	(SE)" value="SE" />
                    <Picker.Item label="Tocantins	(TO)" value="TO" />
                  </Picker>
                  <Text
                    style={{
                      width: '100%',
                      height: 60,
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                    }}>
                    {' '}
                  </Text>
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
                        CADASTRAR HOSPITAL
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
