export const TOKEN_KEY = "@airbnb-Token";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const isAuthenticated = () => AsyncStorage.getItem(TOKEN_KEY) !== null;

export const getToken = async () =>{
  const valor = await AsyncStorage.getItem(TOKEN_KEY)
  return valor
} 

export const login = token => {
  AsyncStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  AsyncStorage.removeItem(TOKEN_KEY);
};