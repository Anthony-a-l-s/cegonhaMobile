import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../../Screens/Login';
import InicialScreen from '../../Screens/inicial'
import SearchScreen from '../../Screens/Guest/Search'
import FoundHospitalScreen from '../../Screens/Guest/Found'
import UserScreen from '../../Screens/User'
import EditUserScreen from '../../Screens/User/EditUser'
import AdressScreen from '../../Screens/Adress';
import EditAdressScreen from '../../Screens/Adress/EditAdress';


const { Navigator, Screen } = createNativeStackNavigator()

export default function () {
    return (
        <Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <Screen name='InicialScreen'
                component={InicialScreen} />
            <Screen name='LoginScreen'
                component={LoginScreen} />
            <Screen name='SearchScreen'
                component={SearchScreen} />
            <Screen name='FoundHospitalScreen'
                component={FoundHospitalScreen} />
            <Screen name='UserScreen'
                component={UserScreen} />
            <Screen name='EditUserScreen'
                component={EditUserScreen} />
            <Screen name='AdressScreen'
                component={AdressScreen} />
            <Screen name='EditAdressScreen'
                component={EditAdressScreen} />
        </Navigator>
    )
}