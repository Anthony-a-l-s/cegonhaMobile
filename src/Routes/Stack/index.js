import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../../Screens/Login';
import InicialScreen from '../../Screens/inicial'
import SearchScreen from '../../Screens/Guest/Search'
import FoundHospitalScreen from '../../Screens/Guest/Found'

const { Navigator, Screen } = createNativeStackNavigator()

export default function () {
    return(
        <Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
            <Screen name='InicialScreen'
             component={InicialScreen}/>
            <Screen name='LoginScreen'
             component={LoginScreen}/>
             <Screen name='SearchScreen'
             component={SearchScreen}/>
            <Screen name='FoundHospitalScreen'
             component={FoundHospitalScreen}/>
        </Navigator>
    )
}