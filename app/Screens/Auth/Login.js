import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
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
import { firebase } from '@react-native-firebase/database';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from "../../Components/Constant/Color";
import { FONTS } from "../../Components/Constant/Font";
import { useDispatch } from 'react-redux';
import UpperCard from "../../Components/UIComponents/UpperCard";
import { PrimaryButton } from "../../Components/UIComponents/PrimaryButton";
import { setUser } from "../../Redux/reducer/user";
import Auth from "../../Service/Auth";

const Login = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const reference = firebase
        .app()
        .database('https://rnchatapp-d75fd-default-rtdb.asia-southeast1.firebasedatabase.app/')

    const onPressLogin = async () => {
        if (email == "" || password == "") {
            Toast.show("Fill in all the fields")
            return false
        }

        reference
            .ref('users/')
            .orderByChild("emailId")
            .equalTo(email)
            .once('value')
            .then(async snapshot => {
                if(snapshot.val() == null) {
                    Toast.show("Invalid Email Id!")
                    return false
                }
                let userData = Object.values(snapshot.val())[0]
                if(userData?.password != password) {
                    Toast.show("Invalid Password!")
                    return false
                }
                console.log("User data: ", Object.values(snapshot.val()) )
                dispatch(setUser(userData))
                await Auth.setAccount(userData)
                Toast.show("Login Successfully!")
            });
            
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                backgroundColor={COLORS.theme}
                barStyle="light-content"
                hidden={false}
            />
            <KeyboardAwareScrollView style={{ flex: 1 }}>
                <UpperCard />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View
                        style={{
                            backgroundColor: "white",
                            width: "90%",
                            paddingHorizontal: 15,
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
                            <Text style={styles.loginTxt}>Login</Text>
                            <Text style={styles.smallTxt}>In order to login your account please enter credentials</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <Icon name="envelope" size={20} color="white" />
                            </View>
                            <TextInput
                                style={styles.inputs}
                                placeholder="Enter Email Id"
                                keyboardType="email-address"
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
                                value={password}
                                secureTextEntry={true}
                                onChangeText={val => setPassword(val)}
                            />

                        </View>
                        <PrimaryButton text="Login" onPressFnc={onPressLogin} />
                        <View style={styles.contactView}>
                            <Text style={styles.smallTxt}>New user?</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Register")
                                }}
                            >
                                <Text style={styles.registerTxt}> Register Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    cardView: {
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingBottom: 20,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    loginTxt: {
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
        padding: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    contactView: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    registerTxt: {
        fontFamily: FONTS.Bold,
        fontSize: 18,
        color: COLORS.black,
        textDecorationLine: 'underline',
    },
    inputs: {
        flex: 1
    }
})