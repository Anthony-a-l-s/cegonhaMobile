import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    FlatList,
    ActivityIndicator,
    ScrollView,
    Button
} from 'react-native';
import EditIcon from 'react-native-vector-icons/AntDesign';
import DeleteIcon from 'react-native-vector-icons/EvilIcons';
import AddressIcon from 'react-native-vector-icons/MaterialIcons';
import BackIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Androw from 'react-native-androw';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Arrow from '../../images/arrow-left-curved.svg';
import Pregnant from '../../images/cross.svg';
import { TextInput } from 'react-native-paper';
import {
    ButtonStyles,
    ContainerStyles,
    InputStyles,
    TextStyles,
    ViewStyles,
} from '../../styles';
import api from '../../services/api';

export default class AdressScreen extends React.Component {
    constructor(props) {
        super(props);
        this.getToken();
        this.state = {
            loading: false,
            data: [],
            adress: [{ cidade: '', estado: '', cep: '' }],
            error: null,
            findText: '',
            number: 0,
            token: '',
        };
    }

    getToken = async () => {
        const token = await AsyncStorage.getItem('token');
        this.setState({ token: token });
    };
    componentDidMount() {
        Dimensions.addEventListener('change', this.onChange);
    }
    componentDidMount() {
        Dimensions.removeEventListener('change', this.onChange);
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
    onChange = ({ window, screen }) => {
        this.setState({ dimensions: { window, screen } });
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
    goBack = async () =>{
        if(await AsyncStorage.getItem('type') == 1){
            this.props.navigation.navigate('ListUsersScreen')
          }else{
            this.props.navigation.navigate('UserScreen')
          }
    }
    goEdit = async (idUser, idAdress) => {
        await AsyncStorage.removeItem('idUserEdit');
        await AsyncStorage.setItem('idUserEdit', JSON.stringify(idUser));
        await AsyncStorage.removeItem('idAdressEdit');
        await AsyncStorage.setItem('idAdressEdit', JSON.stringify(idAdress));
        this.props.navigation.push('EditAdressScreen');
    };
    goDelete = async (idUser, idAdress) => {
        await AsyncStorage.removeItem('idUserDelete');
        await AsyncStorage.setItem('idUserDelete', JSON.stringify(idUser));
        await AsyncStorage.removeItem('idAdressDelete');
        await AsyncStorage.setItem('idAdressDelete', JSON.stringify(idAdress));
        const valIdAdress = await AsyncStorage.getItem('idAdressDelete');
        const valIdUser = await AsyncStorage.getItem('idUserDelete');
        api.delete("adress/" + valIdAdress + "/" + valIdUser)
            .then(() => {
                alert('Endereço deletedo com sucesso');
            })
            .catch(() => {
                alert('Erro na remoção!');
            });
        this.props.navigation.navigate('UserScreen')
        this.props.navigation.navigate('AdressScreen')
        //this.props.navigation.push('UserScreen');
    };
    goLocal = async (street, number, district, city, uf, cep) => {
        const req = {
            street: street,
            number: number,
            district: district,
            city: city,
            uf: uf,
            cep: cep,
        };
        console.log(req)
        if (street && number && city && uf && district && cep) {
            api.get("discovery-addressNh/" + district)
                .then(res => {
                    console.log(res.data)
                    const idPreNatal = res.data.id_addres_pre_natal;
                    const stringIdPreNatal = '' + idPreNatal;
                    const idParto = res.data.id_addres_parto;
                    const stringIdParto = '' + idParto;
                    AsyncStorage.setItem('idPreNatalUser', stringIdPreNatal);
                    AsyncStorage.setItem('idPartoUser', stringIdParto);
                    this.props.navigation.push('UserFoundHospitalScreen');
                })
                .catch((err) => {
                    console.log(err)
                    alert('Não foi possivel buscar um centro médico que atende sua localidade');

                })
        }
    }
    renderItem = ({ item }) => {
        return (
            item.adresses.map((i) => {
                return (
                    <View>
                        <ScrollView>
                            <View
                                style={[
                                    ContainerStyles.infoContainer,
                                    { justifyContent: 'space-between', marginTop: 10 },
                                ]}>
                                <View style={[ContainerStyles.textContainer, { width: 300, alignItems: 'center' }]}>
                                    <Text style={TextStyles.text2}>{i.street}, {i.number}</Text>
                                    <Text style={TextStyles.text1}>
                                        {i.district},
                                    </Text>
                                    <Text style={TextStyles.text3}>{i.city},{i.uf}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -10 }}>
                                <TouchableOpacity onPress={() => this.goEdit(item.id, i.id)}>
                                    <View
                                        style={[ButtonStyles.coloredbutton, { backgroundColor: '#7BE495', margin: 5 }]}>
                                        <EditIcon name="edit" size={25} color='#FFFFFF' />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.goDelete(item.id, i.id)}>
                                    <View
                                        style={[ButtonStyles.coloredbutton, { backgroundColor: '#7BE495', margin: 5 }]}>
                                        <DeleteIcon name="trash" size={25} color='#FFFFFF' />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.goLocal(i.street, i.number, i.district, i.city, i.uf, i.cep)} >
                                    <View
                                        style={[ButtonStyles.coloredbutton, { backgroundColor: '#7BE495', margin: 5 }]}>
                                        <AddressIcon name="place" size={25} color='#FFFFFF' />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={[ViewStyles.separator, { margin: 10 }]} />
                        </ScrollView>

                    </View>

                );
            }))
    };
    componentDidMount() {
        const fetchData = async () => {
            const cpf = await AsyncStorage.getItem('cpfUser')
            api.get('userCpf/' + cpf)
                .then(res => {
                    this.setState({
                        data: res.data,
                    });
                })
                .catch(error => {
                    console.log(error)
                });
        };
        fetchData();
    }
    findHospital(text) {
        this.makeRemoteRequest(text);
    };
    makeRemoteRequest(text) {
        const headers = {
            Authorization: this.state.token,
        };
        this.setState({ loading: true });
        api
            .get('user/' + text)
            .then(res => {
                this.setState({
                    data: res.data,
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }
    render() {
        return (
            <View
                style={[
                    ContainerStyles.containerNoAlign,
                    { justifyContent: 'flex-start' },
                ]}>
                <View style={[ContainerStyles.welcomeContainer, { flexDirection: 'row' }]}>
                    <View style={[ViewStyles.circle4, { marginRight: 160 }]}>
                        <TouchableOpacity
                            onPress={() => this.goBack()}
                            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}>
                             <BackIcon name="back" size={30} color='#7BE495' />
                            {/*<Arrow />*/}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={ContainerStyles.containerPasswordBottom}>
                    <Text style={TextStyles.mainBlueText}>Endereços</Text>
                    <Text style={TextStyles.mainGreenText}>
                        Página com os endereços do usuário
                    </Text>
                </View>
                <FlatList
                    style={{ marginTop: 30 }}
                    data={this.state.data}
                    renderItem={this.renderItem}
                />
                <View style={[{ margin: 30 }]}>
                    <TouchableOpacity
                        style={[{ alignItems: 'center' }]}
                        onPress={() => this.props.navigation.navigate('AddAdressScreen')}>
                        <View style={[ButtonStyles.coloredbutton13]}>
                            <Text style={[TextStyles.mainWhiteText, { marginTop: 15 }]}>Adicionar novo endereço</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}