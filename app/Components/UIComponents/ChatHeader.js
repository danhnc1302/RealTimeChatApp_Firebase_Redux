import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Platform } from 'react-native';
import moment from 'moment';
import { COLORS } from '../Constant/Color';
import { FONTS } from '../Constant/Font';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const ChatHeader = ({ data }) => {

    const [lastSeen, setlastSeen] = useState('')
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} translucent={false} />
            <Icon
                style={{
                    marginHorizontal: 10,
                    color: COLORS.white,
                }}
                name="arrow-left"
                size={20}
                onPress={() => navigation.goBack()}
            />
            <Avatar
                source={{ uri: data.item.img }}
                rounded
                size="small"
            />
            <View
                style={{ flex: 1, marginLeft: 10 }}
            >
                <Text
                    numberOfLines={1}
                    style={{
                        color: COLORS.white,
                        fontSize: 16,
                        fontFamily: FONTS.SemiBold,
                        textTransform: 'capitalize'
                    }}
                >
                    {data.item.name}
                </Text>

                {/* <Text
                    style={{ color: COLORS.primaryBackground, fontSize: 10,fontFamily: FONTS.Regular }}
                >
                    {lastSeen}
                </Text> */}
            </View>

            {/* <Icon
                style={{
                    marginHorizontal: 10,
                    color: COLORS.themeColor
                }}
                name="videocam-outline"
                type="Ionicons"
            /> */}

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: 70,
        backgroundColor: COLORS.theme,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

//make this component available to the app
export default ChatHeader;