import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ChatsListChat from './ChatsListChat';

const ChatList = ({chats, navigation}) => {
    return (
        <View style={{flex:0.84}}>
            <ScrollView>
                {chats.map(chat => <ChatsListChat chat={chat} key={chat.userID} navigation={navigation}/>)}
            </ScrollView>
        </View>
    );
};

export default ChatList;
