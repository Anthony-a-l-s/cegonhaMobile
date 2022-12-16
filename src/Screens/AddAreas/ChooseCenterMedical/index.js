/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Androw from 'react-native-androw';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackIcon from 'react-native-vector-icons/AntDesign';
//import Arrow from '../../../../../images/arrow-left-curved.svg';
//import Pregnant from '../../../../../images/cross.svg';
import {TextInput} from 'react-native-paper';
import {
  ButtonStyles,
  ContainerStyles,
  InputStyles,
  TextStyles,
  ViewStyles,
} from '../../../styles';
import api from '../../../services/api';

export default class ChooseCenterMedicalSreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      adress: [{cidade: '', estado: '', cep: ''}],
      error: null,
      findText: '',
      number: 0,
    };
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.onChange);
  }

  onChangeHandle(state, value) {
    this.setState({
      [state]: value,
    });

    this.findHospital(value);
    this.setState({
      data: [],
    });
  }
  onChange = ({window, screen}) => {
    this.setState({dimensions: {window, screen}});
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          alignSelf: 'center',
        }}
      />
    );
  };
  renderFooter = () => {
    if (!this.state.loading) {
      return null;
    }

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  goAdd = async id => {
    await AsyncStorage.removeItem('idHospitalAdd');
    await AsyncStorage.setItem('idHospitalAdd', JSON.stringify(id));
    this.props.navigation.navigate('ChooseCenterMedical2');
  };
  renderItem = ({item}) => {
    return (
      <View
        style={[
          ContainerStyles.infoContainer,
          {justifyContent: 'space-between', marginTop: 10},
        ]}>
        <View style={ContainerStyles.containerIcons}>
          {/*<Pregnant width={45} height={45} />*/}
        </View>
        <View style={[ContainerStyles.textContainer, {width: 190}]}>
          <Text style={TextStyles.text1}>
            {item.city}, {item.uf}
          </Text>
          <Text style={TextStyles.text2}>{item.name}</Text>
          <Text style={TextStyles.text3}>{item.cep}</Text>
        </View>
        <TouchableOpacity onPress={() => this.goAdd(item.id)}>
          <View
            style={[
              ButtonStyles.coloredbutton,
              {backgroundColor: '#282a36', width: 80},
            ]}>
            <Text style={TextStyles.coloredButtonText}>ADICIONAR</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  findHospital(text) {
    this.makeRemoteRequest(text);
  }
  makeRemoteRequest(text) {
    this.setState({loading: true});
    const headers = {
      Authorization: this.state.token,
    };
    api
      .get('medical-center/' + text, {headers: headers})
      .then(res => {
        this.setState({
          loading: false,
          data: res.data,
        });
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  }
  goBack = async () => {
    AsyncStorage.removeItem('idUBSAdd');
    AsyncStorage.removeItem('AddressType');
    this.props.navigation.push('AddAreaScreen');
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
              <BackIcon name="back" size={30} color='#7BE495' />
            </TouchableOpacity>
          </View>
        </View>
        <View style={ContainerStyles.containerPasswordBottom}>
          <Text style={TextStyles.mainBlueText}>Adicione o local do Parto</Text>
          <Text style={TextStyles.mainGreenText}>
            Digite o nome e procure o centro médico
          </Text>
          <Text style={TextStyles.subGreenText}>
            que irá adicionar o endereço
          </Text>
        </View>
        <Androw style={ViewStyles.shadow}>
          <LinearGradient
            colors={['#FFFFFF', '#FFFFFF']}
            style={ViewStyles.linearGradient2}>
            <TextInput
              mode="outlined"
              placeholder="Procura"
              style={InputStyles.inputBox}
              underlineColor="#FFFFFF"
              value={this.state.findText}
              theme={{
                colors: {
                  text: '#282a36',
                  primary: '#7BE495',
                  placeholder: '#D0DAD1',
                },
                fonts: {regular: ''},
                roundness: 18,
              }}
              left={
                <TextInput.Icon
                  name={'magnify'}
                  color="#CDE0C9"
                  style={{marginTop: 12, marginRight: 13}}
                />
              }
              placeholderTextColor="#D0DAD1"
              onChangeText={value => this.onChangeHandle('findText', value)}
              fontFamily={'Montserrat-Medium'}
            />
          </LinearGradient>
        </Androw>
        <FlatList
          style={{marginTop: 30}}
          data={this.state.data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
