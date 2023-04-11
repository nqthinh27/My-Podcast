import { Alert } from "react-native";

export const warningLogin = (navigate, nextScreen, currentScreen) => {
    Alert.alert(
        'Thông báo',
        'Bạn phải đăng nhập để có thể sử dụng tính năng này',
        [
            {
                text: 'Đăng nhập',
                onPress: () => {
                    if (nextScreen){
                        navigate(nextScreen);
                    }
                    else {
                        navigate('Login');
                    }
                }
            },
            {
                text: 'Bỏ qua',
                onPress: () => {
                    if (currentScreen) navigate(currentScreen);
                }
            }
        ],
    );
}