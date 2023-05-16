import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import NotifyItem from './NotifyItem'
import GlobalStyles from '../../components/GlobalStyles'
import { useSelector, useDispatch } from "react-redux";
import { putDataAPI } from '../../ultis/fetchData';

export default function Notify() {
    const notifies = useSelector((state) => state.auth.notifies.data);
    const access_token = useSelector((state) => state.auth.login.access_token);
    const readNotifies = async () => {
        await putDataAPI('notify/read', null, access_token);
    }
    useEffect(() => {
        readNotifies();
    },[])
    return (
        <SafeAreaView style={[GlobalStyles.customSafeArea, styles.notifyWrapper]}>
            <ScrollView>
                <Text style={styles.notifyTitle}>Thông báo</Text>
                {notifies.map(item => {
                    return <NotifyItem image={item.image} content={item.content} />
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    notifyWrapper: {
        // flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 16,
    },
    notifyTitle: {
        fontSize: 21,
        fontWeight: "bold",
        marginBottom: 8,
        alignSelf: 'center'
    }
})