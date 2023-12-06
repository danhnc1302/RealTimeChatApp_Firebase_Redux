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
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import { firebase } from '@react-native-firebase/database';
export default function SingleChat(props) {
    const reference = firebase
        .app()
        .database('https://rnchatapp-d75fd-default-rtdb.asia-southeast1.firebasedatabase.app/')
    const { receiverData } = props.route.params;
    const { userData } = useSelector(state => state.User)
    const [msg, setMsg] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [allChat, setallChat] = useState([]);

    console.log("ChatPerson", receiverData)

    useEffect(() => {
        const onChildAdd = reference
            .ref("/message/" + receiverData.roomId)
            .on("child_added", snapshot => {
                setallChat((state) => [snapshot.val(), ...state]);
            })
        // Stop listening for updates when no longer required
        return () => database().ref('/messages' + receiverData.roomId).off('child_added', onChildAdd);
    }, [receiverData.roomId])

    // const msgValid = txt => txt && txt.replace(/\s/g, '').length;

    const sendMsg = () => {
        if (msg == "") {
            Toast.show("Enter something...")
            return false
        }
        setDisabled(true)
        let msgData = {
            roomId: receiverData.roomId,
            message: msg,
            from: userData.id,
            to: receiverData.id,
            sendTime: moment().format(''),
            msgType: 'text'
        }

        const newReference = reference
            .ref('/message/' + receiverData.roomId)
            .push()
        msgData.id = newReference.key
        newReference.set(msgData).then(() => {
            let chatListUpdate = {
                lastMsg: msg,
                sendTime: msgData.sendTime
            }
            reference
                .ref("/chatlist/" + receiverData.id + "/" + userData?.id)
                .update(chatListUpdate)
                .then(() => console.log("Data updated."))

            reference
                .ref('/chatlist/' + userData?.id + '/' + receiverData.id)
                .update(chatListUpdate)
                .then(() => console.log('Data updated.'));

            setMsg('');
            setDisabled(false);
        })

    }

    return (
        <View style={{ flex: 1 }}>
            <ChatHeader data={receiverData} />
            <ImageBackground
                source={require('../../Assets/Background.jpg')}
                style={{ flex: 1 }}>
                <FlatList
                    style={{ flex: 1 }}
                    data={allChat}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    inverted
                    renderItem={({ item }) => {
                        return (
                            <MsgComponent
                                sender={item.from == userData.id}
                                item={item}
                            />
                        );
                    }}
                />
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

                <TouchableOpacity disabled={disabled} onPress={sendMsg}>
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
