// eslint-disable react-native/no-inline-styles spital
import * as React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
/*import Arrow from '../../../../images/arrow-left-curved.svg';
import Hospital from '../../../../images/growhospital.svg';
import UBS from '../../../../images/growubs.svg';*/
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ContainerStyles, TextStyles, ViewStyles} from '../../styles';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default class AddAreaScreen extends React.Component {
  state = {
    checked: false,
    email: '',
    tipo: 0,
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

  doCovered = async () => {
    const Item = '' + 1;
    AsyncStorage.setItem('AddressType', Item);
    const XD = await AsyncStorage.getItem('AddressType');
    this.setState({
      tipo: XD,
    });
    console.log(XD);
    this.props.navigation.navigate('ChooseCenterMedicalSreen');
  };
  doUncovered = async () => {
    const Item = '' + 2;
    AsyncStorage.setItem('AddressType', Item);
    const XD = await AsyncStorage.getItem('AddressType');
    this.setState({
      tipo: XD,
    });
    console.log(XD);
    this.props.navigation.navigate('AdminAddHospital');
  };
  render() {
    return (
      <View
        style={[
          ContainerStyles.containerNoAlign,
          {justifyContent: 'flex-start'},
        ]}>
        <View style={ContainerStyles.welcomeContainer}>
          <View style={ViewStyles.circle4}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AdminScreen')}
              hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
              {/*<Arrow />*/}
            </TouchableOpacity>
          </View>
        </View>
        <View style={ContainerStyles.containerPasswordBottom}>
          <Text style={TextStyles.mainBlueText}>Cadastre um endereço</Text>
          <Text style={TextStyles.mainGreenText}>
            Selecione o tipo de cobertura
          </Text>
          <Text style={TextStyles.subGreenText}>que irá cadastrar</Text>
        </View>
        <View style={[ViewStyles.separator, {marginTop: 30}]} />
        <TouchableOpacity
          onPress={() => this.doCovered()}
          style={{
            backgroundColor: 'white',
            width: '80%',
            height: '20%',
            elevation: 15,
            alignSelf: 'center',
            marginTop: 50,
            borderRadius: 14,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/*<Hospital height={windowHeight * 0.19} width={windowWidth * 0.4} />*/}
            <View>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  color: '#7BE495',
                  fontSize: windowHeight * 0.025,
                  width: windowWidth * 0.35,
                  marginLeft: 10,
                }}>
                COBERTO
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  color: '#282a36',
                  fontSize: windowHeight * 0.018,
                  width: windowWidth * 0.35,
                  marginLeft: 10,
                }}>
                Endereço coberto
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.doUncovered()}
          style={{
            backgroundColor: 'white',
            width: '80%',
            height: '20%',
            elevation: 15,
            alignSelf: 'center',
            marginTop: 50,
            borderRadius: 14,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/*<UBS
              height={windowHeight * 0.18}
              width={windowWidth * 0.4}
              style={{marginLeft: 10}}
             />*/}
            <View>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  color: '#7BE495',
                  fontSize: windowHeight * 0.025,
                  width: windowWidth * 0.35,
                }}>
                DESCOBERTO
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  color: '#282a36',
                  fontSize: windowHeight * 0.018,
                  width: windowWidth * 0.35,
                }}>
                Endereço descoberto
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={[ViewStyles.separator, {marginBottom: 10, marginTop: 40}]}
        />
      </View>
    );
  }
}
