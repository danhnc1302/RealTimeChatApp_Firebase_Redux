import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    FlatList,
    StyleSheet
} from 'react-native'
import { COLORS } from "../../Components/Constant/Color";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import HomeHeader from "../../Components/UIComponents/HomeHeader";
import ChatRoom from "../../Components/UIComponents/ChatRoom";
import Auth from "../../Service/Auth";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../Redux/reducer/user";
import { firebase } from '@react-native-firebase/database';

const listData = [
    {
        name: 'Amy Farha',
        avatar_url:
            'https://images.pexels.com/photos/2811087/pexels-photo-2811087.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        subtitle: 'Hey there, how are you?',
    },
    {
        name: 'Chris Jackson',
        avatar_url:
            'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        subtitle: 'Where are you?',
    },
    {
        name: 'Jenifar Lawrence',
        avatar_url:
            'https://m.media-amazon.com/images/M/MV5BOTU3NDE5MDQ4MV5BMl5BanBnXkFtZTgwMzE5ODQ3MDI@._V1_.jpg',
        subtitle: 'I am good, how are you?',
    },
    {
        name: 'Tom Holland',
        avatar_url:
            'https://static.toiimg.com/thumb.cms?msid=80482429&height=600&width=600',
        subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    },
    {
        name: 'Robert',
        avatar_url:
            'https://expertphotography.b-cdn.net/wp-content/uploads/2020/05/male-poses-squint.jpg',
        subtitle: 'Where does it come from?',
    },
    {
        name: 'downey junior',
        avatar_url:
            'https://www.apetogentleman.com/wp-content/uploads/2018/06/male-models-marlon.jpg',
        subtitle: 'Where can I get some?',
    },
    {
        name: 'Ema Watson',
        avatar_url:
            'https://images.unsplash.com/photo-1503104834685-7205e8607eb9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        subtitle: 'I am good, how are you?',
    },
    {
        name: 'Chris Jackson',
        avatar_url:
            'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        subtitle: ' If you use this site regularly and would like to help keep the site',
    },
    {
        name: 'Jenifar Lawrence',
        avatar_url:
            'https://m.media-amazon.com/images/M/MV5BOTU3NDE5MDQ4MV5BMl5BanBnXkFtZTgwMzE5ODQ3MDI@._V1_.jpg',
        subtitle: 'Why do we use it?',
    },
    {
        name: 'Tom Holland',
        avatar_url:
            'https://static.toiimg.com/thumb.cms?msid=80482429&height=600&width=600',
        subtitle: ' If you use this site regularly and would like to help keep the site',
    },
];



export default function Home() {
    const reference = firebase
        .app()
        .database('https://rnchatapp-d75fd-default-rtdb.asia-southeast1.firebasedatabase.app/')
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.User)
    const [chatlist, setChatList] = useState([])
    const handleLogout = async () => {
        await Auth.logout()
        dispatch(removeUser())
    }

    useEffect(() => {
        getChatList()
    },[])

    const getChatList = () => {
        reference
        .ref(`/chatlist/${userData?.id}`)
        .on('value', snapshot => {
            if(snapshot.val() != null) {
                console.log('User data: ', snapshot.val());
                setChatList(Object.values(snapshot.val()))
            }
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar
                backgroundColor={COLORS.white}
                barStyle="dark-content"
                hidden={false}
            />
            <HomeHeader />
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={chatlist}
                renderItem={(item) => <ChatRoom chatPerson={item.item} />}
            />
            <TouchableOpacity
                style={styles.searchUser}
                onPress={() => navigation.navigate('AllUser')}
            >
                <Icon name="users" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
                style={{position: 'absolute',
                bottom: 60,
                left: 20,
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: COLORS.theme,
                justifyContent: 'center',
                alignItems: 'center',}}
                onPress={() => handleLogout()}
            >
                <Icon name="circle" size={20} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchUser: {
        position: 'absolute',
        bottom: 60,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.theme,
        justifyContent: 'center',
        alignItems: 'center',
    }
})