import React, { useState, useEffect, useRef } from "react";
import {
    Text,
    View,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { firebase } from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar } from "react-native-elements";
import { COLORS } from "../../Components/Constant/Color";
import { FONTS } from "../../Components/Constant/Font";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const AllUser = () => {
    const reference = firebase
        .app()
        .database('https://rnchatapp-d75fd-default-rtdb.asia-southeast1.firebasedatabase.app/')
    const [search, setSearch] = useState("");
    const [allUser, setAllUser] = useState([])
    const [allUserBackup, setAllUserBackup] = useState([])
    const navigation = useNavigation()
    const { userData } = useSelector(state => state.User)
    const inputRef = React.createRef();

    useEffect(() => {
        getAllUser()
    }, [])

    const getAllUser = () => {
        reference
            .ref('users/')
            .once('value')
            .then(snapshot => {
                console.log('All userData: ', Object.values(snapshot.val()));
                setAllUser(
                    Object.values(snapshot.val()).filter(it => it.id != userData.id)
                )
                setAllUserBackup(
                    Object.values(snapshot.val()).filter(it => it.id != userData.id)
                )
            });
    }

    const searchUser = (val) => {
        setSearch(val)
        setAllUser(allUserBackup.filter(it => it.name.match(val)))
    }

    const createChatList = (data) => {

        reference
            .ref('/chatlist/' + userData.id + '/' + data.id)
            .once('value')
            .then(snapshot => {
                console.log('User data: ', snapshot.val())

                if (snapshot.val() == null) {
                    let roomId = uuid.v4()
                    let myData = {
                        roomId,
                        id: userData.id,
                        name: userData.name,
                        img: userData.img,
                        emailId: userData.emailId,
                        about: userData.about,
                        lastMsg: ""
                    }

                    reference
                        .ref('/chatlist/' + data.id + "/" + userData.id)
                        .update(myData)
                        .then(() => console.log('Data updated.'));

                    delete data["password"]
                    data.lastMsg = ""
                    data.roomId = roomId
                    reference
                        .ref('/chatlist/' + userData.id + "/" + data.id)
                        .update(data)
                        .then(() => console.log('Data updated.'));
                    navigation.navigate("SingleChat", { receiverData: data })
                } else {
                    navigation.navigate("SingleChat", { receiverData: snapshot.val() })
                }
            });

    }

    function searchUserComponent({ item }) {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => createChatList(item)}
            >
                <Avatar
                    size="medium"
                    rounded={true}
                    source={{ uri: item.img }}
                />
                <View style={styles.wrapper}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.about}>{item.about}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.containerStyle}>
                <Icon name="search" size={24} color={COLORS.black} />
                <TextInput
                    ref={inputRef}
                    style={styles.inputStyle}
                    placeholder="Search by name ..."
                    value={search}
                    onChangeText={(val) => searchUser(val)}
                    onBlur={() => {
                        // Use inputRef to blur the TextInput
                        inputRef.current.blur();
                    }}
                />
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={allUser}
                renderItem={searchUserComponent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: "row",
        elevation: 2,
        backgroundColor: 'white',
        alignItems: "center",
        paddingHorizontal: 20,
    },
    inputStyle: {
        marginLeft: 15,
        fontSize: 15,
        fontFamily: FONTS.Regular,
        color: 'black',
        opacity: 0.7,
    },
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

});

export default AllUser;
