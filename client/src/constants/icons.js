import React from "react";
import { Text, View, Image, TouchableOpacity, TextInput, FlatList, ScrollView, icon, FontAwesomeIcon, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Chevron(){
    return (
        < Icon
            name='chevron-right'
            style={{ paddingEnd: 10, opacity: 0.5 }}
            size={20} color={'black'}
        />
    )
}