import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../../Screens/Login';
import InicialScreen from '../../Screens/inicial'
import SearchScreen from '../../Screens/Guest/Search'
import GuestFoundHospitalScreen from '../../Screens/Guest/Found'
import UserScreen from '../../Screens/User'
import EditUserScreen from '../../Screens/User/EditUser'
import AdressScreen from '../../Screens/Adress';
import EditAdressScreen from '../../Screens/Adress/EditAdress';
import AddAdressScreen from '../../Screens/Adress/AddAdress/AddAdress';
import UserFoundHospitalScreen from '../../Screens/User/UserFound';
import AdminScreen from '../../Screens/Admin';
import AddUserScreen from '../../Screens/Admin/AddUser';
import ListUsersScreen from '../../Screens/Admin/ListUsers';
import CenterMedicalScreen from '../../Screens/MedicalCenter';


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
            <Screen name='GuestFoundHospitalScreen'
                component={GuestFoundHospitalScreen} />
            <Screen name='UserFoundHospitalScreen'
                component={UserFoundHospitalScreen} />
            <Screen name='UserScreen'
                component={UserScreen} />
            <Screen name='EditUserScreen'
                component={EditUserScreen} />
            <Screen name='AdressScreen'
                component={AdressScreen} />
            <Screen name='EditAdressScreen'
                component={EditAdressScreen} />
            <Screen name='AddAdressScreen'
                component={AddAdressScreen} />
            <Screen name='AdminScreen'
                component={AdminScreen} />
            <Screen name='AddUserScreen'
                component={AddUserScreen} />
            <Screen name='ListUsersScreen'
                component={ListUsersScreen} />
            <Screen name='CenterMedicalScreen'
                component={CenterMedicalScreen} />
        </Navigator>
    )
}