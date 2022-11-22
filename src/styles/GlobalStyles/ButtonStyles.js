import {StyleSheet, Dimensions} from 'react-native';
const { width, height } = Dimensions.get('screen');

export const ButtonStyles = StyleSheet.create({
    buttonLogin: {
        backgroundColor: '#040EEC',
        height: 50,
        width: width *0.8,
        marginTop: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
