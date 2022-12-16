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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Androw from 'react-native-androw';
import BackIcon from 'react-native-vector-icons/AntDesign';
//import Arrow from '../../../../../images/arrow-left-curved.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import TextInputMask from 'react-native-text-input-mask';
import api from '../../../services/api';
import {Button, TextInput} from 'react-native-paper';
import {
  ButtonStyles,
  ContainerStyles,
  InputStyles,
  TextStyles,
  ViewStyles,
} from '../../../styles';
const windowHeight = Dimensions.get('window').height;
export default class EditCoveredAddressScreen extends React.Component {
  constructor(props) {
    super(props);

    this.getData();
  }
  state = {
    cep: '',
    image: 'da',
    latitude: '',
    longitude: '',
    district: '',
    street: '',
    city: '',
    uf: '',
    name: '',
    phone: '',
    errorMessageCep: '',
    errorMessageStreet: '',
    errorMessageNumber_start: '',
    errorMessageNumber_end: '',
    errorMessageDistrict: '',
    errorMessageCity: '',
    errorMessageUf: '',
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


  goBack = async () => {
    this.setState({
      cep: '',
      number_start: null,
      number_end: null,
      district: '',
      street: '',
      city: '',
      uf: '',
      name: '',
      phone: '',
      latitude: '',
      longitude: '',
      image: '',
    });
    AsyncStorage.removeItem('idHospitalEdit');
    this.props.navigation.push('MedicalCenterMain');
  };
  getData = async () => {
    try {
      const valID = await AsyncStorage.getItem('idHospitalEdit');
      const token = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: token,
      };
      if (valID != null) {
        api
          .get('cover-address/' + valID, {headers: headers})

          .then(res => {
            if (res.data.number === null) {
              this.setState({
                number_start: '',
                number_end: '',
              });
            } else {
              this.setState({
                number_start: '' + res.data.number_start,
                number_end: '' + res.data.number_end,
              });
            }
            this.setState({
              street: res.data.street,
              district: res.data.district,
              city: res.data.city,
              uf: res.data.uf,
              cep: res.data.cep,
            });
          })
          .catch(() => {
            alert('Algo deu errado!');
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
          district: '',
          street: '',
          city: '',
          uf: '',
          name: '',
          phone: '',
        });
        AsyncStorage.removeItem('idHospitalEdit');
        this.props.navigation.push('MedicalCenterMain');
      })
      .catch(() => {
        alert('Algo deu errado!');
      });
  };

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

  doEdit = async () => {
    const valID = await AsyncStorage.getItem('idHospitalEdit');
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: token,
    };
    const {
      cep,
      street,
      district,
      uf,
      city,
      number_start,
      number_end,
    } = this.state;
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
        cep: cep,
        street: street,
        uf: uf,
        city: city,
        district: district,
        number_start: number_start,
        number_end: number_end,
      };
      api
        .put('cover-address/' + valID, req)
        .then(() => {
          alert('Mudança realizada com sucesso!');
          this.props.navigation.navigate('AdminScreen')
        })
        .catch(() => {
          alert('Mudança deu errada!');
        });
    } 
  };
  render() {
    const scrollEnabled = this.state.screenHeight > windowHeight;
    const {
      cep,
      number_start,
      number_end,
      street,
      district,
      uf,
      city,
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
                    this.props.navigation.navigate('AdminScreen')
                  }
                  hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
                  <BackIcon name="back" size={30} color='#7BE495' />
                </TouchableOpacity>
              </View>
            </View>

            
              <Text
                style={[
                  TextStyles.mainBlueText3,
                  {alignSelf: 'center', width: '55%'},
                ]}>
                {street}
              </Text>
              <Text style={TextStyles.mainGreenText}>
                Altere os campos com dados válidos{' '}
              </Text>
              <Text style={TextStyles.subGreenText}>
                do endereço coberto para alterá-lo
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    label="CEP"
                    style={InputStyles.inputBox}
                    underlineColor="#FFFFFF"
                    theme={{
                      colors: {
                        text: '#282a36',
                        primary: '#7BE495',
                        placeholder: '#282a36',
                      },
                      fonts: {regular: ''},
                      roundness: 18,
                    }}
                    placeholderTextColor="#D0DAD1"
                    value={cep}
                    onChangeText={value => (
                      this.onChangeHandle('cep', value),
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
                    label="Rua"
                    style={InputStyles.inputBox}
                    underlineColor="#FFFFFF"
                    theme={{
                      colors: {
                        text: '#282a36',
                        primary: '#7BE495',
                        placeholder: '#282a36',
                      },
                      fonts: {regular: ''},
                      roundness: 18,
                    }}
                    placeholderTextColor="#D0DAD1"
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
                    label="Número Inicio"
                    style={InputStyles.inputBox}
                    placeholderTextColor="#D0DAD1"
                    underlineColor="transparent"
                    theme={{
                      colors: {
                        text: '#282a36',
                        primary: '#7BE495',
                        placeholder: '#282a36',
                      },
                      fonts: {regular: ''},
                      roundness: 18,
                    }}
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
                    label="Número Fim"
                    style={InputStyles.inputBox}
                    placeholderTextColor="#D0DAD1"
                    underlineColor="transparent"
                    theme={{
                      colors: {
                        text: '#282a36',
                        primary: '#7BE495',
                        placeholder: '#282a36',
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
                    label="Bairro"
                    style={InputStyles.inputBox}
                    placeholderTextColor="#D0DAD1"
                    underlineColor="transparent"
                    theme={{
                      colors: {
                        text: '#282a36',
                        primary: '#7BE495',
                        placeholder: '#282a36',
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
                    label="Cidade"
                    style={InputStyles.inputBox}
                    placeholderTextColor="#D0DAD1"
                    underlineColor="transparent"
                    theme={{
                      colors: {
                        text: '#282a36',
                        primary: '#7BE495',
                        placeholder: '#282a36',
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
                    label="Estado"
                    style={InputStyles.inputBox}
                    placeholderTextColor="#D0DAD1"
                    underlineColor="transparent"
                    theme={{
                      colors: {
                        text: '#282a36',
                        primary: '#7BE495',
                        placeholder: '#282a36',
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
                  colors={['#282a36', '#161616']}
                  style={[ViewStyles.linearGradient, {marginTop: 40}]}>
                  <TouchableOpacity
                    style={ButtonStyles.customButton}
                    onPress={() => this.doEdit()}>
                    <Button color="white">
                      <Text style={TextStyles.buttonText}>EDITAR ENDEREÇO</Text>
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
