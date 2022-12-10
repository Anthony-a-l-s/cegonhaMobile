/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Button,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  Linking,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Frame from '../../../images/Frame.png';
import Location from '../../../images/location.svg';
import Phone from '../../../images/phone.svg';
import {ContainerStyles, TextStyles, ViewStyles} from '../../../styles';
import Arrow from '../../../images/arrow-left-curved.svg';
import Icon from 'react-native-vector-icons/Fontisto';
import api from '../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDwxYwB57tFaJuqdGxXr2xO23_cJODi6ck';
const {width} = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default class UserFoundHospitalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.getDataPreNatal();
    this.getDataParto();
  }
  state = {
    destination: {
      latitude: 0,
      longitude: 0,
    },
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.15,
      longitudeDelta: 0.15 * (width / windowHeight),
    },
    name: '',
    number: '',
    district: '',
    street: '',
    city: '',
    uf: '',
    cep: '',
    telephone: '',
    telephoneUBS: '',
    nameUbs: '',
    numberUbs: '',
    districtUbs: '',
    streetUbs: '',
    cityUbs: '',
    ufUbs: '',
    cepUbs: '',
    active: 0,
    xTabOne: 0,
    xTabTwo: 0,
    tab1: 1,
    tab2: 0,
    time: 0,
    distance: 0,
    origin: {latitude: 0, longitude: 0},
    coordLatitude: 0,
    coordLongitude: 0,
    translateX: new Animated.Value(0),
    translateXTabOne: new Animated.Value(0),
    translateXTabTwo: new Animated.Value(width),
    translateY: -1000,
    latitudeParto: 0,
    longitudeParto: 0,
    latitudePreNatal: 0,
    longitudePreNatal: 0,
  };
  async componentDidMount() {
    Geolocation.getCurrentPosition(
      async ({coords: {latitude, longitude}}) => {
        this.setState({
          origin: {
            latitude,
            longitude,
          },
        });
      },
      () => {}, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );

  }
  getDataPreNatal = async () => {
    const idPreNatal = await AsyncStorage.getItem('idPreNatalUser');
    api.get('medical-center-id/' + idPreNatal)
      .then(res => {
        const idEnderecoPreNatal = res.data.id;
        this.setState({
          name: res.data.name,
          number: res.data.number,
          street: res.data.street,
          district: res.data.district,
          city: res.data.city,
          uf: res.data.uf,
          latitudePreNatal: res.data.latitude,
          longitudePreNatal: res.data.longitude,
          destination: {
            latitude: res.data.latitude,
            longitude: res.data.longitude,
          },
          region: {
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.longitudeDelta,
          },
        });

        api.get('address/' + idEnderecoPreNatal)
          // eslint-disable-next-line no-shadow
          .then(res => {
            this.setState({
              number: res.data.number,
              district: res.data.district,
              street: res.data.street,
              city: res.data.city,
              uf: res.data.uf,
              cep: res.data.cep,
            });
          })
          .catch(() => {
            //alert('Algo deu errado no endereço!');
          });
      })
      .catch(() => {
        //alert('Algo deu errado!');
      });
  };
  getDataParto = async () => {
    const idParto = await AsyncStorage.getItem('idPartoUser');
    api.get('medical-center-id/' + idParto)
      .then(res => {
        const idEnderecoParto = res.data.id;
        this.setState({
          nameUbs: res.data.name,
          numberUbs: res.data.number,
          streetUbs: res.data.street,
          districtUbs: res.data.district,
          cityUbs: res.data.city,
          ufUbs: res.data.uf,
          latitudeParto: res.data.latitude,
          longitudeParto: res.data.longitude,
        });
        api.get('address/' + idEnderecoParto)
          // eslint-disable-next-line no-shadow
          .then(res => {
            this.setState({
              numberUbs: res.data.number,
              districtUbs: res.data.district,
              streetUbs: res.data.street,
              cityUbs: res.data.city,
              ufUbs: res.data.uf,
              cepUbs: res.data.cep,
            });
          })
          .catch(() => {
            //alert('Algo deu errado no endereço!');
          });
      })
      .catch(() => {
        //alert('Algo deu errado!');
      });
  };
  
  doCall = async () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }
    Linking.openURL(phoneNumber);
  };
  doCount = async (distance, duration) => {
    this.setState({time: duration, distance: distance});
  };
  doReturn = async () => {
    AsyncStorage.removeItem('idPreNatalGuest');
    AsyncStorage.removeItem('idPartoGuest');
    this.setState({
      name: '',
      number: '',
      district: '',
      street: '',
      city: '',
      uf: '',
      cep: '',
      nameUbs: '',
      numberUbs: '',
      districtUbs: '',
      streetUbs: '',
      cityUbs: '',
      ufUbs: '',
      cepUbs: '',
      region: null,
      destination: {latitude: 0, longitude: 0},
      latitudeParto: 0,
      latitudePreNatal: 0,
      longitudeParto: 0,
      longitudePreNatal: 0,
    });
          this.props.navigation.navigate('AdressScreen')
  };

  handleSlide = type => {
    this.setState({
      region: {
        latitude: this.state.latitudePreNatal,
        longitude: this.state.longitudePreNatal,
        longitudeDelta: this.state.region.longitudeDelta,
        latitudeDelta: this.state.region.latitudeDelta,
      },
      destination: {
        latitude: this.state.latitudePreNatal,
        longitude: this.state.longitudePreNatal,
      },
    });
    let {active, translateX, translateXTabOne, translateXTabTwo} = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 50,
      useNativeDriver: true,
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 50,
          useNativeDriver: true,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 50,
          useNativeDriver: true,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }).start(),
      ]);
    }
  };
  zoomIn() {
    this.setState({
      region: {
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude,
        latitudeDelta: this.state.region.latitudeDelta / 2,
        longitudeDelta: this.state.region.longitudeDelta / 2,
      },
    });
  }

  zoomOut() {
    this.setState({
      region: {
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude,
        latitudeDelta: this.state.region.latitudeDelta * 2,
        longitudeDelta: this.state.region.longitudeDelta * 2,
      },
    });
  }
  handleSlide2 = type => {
    this.setState({
      region: {
        latitude: this.state.latitudeParto,
        longitude: this.state.longitudeParto,
        latitudeDelta: this.state.region.latitudeDelta,
        longitudeDelta: this.state.region.longitudeDelta,
      },
      destination: {
        latitude: this.state.latitudeParto,
        longitude: this.state.longitudeParto,
      },
    });
    let {active, translateX, translateXTabOne, translateXTabTwo} = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver: true,
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100,
          useNativeDriver: true,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100,
          useNativeDriver: true,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(),
      ]);
    }
  };

    render() {
    let {
      xTabOne,
      xTabTwo,
      translateX,
      active,
      translateXTabOne,
      translateXTabTwo,
      translateY,
    } = this.state;
    const {
      name,
      nameUbs,
      number,
      numberUbs,
      district,
      districtUbs,
      street,
      streetUbs,
      city,
      cityUbs,
      uf,
      ufUbs,
      cep,
      cepUbs,
      region,

    } = this.state;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          alignItems: 'center',
          borderRadius: 10,
        }}>
       
        <View style={{height: windowHeight * 0.55}} />
        <Text>Pru</Text>

        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            ref={c => (c === 0 ? null : (this.mapView = c))}
            showsUserLocation={false}
            loadingEnabled
            region={region}>
            <Marker
              coordinate={{
                latitude: this.state.destination.latitude,
                longitude: this.state.destination.longitude,
              }}>
              <Image
                source={require('../../../images/pin.png')}
                style={{width: 30, height: 40}}
              />
            </Marker>
            <Marker
              coordinate={{
                latitude: this.state.origin.latitude,
                longitude: this.state.origin.longitude,
              }}>
              <Image
                source={require('../../../images/aazz.png')}
                style={{width: 14, height: 14}}
              />
            </Marker>
            <MapViewDirections
              origin={this.state.origin}
              destination={this.state.destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              onReady={result => {
                //this.doCount(result.distance, result.duration);
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 2,
                    left: width / 2,
                    top: width / 2,
                    bottom: width / 2,
                  },
                  animated: true,
                });
              }}
              strokeColor="#68B2A0"
            />
          </MapView>
          <View
            style={[
              ViewStyles.circle2,
              {backgroundColor: 'white', elevation: 10},
            ]}>
            <TouchableOpacity
              onPress={() => this.doReturn()}
              hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
              {/*<Arrow />*/}
            </TouchableOpacity>
          </View>
          </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 0,
            backgroundColor: '#F6F9F5',
            borderRadius: 34,
            height: 50,
            width: '85%',
            position: 'absolute',
            alignSelf: 'center',
            marginBottom: 5,
            marginTop: windowHeight * 0.1,
          }}>
          <Animated.Image
            source={Frame}
            style={{
              position: 'absolute',
              width: '51%',
              height: '100%',
              top: 0,

              borderRadius: 34,
              backgroundColor: 'transparent',

              transform: [
                {
                  translateX,
                },
              ],
            }}
          />
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 0,
              borderColor: '#68B2A0',
              backgroundColor: active === 1 ? 'transparent' : 'transparent',
              borderRightWidth: 0,
              borderTopLeftRadius: 34,
              borderBottomLeftRadius: 34,
            }}
            onLayout={event =>
              this.setState({
                xTabOne: event.nativeEvent.layout.x,
              })
            }
            onPress={() =>
              this.setState({active: 0}, () => this.handleSlide(xTabOne))
            }>
            <Text
              style={{
                color: active === 0 ? '#fff' : '#68B2A0',
                fontFamily: 'Montserrat-Bold',

                fontSize: 15,
              }}>
              Parto
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 0,
              borderColor: '#68B2A0',
              borderRadius: 0,
              borderLeftWidth: 0,
              borderTopRightRadius: 34,
              borderBottomRightRadius: 34,

              backgroundColor: active === 0 ? 'transparent' : 'transparent',
            }}
            onLayout={event =>
              this.setState({
                xTabTwo: event.nativeEvent.layout.x,
              })
            }
            onPress={() =>
              this.setState({active: 1}, () => this.handleSlide2(xTabTwo - 3))
            }>
            <Text
              style={{
                color: active === 1 ? '#fff' : '#68B2A0',
                fontFamily: 'Montserrat-Bold',
                fontSize: 15,
              }}>
              Pré-natal
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: 60,
            height: 60,
            borderRadius: 50,
            bottom: 160,
            left: 15,
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#282a36',
          }}
          onPress={() => this.doCall()}>
          {/*<Phone />*/}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: 60,
            height: 60,
            borderRadius: 50,
            bottom: 290,
            right: 25,
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
          }}
          onPress={() => this.zoomIn()}>
          <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 30}}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: 60,
            height: 60,
            borderRadius: 50,
            bottom: 220,
            right: 25,
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
          }}
          onPress={() => this.zoomOut()}>
          <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 30}}>-</Text>
        </TouchableOpacity>
        <View
          style={{
            width: '90%',
            marginLeft: 'auto',
            marginTop: windowHeight * 0.2,
            borderRadius: 25,
            marginRight: 'auto',
            backgroundColor: '#FFF',
          }}>
          <View
            style={{
              backgroundColor: 'transparent',
              width: '100%',
              height: '25%',
              alignSelf: 'center',
            }}>
            <Animated.View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginLeft: windowWidth * 0.06,
                transform: [
                  {
                    translateX: translateXTabOne,
                  },
                ],
              }}
              onLayout={event =>
                this.setState({
                  translateY: event.nativeEvent.layout.height,
                })
              }>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginTop: 20,
                    elevation: 15,
                  }}
                  source={{
                    uri:
                      'https://www.hmtj.org.br/front2020/assets/img/hospital.jpg',
                  }}
                />
                <Text
                  style={[
                    TextStyles.mainTextHospital,
                    {
                      fontSize: 16,
                      width: '50%',
                      marginLeft: 15,
                      textAlign: 'justify',
                    },
                  ]}>
                  {name}
                </Text>

                <Icon
                  name="star"
                  size={18}
                  color="#7BE495"
                  style={{marginTop: 35, marginLeft: 25}}
                />
                <Text
                  style={{
                    marginTop: 33,
                    marginLeft: 5,
                    fontSize: 16,
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  4.5
                </Text>
              </View>
              <Text
                style={[
                  TextStyles.middleBlueText3,
                  {marginLeft: 0, width: '90%', marginTop: 15},
                ]}>
               {street} {number}, {district}, {cityUbs}, {ufUbs}
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginLeft: windowWidth * 0.06,
                transform: [
                  {
                    translateX: translateXTabTwo,
                  },
                  {
                    translateY: -translateY,
                  },
                ],
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginTop: 20,
                    elevation: 15,
                  }}
                  source={{
                    uri:
                      'https://www.hmtj.org.br/front2020/assets/img/hospital.jpg',
                  }}
                />
                <Text
                  style={[
                    TextStyles.mainTextHospital,
                    {
                      fontSize: 16,
                      width: '50%',
                      marginLeft: 15,
                      textAlign: 'justify',
                    },
                  ]}>
                  {nameUbs}
                </Text>

                <Icon
                  name="star"
                  size={18}
                  color="#7BE495"
                  style={{marginTop: 35, marginLeft: 25}}
                />
                <Text
                  style={{
                    marginTop: 33,
                    marginLeft: 5,
                    fontSize: 16,
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  4.5
                </Text>
              </View>
              <Text
                style={[
                  TextStyles.middleBlueText3,
                  {marginLeft: 0, width: '90%', marginTop: 15},
                ]}>
                {streetUbs} {numberUbs}, {districtUbs}, {cityUbs}, {ufUbs}
              </Text>
            </Animated.View>
              </View>
              </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: windowHeight * 1,
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
