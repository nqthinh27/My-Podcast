import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function NotifyItem(props) {
    return (
        <View style={styles.notifyItemWrapper}>
            <Image
                style={{
                    width: 57,
                    height: 57,
                    marginRight: 10,
                    borderRadius: 57,
                }}
                source={{ uri: props.image }}
            />
            <Text style={{ flexWrap: 'wrap', flex: 1 }}>{props.content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    notifyItemWrapper: {
        flexDirection: 'row',
        marginBottom: 16,
        flex: 1,
    }
})