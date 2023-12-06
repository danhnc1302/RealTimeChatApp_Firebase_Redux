import React, { Component, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    SectionList,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../Components/Constant/Color';
import { useSelector } from 'react-redux';
import MsgComponent from '../../Components/UIComponents/MsgComponent';
import ChatHeader from '../../Components/UIComponents/ChatHeader';
import { useRoute } from '@react-navigation/native';

export default function SingleChat(props) {
    const { receiverData } = props.route.params;
    const { userData } = useSelector(state => state.User)
    const [msg, setMsg] = useState("")
    console.log("ChatPerson", receiverData)
    return (
        <View style={{flex:1}}>
            <ChatHeader data={receiverData} />
            <ImageBackground
                source={require('../../Assets/Background.jpg')}
                style={{ flex: 1 }}>
            </ImageBackground>
            <View
                style={{
                    backgroundColor: COLORS.theme,
                    elevation: 5,
                    // height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 7,
                    justifyContent: 'space-evenly',
                }}>
                <TextInput
                    style={{
                        backgroundColor: COLORS.white,
                        width: '80%',
                        borderRadius: 25,
                        borderWidth: 0.5,
                        borderColor: COLORS.white,
                        paddingHorizontal: 15,
                        color: COLORS.black,
                    }}
                    placeholder="type a message"
                    placeholderTextColor={COLORS.black}
                    multiline={true}
                    value={msg}
                    onChangeText={val => setMsg(val)}
                />

                <TouchableOpacity onPress={() => { }}>
                    <Icon name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
