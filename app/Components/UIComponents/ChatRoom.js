import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar } from "react-native-elements";
import { FONTS } from "../Constant/Font";
import { useNavigation } from "@react-navigation/native";
export default function ChatRoom({ chatPerson }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => {
                navigation.navigate("SingleChat", { receiverData: chatPerson })
            }}
        >
            <Avatar
                size="medium"
                rounded={true}
                source={{ uri: chatPerson.img }}
            />
            <View style={styles.wrapper}>
                <Text style={styles.name}>{chatPerson.name}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.lastMsg}>{chatPerson.msgType === "image" ? "Image" : chatPerson.lastMsg}</Text>
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