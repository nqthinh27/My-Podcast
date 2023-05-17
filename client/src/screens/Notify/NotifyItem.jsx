import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { timeDiff2 } from '../../ultis/helper'

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
            <View style = {{ flex: 1}}>
                <Text style={{ flexWrap: 'wrap', fontSize: 16 }}>{props.content}</Text>
                <Text >{timeDiff2(props.createAt)}</Text>
            </View>
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