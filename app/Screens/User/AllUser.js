import React, { useState, useEffect, useRef } from "react";
import {
    Text,
    View,
    StatusBar,
    StyleSheet,
    TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from "../../Components/Constant/Color";
import { FONTS } from "../../Components/Constant/Font";
import { FlatList } from "react-native-gesture-handler";
import ChatRoom from "../../Components/UIComponents/ChatRoom";

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
        subtitle:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
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
        subtitle:
            ' If you use this site regularly and would like to help keep the site',
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
        subtitle:
            ' If you use this site regularly and would like to help keep the site',
    },
];



const AllUser = () => {
  const [search, setSearch] = useState("");
  const inputRef = React.createRef();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.containerStyle}>
        <Icon name="search" size={24} color={COLORS.black} />
        <TextInput
          ref={inputRef}
          style={styles.inputStyle}
          placeholder="Search by name ..."
          value={search}
          onChangeText={(val) => setSearch(val)}
          onBlur={() => {
            // Use inputRef to blur the TextInput
            inputRef.current.blur();
          }}
        />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={listData}
        renderItem={(item) => <ChatRoom userData={item} />}
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
});

export default AllUser;
