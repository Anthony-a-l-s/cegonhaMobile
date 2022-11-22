import {StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('screen');

export const TextStyles = StyleSheet.create({
    TextLogo:{
        fontSize: 30,
        color: '#000000'
     },
    TextButton:{
       color: '#FFFFFF',
       fontSize: 20,
    },
});
