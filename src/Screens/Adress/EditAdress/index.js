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
  PickerIOSBase,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import BackIcon from 'react-native-vector-icons/AntDesign';
import Androw from 'react-native-androw';
//import Arrow from '../../images/arrow-left-curved.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import TextInputMask from 'react-native-text-input-mask';
import api from '../../../services/api';
import {Button, TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {
  ButtonStyles,
  ContainerStyles,
  InputStyles,
  TextStyles,
  ViewStyles,
} from '../../../styles';
const windowHeight = Dimensions.get('window').height;
export default class EditAdressScreen extends React.Component {
  constructor(props) {
    super(props);

    this.getData();
  }
  state = {
    street: '',
    number: '',
    cep: '',
    district: '',
    city: '',
    uf: '',
    errorMessageCep: '',
    errorMessageStreet: '',
    errorMessageNumber: '',
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

  /*componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange);
  }*/

  goBack = async () => {
    this.setState({
      street: '',
      number: '',
      cep: '',
      district: '',
      city: '',
      uf: '',
    });
    this.props.navigation.push('AdressScreen');
  };
  getData = async () => {
    try {
      const idAdress = await AsyncStorage.getItem('idAdressEdit');
      if (idAdress != null) {
        api
          .get('adress/' + idAdress)
          .then(async res => {
            await AsyncStorage.setItem('idAdress', res.data[0].id.toString());
            this.setState({
              street: res.data[0].street,
              number: res.data[0].number.toString(),
              cep: res.data[0].cep,
              district: res.data[0].district,
              city: res.data[0].city,
              uf: res.data[0].uf,
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
          number: '',
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
        this.props.navigation.push('AdressScreen');
      })
      .catch(() => {
        alert('Algo deu errado!');
      });
  };

  checkFieldEmpty(cep, street, number, district, city, uf) {
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
  doEdit = async () => {
    const valIdUser = await AsyncStorage.getItem('idUserEdit');
    const valIdAdress = await AsyncStorage.getItem('idAdressEdit');
    const {street, number, cep, district, city} = this.state;
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
        street: street,
        number: parseInt(number),
        cep: cep,
        district: district,
        city: city,
        uf: this.state.uf,
      };
    
      api
        .put('adress/' + valIdAdress + '/' + valIdUser, req)
        .then(() => {
          alert('Mudança realizada com sucesso!');
          this.back();
        })
        .catch(() => {
          alert('Mudança deu errada!');
        });
    }
  };
  back = async () => {
    if (await AsyncStorage.getItem('type') === '1') {
      this.props.navigation.navigate('AdressScreen');
    } else {
      this.props.navigation.navigate('AdressScreen');
    }
  };
  render() {
    const scrollEnabled = this.state.screenHeight > windowHeight;
    const {street, number, cep, district, city, uf} = this.state;
    return (
      <SafeAreaView style={ContainerStyles.sContainer}>
        <ScrollView
          style={ContainerStyles.sContainer}
          contentContainerStyle={ContainerStyles.scrollViewContainer}
          scrollEnabled={scrollEnabled}
          nestedScrollEnabled = {true}
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
                {street}, {number}
              </Text>
              <Text style={TextStyles.mainGreenText}>
                Altere os campos com dados válidos{' '}
              </Text>
              <Text style={TextStyles.subGreenText}>
                do endereço para alterá-lo
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
                <Icon name="location" size={65} color="#282a36" />
              </View>

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
                    label="CEP"
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
                      <Text style={TextStyles.buttonText}>EDITAR ENDEREÇO</Text>
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
