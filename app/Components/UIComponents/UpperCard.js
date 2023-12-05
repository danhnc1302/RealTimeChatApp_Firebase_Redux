import React from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import { COLORS } from "../Constant/Color";
import { FONTS } from "../Constant/Font";

const {width, height} = Dimensions.get("screen");

export default function UpperCard() {
    return (
        <View style={styles.upperCard}>
                <Image
                    style={{ width: 70, height: 70, borderRadius: 35 }}
                    source={{ uri: 'https://yt3.ggpht.com/yti/APfAmoG-m3--E1zYY977bOWG0FS_syFGSbqjyAbh6dDi=s88-c-k-c0x00ffffff-no-rj-mo' }} />
                <Text
                    style={{ color: COLORS.white, fontFamily: FONTS.Bold, fontSize: 24, fontWeight: 600, marginTop: 10 }}
                >DEVELOPER'S DANH</Text>
            </View>
    )
}

const styles = StyleSheet.create({
    upperCard: {
        height: height / 4,
        width: width,
        backgroundColor: COLORS.theme,
        borderBottomLeftRadius: height / 8,
        justifyContent: "center",
        alignItems: "center",
    }
})