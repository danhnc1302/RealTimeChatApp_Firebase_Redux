import React, { useState } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import uuid from 'react-native-uuid';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '@react-native-firebase/database';


import { COLORS } from "../../Components/Constant/Color";
import { FONTS } from "../../Components/Constant/Font";

import UpperCard from "../../Components/UIComponents/UpperCard";
import { PrimaryButton } from "../../Components/UIComponents/PrimaryButton";

const Register = () => {

    const navigation = useNavigation()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [about, setAbout] = useState("")

    const reference = firebase
        .app()
        .database('https://rnchatapp-d75fd-default-rtdb.asia-southeast1.firebasedatabase.app/')

    const onPressRegister = async () => {
        if (name == "" || email == "" || password == "" || about == "") {
            Toast.show("Fill in all the fields")
            return false
        }
        let data = {
            id: uuid.v4(),
            name: name,
            emailId: email,
            password: password,
            about: about,
            img: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
        }
        console.log(data)
        reference
            .ref('/users/'+data.id)
            .set(data)
            .then(() => {
                Toast.show("Register Successfully!")
                setName("")
                setEmail("")
                setPassword("")
                setAbout("")
                navigation.navigate("Login")
            });
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                backgroundColor={COLORS.theme}
                barStyle="light-content"
                hidden={false}
            />
            <KeyboardAwareScrollView>
                <UpperCard />

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View
                        style={{
                            backgroundColor: "white",
                            paddingHorizontal: 15,
                            width: "90%",
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: '#000000',
                            elevation: 2,
                            shadowOffset: {
                                width: 0,
                                height: 3
                            },
                            shadowRadius: 5,
                            shadowOpacity: 1.0
                        }}
                    >
                        <View style={styles.cardView}>
                            <Text style={styles.registerTxt}>Register</Text>
                            <Text style={styles.smallTxt}>In order to register your account please fill out all fields</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <Icon name="user" size={20} color="white" />
                            </View>
                            <TextInput
                                style={styles.inputs}
                                placeholder="Enter Full Name"
                                keyboardType="default"
                                underlineColorAndroid="transparent"
                                placeholderTextColor={COLORS.liteBlack}
                                value={name}
                                onChangeText={val => setName(val)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <Icon name="envelope" size={20} color="white" />
                            </View>
                            <TextInput
                                style={styles.inputs}
                                placeholder="Enter Email Id"
                                keyboardType="default"
                                underlineColorAndroid="transparent"
                                placeholderTextColor={COLORS.liteBlack}
                                value={email}
                                onChangeText={val => setEmail(val)}
                            />

                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <Icon name="key" size={20} color="white" />
                            </View>
                            <TextInput
                                style={styles.inputs}
                                placeholder="Enter Password"
                                keyboardType="default"
                                underlineColorAndroid="transparent"
                                placeholderTextColor={COLORS.liteBlack}
                                secureTextEntry={true}
                                value={password}
                                onChangeText={val => setPassword(val)}
                            />

                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <Icon name="warning" size={20} color="white" />
                            </View>
                            <TextInput
                                style={styles.inputs}
                                placeholder="Enter about"
                                keyboardType="default"
                                underlineColorAndroid="transparent"
                                placeholderTextColor={COLORS.liteBlack}
                                value={about}
                                onChangeText={val => setAbout(val)}
                            />

                        </View>
                        <PrimaryButton text="Register Now" onPressFnc={onPressRegister} />
                        <View style={styles.contactView}>
                            <Text style={styles.smallTxt}>Existing user?</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Login")
                                }}
                            >
                                <Text style={styles.loginTxt}> Login Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Register;

const styles = StyleSheet.create({
    cardView: {
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingBottom: 20,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    registerTxt: {
        fontFamily: FONTS.Bold,
        fontSize: 30,
        marginBottom: 20
    },
    smallTxt: {
        fontSize: 18,
        textAlign: 'center'
    },
    inputContainer: {
        width: "100%",
        borderRadius: 30,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        marginBottom: 15,
        elevation: 2,
        overflow: "hidden"
    },
    iconContainer: {
        backgroundColor: COLORS.theme,
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    contactView: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    loginTxt: {
        fontFamily: FONTS.Bold,
        fontSize: 18,
        color: COLORS.black,
        textDecorationLine: 'underline',
    },
    inputs: {
        flex: 1
    }
})