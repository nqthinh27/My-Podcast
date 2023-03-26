import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export async function setAccessToken(data) {
    await AsyncStorage.setItem('access_token', data);
}

export async function setRefreshToken(data) {
    await AsyncStorage.setItem('refresh_token', data);
}


export function isTokenExpired(token) {
    decodedToken = jwtDecode(token);
    if (decodedToken.exp < Date.now() / 1000) { // Kiểm tra xem JWT có hết hạn hay không
        return true;
    } else {
        return false;
    }
}