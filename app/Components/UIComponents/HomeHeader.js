import React from "react";
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-elements';
import { useSelector } from "react-redux";

import { COLORS } from "../Constant/Color";
import { FONTS } from "../Constant/Font";

export default function HomeHeader() {
    const {userData} = useSelector(state => state.User)
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>DEVELOPERS' DANH</Text>
            <View style={styles.flexRow}>
                <Icon name="bell" size={24} color={COLORS.theme} style={{marginRight: 15}}/>
                <Avatar
                    rounded={true}
                    source={{uri: userData.img}}
                    size="small"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 15
    },
    logo: {
        color: COLORS.theme,
        fontFamily: FONTS.Bold,
        fontSize: 26,
        fontWeight: 'bold'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: "center"
    }
})