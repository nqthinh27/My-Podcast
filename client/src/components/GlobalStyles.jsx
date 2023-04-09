import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    customSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
}); 