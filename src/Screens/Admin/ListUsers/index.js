import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import EditIcon from 'react-native-vector-icons/AntDesign';
import DeleteIcon from 'react-native-vector-icons/EvilIcons';
import AddressIcon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Androw from 'react-native-androw';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Arrow from '../../images/arrow-left-curved.svg';
//import Pregnant from '../../images/cross.svg';
import {TextInput} from 'react-native-paper';
import {
  ButtonStyles,
  ContainerStyles,
  InputStyles,
  TextStyles,
  ViewStyles,
} from '../../../styles'
import api from '../../../services/api';

export default class ListUsersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.getToken();
    this.state = {
      loading: false,
      data: [],
      adress: [{cidade: '', estado: '', cep: ''}],
      error: null,
      findText: '',
      number: 0,
      token: '',
    };
  }

  getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({token: token});
  };
  componentDidMount() {
    Dimensions.addEventListener('change', this.onChange);
  }
  /*componentDidMount() {
    Dimensions.removeEventListener('change', this.onChange);
  }*/
  componentDidMount() {
    this.makeRemoteRequest('');
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
  goEdit = async (id, cpf) => {
    await AsyncStorage.removeItem('AdminIdUserEdit');
    await AsyncStorage.setItem('AdminIdUserEdit', JSON.stringify(id));
    await AsyncStorage.removeItem('cpfUser');
    await AsyncStorage.setItem('cpfUser', cpf);
    this.props.navigation.push('EditUserScreen');
  };
  goAdress = async (id, cpf) => {
    await AsyncStorage.removeItem('idUser');
    await AsyncStorage.setItem('idUser', JSON.stringify(id));
    await AsyncStorage.removeItem('cpfUser');
    await AsyncStorage.setItem('cpfUser', cpf);
    this.props.navigation.push('AdressScreen');
  };
  goDelete = async id => {
    await AsyncStorage.removeItem('idAdminUserDelete');
    await AsyncStorage.setItem('idAdminUserDelete', JSON.stringify(id));
    const valIdUser = await AsyncStorage.getItem('idAdminUserDelete');
    api
      .delete('user/' + valIdUser)
      .then(() => {
        alert('Usuário deletedo com sucesso');
        this.props.navigation.navigate('AdminScreen');
        this.props.navigation.navigate('ListUsersScreen');
      })
      .catch(() => {
        alert('Erro na remoção!');
      });
  };
  renderItem = ({item}) => {
    return (
      <View>
        <ScrollView>
          <View
            style={[
              ContainerStyles.infoContainer,
              {justifyContent: 'space-between', marginTop: 10},
            ]}>
            <View
              style={[
                ContainerStyles.textContainer,
                {width: 300, alignItems: 'center'},
              ]}>
              <Text style={TextStyles.text1}> Email: {item.email}</Text>
              <Text style={TextStyles.text2}>{item.username}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: -30,
              marginBottom: 10,
            }}>
            <TouchableOpacity onPress={() => this.goEdit(item.id, item.cpf)}>
              <View
                style={[
                  ButtonStyles.coloredbutton,
                  {backgroundColor: '#7BE495', margin: 5},
                ]}>
                {/*<EditIcon name="edit" size={25} color="#FFFFFF" />*/}
                <Text>E</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.goAdress(item.id, item.cpf)}>
              <View
                style={[
                  ButtonStyles.coloredbutton,
                  {backgroundColor: '#7BE495', margin: 5},
                ]}>
                {/*<AddressIcon name="address" size={25} color="#FFFFFF" />*/}
                <Text>A</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.goDelete(item.id)}>
              <View
                style={[
                  ButtonStyles.coloredbutton,
                  {backgroundColor: '#7BE495', margin: 5},
                ]}>
                {/*<DeleteIcon name="trash" size={25} color="#FFFFFF" />*/}
                <Text>D</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[ViewStyles.separator, {margin: 10}]} />
        </ScrollView>
      </View>
    );
  };
  findHospital(text) {
    this.makeRemoteRequest(text);
  }
  makeRemoteRequest(text) {
    console.log(text);
    this.setState({loading: true});
    api
      .get('user/' + text)
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
          <Text style={TextStyles.mainBlueText}>Usuários</Text>
          <Text style={TextStyles.mainGreenText}>
            Página com os usuário cadastrados
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
