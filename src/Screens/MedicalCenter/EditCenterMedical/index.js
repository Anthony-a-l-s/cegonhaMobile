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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import BackIcon from 'react-native-vector-icons/AntDesign';
import Androw from 'react-native-androw';
//import Arrow from '../../../../../../images/arrow-left-curved.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../services/api';
import {Button, TextInput} from 'react-native-paper';
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
export default class EditiCenterMedicalScreen extends React.Component {
  constructor(props) {
    super(props);

    this.getData();
  }
  state = {
    cep: '',
    image: 'da',
    latitude: '',
    longitude: '',
    number: null,
    district: '',
    street: '',
    city: '',
    uf: '',
    name: '',
    phone: '',
    errorMessageNumber: '',
    errorMessageCep: '',
    errorMessageStreet: '',
    errorMessagePhone: '',
    errorMessageDistrict: '',
    errorMessageCity: '',
    errorMessageUf: '',
    errorMessageLatitude: '',
    errorMessageLongitude: '',
    errorMessageImage: '',
    errorMessageName: '',
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
      number: null,
      district: '',
      street: '',
      city: '',
      uf: '',
      name: '',
      phone: '',
      latitude: '',
      longitude: '',
      image: 'da',
    });
    AsyncStorage.removeItem('idHospitalEdit');
    this.props.navigation.push('MedicalCenterMain');
  };
  getData = async () => {
    try {
      const valID = await AsyncStorage.getItem('idHospitalEdit');
      if (valID != null) {
        api
          .get('medical-center-id/' + valID)

          .then(res => {
            if (res.data.number == null) {
              this.setState({
                number: '',
              });
            } else {
              this.setState({
                number: '' + res.data.number,
              });
            }
            this.setState({
              image: res.data.image,
              name: res.data.name,
              phone: res.data.phone,
              street: res.data.street,
              district: res.data.district,
              city: res.data.city,
              uf: res.data.uf,
              cep: res.data.cep,
              latitude: res.data.latitude.toFixed(14),
              longitude: res.data.longitude.toFixed(14),
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
          number: null,
          district: '',
          street: '',
          city: '',
          uf: '',
          name: '',
          phone: '',
          image:'',
          latitude:'',
          longitude:'',
        });
        AsyncStorage.removeItem('idHospitalEdit');
        this.props.navigation.push('AdminScreen');
        this.props.navigation.push('CenterMedicalScreen');
      })
      .catch(() => {
        alert('Algo deu errado!');
      });
  };

  checkFieldEmpty(name, image, latitude, longitude, phone, cep, street, number, district, city, uf) {
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
    if (!phone) {
      this.setState({
        errorMessagePhone: 'Campo obrigatório!',
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

  checkNumberValid(number) {
    if (isNaN(number) == false) {
      if (parseInt(number) > 0) {
        return true;
      }
    } else {
      if (number == 's/n') return true;
    }
    this.setState({
      errorMessageNumber:
        'Digite apenas números positivos ou s/n para endereço sem número',
    });
    return false;
  }

  doEdit = async () => {
    const valID = await AsyncStorage.getItem('idHospitalEdit');
    const {
      cep,
      number,
      street,
      district,
      uf,
      city,
      name,
      phone,
      image,
      latitude,
      longitude
    } = this.state;
    
    var errors = false;

    if (
      this.checkFieldEmpty(
        this.state.name, 
        this.state.image, 
        this.state.latitude, 
        this.state.longitude, 
        this.state.phone,
        this.state.cep,
        this.state.street,
        this.state.number,
        this.state.district,
        this.state.city,
        this.state.uf,
      ) == true ||
      this.checkNumberValid(this.state.number) == false
    )
      errors = true;
      
      if(errors === false) {
        const req = {
          name: name,
          phone: phone.replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll(' ', ''),
          cep: cep,
          street: street,
          uf: this.state.uf,
          city: city,
          number: number,
          district: district,
          latitude: latitude,
          longitude: longitude,
          image: image
        };
      api.put('medical-center/' + valID, req)
        .then(() => {
          alert('Mudança realizada com sucesso!');
          this.props.navigation.push('CenterMedicalScreen');
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
      number,
      street,
      district,
      uf,
      city,
      name,
      phone,
      image,
      latitude,
      longitude
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
                    this.props.navigation.navigate('CenterMedicalScreen')
                  }
                  hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
                    <BackIcon name="back" size={30} color='#7BE495' />
                  {/*<Arrow />*/}
                </TouchableOpacity>
              </View>
            </View>

            
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
                do Hospital para alterá-lo
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
                <Image
                  style={{width: 120, height: 120, borderRadius: 100}}
                  source={{
                    uri: this.state.image,
                  }}
                />

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
                    ref={input => {
                      this.name = input;
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
                        errorMessageImage: null,
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
                    label="Telefone"
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
                        value={phone}
                        type={'cel-phone'}
                        options={{
                          maskType: 'BRL',
                          withDDD: true,
                          dddMask: '(99) ',
                        }}
                        onChangeText={value => (
                          this.onChangeHandle('phone', value),
                          this.setState({
                            errorMessagePhone: null,
                          })
                        )}
                      />
                    )}
                  />
                </LinearGradient>
              </Androw>
              <Text style={TextStyles.textError}>
                {this.state.errorMessagePhone}
              </Text>

              <Androw style={ViewStyles.shadow}>
                <LinearGradient
                  colors={['#FFFFFF', '#FFFFFF']}
                  style={ViewStyles.linearGradient2}>
                  <TextInput
                    mode="outlined"
                    label="Latitude"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    ref={input => {
                      this.latitude = input;
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
                    value={latitude}
                    onChangeText={value => (
                      this.onChangeHandle('latitude', value),
                      this.setState({
                        errorMessageLatitude: null,
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
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
                    label="Latitude"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    ref={input => {
                      this.longitude = input;
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
                    value={longitude}
                    onChangeText={value => (
                      this.onChangeHandle('longitude', value),
                      this.setState({
                        errorMessageLongitude: null,
                      })
                    )}
                    fontFamily={'Montserrat-Medium'}
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
                    label="Latitude"
                    returnKeyType="next"
                    blurOnSubmit={false}
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
                    label="Número"
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
                    label="Bairro"
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
                    label="Cidade"
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
                  colors={['#282a36', '#161616']}
                  style={[ViewStyles.linearGradient, {marginTop: 40}]}>
                  <TouchableOpacity
                    style={ButtonStyles.customButton}
                    onPress={() => this.doEdit()}>
                    <Button color="white">
                      <Text style={TextStyles.buttonText}>EDITAR HOSPITAL</Text>
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
