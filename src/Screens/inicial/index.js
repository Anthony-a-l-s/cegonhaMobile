import React from 'react';
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import Androw from 'react-native-androw';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {
  ButtonStyles,
  ComponentStyles,
  ContainerStyles,
  ImageStyles,
  TextStyles,
  ViewStyles,
} from '../../styles';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class InitialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upColor: '#7BE495',
      downColor: '#329D9C',
      textColor: 'white',
      carouselItems: [
        {
          title: 'Item 1',
          text1: 'Esse é o aplicativo da Rede Cegonha, ',
          text2: 'Seja bem vindo!',
          text3: 'Um aplicativo para auxiliar as grávidas',
          text4: 'na gestação',
          imgURL: 'https://i.imgur.com/ucGlDsa.png',
        },
        {
          title: 'Item 2',
          text1: 'Preencha os campos corretamente.',
          text2: 'Seus dados estão seguros!',
          text3: 'Um aplicativo para auxiliar as grávidas',
          text4: 'na gestação',
          imgURL: 'https://i.imgur.com/CtNCQCW.png',
        },
        {
          title: 'Item 3',
          text1: 'Aguarde alguns instantes e acharemos',
          text2: 'Seu Hospital/UBS rapidamente!',
          text3: 'Um aplicativo para auxiliar as grávidas',
          text4: 'na gestação',
          imgURL: 'https://i.imgur.com/ylTCaJY.png',
        },
      ],
      activeSlide: 0,
    };
  }
  onChange = ({window, screen}) => {
    this.setState({dimensions: {window, screen}});
  };

  //componentDidMount() {
    //Dimensions.addEventListener('change', this.onChange);
  //}

 // componentWillUnmount() {
    //Dimensions.removeEventListener('change', this.onChange);
  //}

  doInitiate() {
    this.setState({
      upColor: '#282a36',
      downColor: '#000000',
      textColor: '#7BE495',
    });
    setTimeout(() => {
      this.setState({
        upColor: '#7BE495',
        downColor: '#329D9C',
        textColor: 'white',
      });
    }, 400);
    //this.props.navigation.navigate('LoginScreen');
  }

  _renderItem({item, index}) {
    return (
      <View>
        <Text style={TextStyles.mainBlueText}>{item.text1}</Text>
        <Text style={TextStyles.mainBlueText}>{item.text2}</Text>
        <Text style={TextStyles.mainGreenText}>{item.text3}</Text>
        <Text style={TextStyles.subGreenText}>{item.text4}</Text>
        <Image
          source={{uri: '' + item.imgURL}}
          style={ImageStyles.imageInitial}
        />
      </View>
    );
  }
  get pagination() {
    const {activeSlide, carouselRef} = this.state;

    return (
      <Pagination
        dotsLength={3}
        activeDotIndex={activeSlide}
        dotStyle={ComponentStyles.dotStyle}
        inactiveDotStyle={ComponentStyles.inactiveDotStyle}
        inactiveDotOpacity={1.4}
        inactiveDotScale={0.7}
        tappableDots={carouselRef}
      />
    );
  }

  render() {
    return (
      <View style={ContainerStyles.container}>
        <View
          style={[
            ContainerStyles.containerInitialScreenTop,
            {marginTop: windowHeight * 0.1},
          ]}>
          <Carousel
            layout={'default'}
            ref={ref => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={windowWidth}
            itemWidth={windowWidth}
            renderItem={this._renderItem}
            onSnapToItem={index => this.setState({activeSlide: index})}
          />
        </View>
        <View style={ContainerStyles.carouselDots}>{this.pagination}</View>

        <View style={ContainerStyles.container2}>
          <Androw style={ViewStyles.shadow}>
            <LinearGradient
              colors={[this.state.upColor, this.state.downColor]}
              style={ViewStyles.linearGradient}>
              <TouchableOpacity
                style={ButtonStyles.customButton}
                onPress={() => this.props.navigation.navigate('LoginScreen')}>
                <Button color={this.state.textColor}>
                  <Text style={TextStyles.buttonText}>ENTRE COM UMA CONTA</Text>
                </Button>
              </TouchableOpacity>
            </LinearGradient>
          </Androw>
          <View style={ContainerStyles.rowContainer}>
            <Text style={TextStyles.bottomText}>Não quer esperar? </Text>
            <TouchableOpacity
              style={TextStyles.buttonText}
              onPress={() => this.props.navigation.navigate('SearchScreen')}
              hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}>
              <Text style={TextStyles.bottomRowText}>Entre como visitante</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

