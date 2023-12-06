import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar } from "react-native-elements";
import { FONTS } from "../Constant/Font";
export default function ChatRoom({userData}) {
    return (
        <TouchableOpacity style={styles.container}>
            <Avatar
                size="medium"
                rounded={true}
                source={{uri: userData.item.avatar_url}}
            />
            <View style={styles.wrapper}>
                <Text style={styles.name}>{userData.item.name}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.lastMsg}>{userData.item.subtitle}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        padding: 10,
    },
    wrapper: {
        flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 6
    },
    name: {
        fontFamily: FONTS.Bold,
        fontSize: 16,
        fontWeight: "700"
    },
    lastMsg: {

    }
})