import React from "react";
import {
    Text,
    TouchableOpacity
} from 'react-native';

import { COLORS } from "../Constant/Color";
import { FONTS } from "../Constant/Font";

export function PrimaryButton({ text, onPressFnc }) {
    return (
        <TouchableOpacity style={{
            backgroundColor: COLORS.theme,
            width: "100%",
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            padding: 15,
            marginBottom: 30,
        }}
            onPress={onPressFnc}
        >
            <Text style={{
                fontFamily: FONTS.Bold,
                fontSize: 20,
                color: 'white'
            }}>{text}</Text>
        </TouchableOpacity>
    )
}