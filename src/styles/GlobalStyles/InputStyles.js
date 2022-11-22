
import {StyleSheet, Dimensions} from 'react-native';
const { width, height } = Dimensions.get('screen');
export const InputStyles = StyleSheet.create({
      imputLogin: {
        backgroundColor: '#DCDEFE',
        height: 50,
        width: width *0.8,
        borderRadius: 5,
        paddingLeft: 40,
        fontSize: 18,
        marginBottom: 15,
      }
});
