import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    customSafeArea: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === 'android' ? 40 : 0
    },
});