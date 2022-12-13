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
import LinearGradient from 'react-native-linear-gradient';
//import TextInputMask from 'react-native-text-input-mask';
import axios from 'axios';
import api from '../../../services/api';
//import Arrow from '../../../../../images/arrow-left-curved.svg';
import {Button, TextInput} from 'react-native-paper';
import Androw from 'react-native-androw';
import {
  ButtonStyles,
  ContainerStyles,
  InputStyles,
  TextStyles,
  ViewStyles,
} from '../../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowHeight = Dimensions.get('window').height;

export default class AddCoveredAddressScreen extends React.Component {
  state = {
    street: '',
    number_start: null,
    number_end: null,
    district: '',
    city: '',
    uf: '',
    cep: '',
    errorMessageCep: '',
    errorMessageStreet: '',
    errorMessageNumber_start: '',
    errorMessageNumber_end: '',
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
      this.setState({cep: value});
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
  checkFieldEmpty(cep, street, number_start, number_end, district, city, uf) {
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
    if (!number_start) {
      this.setState({
        errorMessageNumber_start: 'Campo obrigatório!',
      });
      errors++;
    }
    if (!number_end) {
      this.setState({
        errorMessageNumber_end: 'Campo obrigatório!',
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
    const {
      street,
      number_start,
      number_end,
      district,
      city,
      uf,
      cep,
    } = this.state;
    const idhosp = await AsyncStorage.getItem('idHospitalAdd');
    const idubs = await AsyncStorage.getItem('idUBSAdd');

    if (
      this.checkFieldEmpty(
        this.state.cep,
        this.state.street,
        this.state.number_start,
        this.state.number_end,
        this.state.district,
        this.state.city,
        this.state.uf,
      ) === false
    ) {
      const req = {
        street: street,
        number_start: number_start,
        number_end: number_end,
        district: district,
        city: city,
        uf: uf,
        cep: cep,
        id_addres_parto: idhosp,
        id_addres_pre_natal: idubs,
      };
      api
        .post(`cover-address`, req)
        .then(res => {
          alert('Endereço cadastrado com sucesso!');
          this.setState({
            street: '',
            number_start: null,
            number_end: null,
            district: '',
            city: '',
            uf: '',
            cep: '',
            regiao: '',
          });
          this.props.navigation.navigate('AdminScreen');
        })
        .catch(err => {
          alert('Algo deu errado!');
        });
    }
  };

  render() {
    const scrollEnabled = this.state.screenHeight > windowHeight;
    const {
      street,
      number_start,
      number_end,
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
          <View
            style={[
              ContainerStyles.containerNoAlign,
              {justifyContent: 'flex-start'},
            ]}>
            <View style={ContainerStyles.welcomeContainer}>
              <View style={ViewStyles.circle4}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ChooseCenterMedical2')
                  }
                  hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
                  {/*<Arrow />*/}
                </TouchableOpacity>
              </View>
            </View>
    
              <Text style={TextStyles.mainBlueText}>
                Cadastro de Endereço Coberto
              </Text>
              <Text style={TextStyles.mainGreenText}>
                Preencha todos os campos com
              </Text>
              <Text style={TextStyles.subGreenText}>
                dados válidos do Endereço
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="CEP"
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
                    placeholder="Bairro"
                    keyboardType="numeric"
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
                    placeholder="Número Início"
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
                    value={number_start}
                    onChangeText={value => (
                      this.onChangeHandle('number_start', value),
                      this.setState({
                        errorMessageNumber_start: null,
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageNumber_start}
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="Número Fim"
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
                    value={number_end}
                    onChangeText={value => (
                      this.onChangeHandle('number_end', value),
                      this.setState({
                        errorMessageNumber_end: null,
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessageNumber_end}
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="Cidade"
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
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    placeholder="Estado"
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
                    value={uf}
                    onChangeText={value => (
                      this.onChangeHandle('uf', value),
                      this.setState({
                        errorMessageUf: null,
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
                  />
                </LinearGradient>
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
                        CADASTRAR ENDEREÇO
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
