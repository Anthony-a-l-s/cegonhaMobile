import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {
    ButtonStyles,
    ComponentStyles,
    ContainerStyles,
    InputStyles,
    TextStyles,
    ViewStyles,
} from '../../styles';
import EmailIcon from 'react-native-vector-icons/EvilIcons';


export default function Login() {
    return (
        <SafeAreaView style={ViewStyles.loginBackground}>
            <View style={ViewStyles.ImputContainer}>
                <EmailIcon name="trash" size={40} color="#040EEC" />
                <TextInput
                    style={InputStyles.imputLogin}
                    underlineColorAndroid='transparent'
                    placeholderTextColor={'#040EEC'}
                />
            </View>
            <TextInput
                style={InputStyles.imputLogin}
                underlineColorAndroid='transparent'
            />
            <TouchableOpacity style={ButtonStyles.buttonLogin}>
                <Text style={TextStyles.TextButton}>Entrar</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}
